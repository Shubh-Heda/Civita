
ALTER TABLE trust_score_decay 
ALTER TABLE trust_score_weights 
ALTER TABLE trust_daily_gains 
ALTER TABLE feedback_pairs 
ALTER TABLE feedback_cooldowns 
ALTER TABLE trust_appeals 

-- Policies
CREATE POLICY "Users can view their own data"
  ON trust_score_decay FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can view their appeals"
  ON trust_appeals FOR SELECT
  USING (user_id = auth.uid() OR reviewer_id = auth.uid());

CREATE POLICY "Users can create appeals"
  ON trust_appeals FOR INSERT
  WITH CHECK (user_id = auth.uid());


