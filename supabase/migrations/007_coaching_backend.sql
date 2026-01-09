

-- Coaches: Everyone can view, only coach can update their profile
CREATE POLICY "Coaches are viewable by everyone"
  ON coaches FOR SELECT
  USING (is_active = true);

CREATE POLICY "Users can update own coach profile"
  ON coaches FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert coach profile"
  ON coaches FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Coaching Plans: Everyone can view active plans
CREATE POLICY "Coaching plans are viewable by everyone"
  ON coaching_plans FOR SELECT
  USING (is_active = true);

CREATE POLICY "Coaches can manage their plans"
  ON coaching_plans FOR ALL
  USING (coach_id IN (SELECT id FROM coaches WHERE user_id = auth.uid()));

-- Coaching Slots: Everyone can view available slots
CREATE POLICY "Available coaching slots are viewable by everyone"
  ON coaching_slots FOR SELECT
  USING (is_available = true);

CREATE POLICY "Coaches can manage their slots"
  ON coaching_slots FOR ALL
  USING (coach_id IN (SELECT id FROM coaches WHERE user_id = auth.uid()));

-- Coaching Bookings: Users can view their own bookings
CREATE POLICY "Users can view their own bookings"
  ON coaching_bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Coaches can view their bookings"
  ON coaching_bookings FOR SELECT
  USING (coach_id IN (SELECT id FROM coaches WHERE user_id = auth.uid()));

CREATE POLICY "Users can create bookings"
  ON coaching_bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their bookings"
  ON coaching_bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- Coaching Subscriptions: Users can view their own subscriptions
CREATE POLICY "Users can view their subscriptions"
  ON coaching_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Coaches can view their subscribers"
  ON coaching_subscriptions FOR SELECT
  USING (coach_id IN (SELECT id FROM coaches WHERE user_id = auth.uid()));

CREATE POLICY "Users can create subscriptions"
  ON coaching_subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Coach Availability: Everyone can view, coaches can manage
CREATE POLICY "Coach availability is viewable by everyone"
  ON coach_availability FOR SELECT
  USING (true);

CREATE POLICY "Coaches can manage their availability"
  ON coach_availability FOR ALL
  USING (coach_id IN (SELECT id FROM coaches WHERE user_id = auth.uid()));

-- Function to get available coaching slots for a specific date
CREATE OR REPLACE FUNCTION get_available_coaching_slots(
  p_coach_id UUID,
  p_date DATE,
  p_sport TEXT DEFAULT NULL
)
RETURNS TABLE (
  slot_id UUID,
  start_time TIME,
  end_time TIME,
  duration_minutes INTEGER,
  spots_left INTEGER,
  day_name TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cs.id AS slot_id,
    cs.start_time,
    cs.end_time,
    cs.duration_minutes,
    cs.spots_left,
    TO_CHAR(p_date, 'Day') AS day_name
  FROM coaching_slots cs
  WHERE cs.coach_id = p_coach_id
    AND cs.is_available = true
    AND cs.day_of_week = EXTRACT(DOW FROM p_date)::INTEGER
    AND (p_sport IS NULL OR cs.sport = p_sport)
    -- Check if not fully booked for this specific date
    AND cs.spots_left > (
      SELECT COUNT(*)
      FROM coaching_bookings cb
      WHERE cb.slot_id = cs.id
        AND cb.booking_date = p_date
        AND cb.status = 'confirmed'
    )
    -- Check coach availability for this date
    AND NOT EXISTS (
      SELECT 1
      FROM coach_availability ca
      WHERE ca.coach_id = cs.coach_id
        AND ca.date = p_date
        AND ca.start_time <= cs.start_time
        AND ca.end_time >= cs.end_time
        AND ca.is_available = false
    )
  ORDER BY cs.start_time;
END;
$$ LANGUAGE plpgsql;

-- Function to book a coaching slot
CREATE OR REPLACE FUNCTION book_coaching_slot(
  p_user_id UUID,
  p_coach_id UUID,
  p_slot_id UUID,
  p_booking_date DATE,
  p_plan_id UUID DEFAULT NULL,
  p_amount NUMERIC DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_booking_id UUID;
  v_start_time TIME;
  v_end_time TIME;
  v_spots_available INTEGER;
BEGIN
  -- Get slot details and check availability
  SELECT start_time, end_time, spots_left
  INTO v_start_time, v_end_time, v_spots_available
  FROM coaching_slots
  WHERE id = p_slot_id
    AND coach_id = p_coach_id
    AND is_available = true;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Slot not available';
  END IF;

  -- Check if there are spots available for this date
  IF v_spots_available <= (
    SELECT COUNT(*)
    FROM coaching_bookings
    WHERE slot_id = p_slot_id
      AND booking_date = p_booking_date
      AND status = 'confirmed'
  ) THEN
    RAISE EXCEPTION 'No spots available for this date';
  END IF;

  -- Create booking
  INSERT INTO coaching_bookings (
    user_id,
    coach_id,
    plan_id,
    slot_id,
    booking_date,
    start_time,
    end_time,
    amount,
    status,
    payment_status
  ) VALUES (
    p_user_id,
    p_coach_id,
    p_plan_id,
    p_slot_id,
    p_booking_date,
    v_start_time,
    v_end_time,
    p_amount,
    'confirmed',
    CASE WHEN p_plan_id IS NOT NULL THEN 'paid' ELSE 'pending' END
  )
  RETURNING id INTO v_booking_id;

  -- Update subscription sessions if applicable
  IF p_plan_id IS NOT NULL THEN
    UPDATE coaching_subscriptions
    SET sessions_used = sessions_used + 1,
        sessions_remaining = sessions_remaining - 1,
        updated_at = NOW()
    WHERE plan_id = p_plan_id
      AND user_id = p_user_id
      AND status = 'active';
  END IF;

  RETURN v_booking_id;
END;
$$ LANGUAGE plpgsql;

-- Function to cancel a coaching booking
CREATE OR REPLACE FUNCTION cancel_coaching_booking(
  p_booking_id UUID,
  p_user_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_plan_id UUID;
BEGIN
  -- Get booking details
  SELECT plan_id INTO v_plan_id
  FROM coaching_bookings
  WHERE id = p_booking_id
    AND user_id = p_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Booking not found';
  END IF;

  -- Update booking status
  UPDATE coaching_bookings
  SET status = 'cancelled',
      updated_at = NOW()
  WHERE id = p_booking_id;

  -- Restore subscription session if applicable
  IF v_plan_id IS NOT NULL THEN
    UPDATE coaching_subscriptions
    SET sessions_used = sessions_used - 1,
        sessions_remaining = sessions_remaining + 1,
        updated_at = NOW()
    WHERE plan_id = v_plan_id
      AND user_id = p_user_id;
  END IF;

  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_coaches_updated_at BEFORE UPDATE ON coaches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coaching_plans_updated_at BEFORE UPDATE ON coaching_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coaching_slots_updated_at BEFORE UPDATE ON coaching_slots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coaching_bookings_updated_at BEFORE UPDATE ON coaching_bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coaching_subscriptions_updated_at BEFORE UPDATE ON coaching_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


