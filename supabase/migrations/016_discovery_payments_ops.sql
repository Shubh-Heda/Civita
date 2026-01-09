
-- ============================================
-- Discovery, Payments Safety & Ops Analytics
-- ============================================

-- ============================================
-- PRESENCE & LIVE DISCOVERY
-- ============================================

CREATE TABLE IF NOT EXISTS presence_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('online', 'offline', 'idle')),
  location_data JSONB,
  device_info JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 minutes')
);

CREATE INDEX IF NOT EXISTS idx_presence_user ON presence_events(user_id);
CREATE INDEX IF NOT EXISTS idx_presence_expires ON presence_events(expires_at);

-- Saved Searches for Discovery
CREATE TABLE IF NOT EXISTS saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  search_params JSONB NOT NULL,
  sort_by TEXT DEFAULT 'relevance',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_saved_searches_user ON saved_searches(user_id);

-- Geo Alert Subscriptions
CREATE TABLE IF NOT EXISTS geo_alert_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  search_id UUID,
  geofence JSONB NOT NULL,
  notification_radius_km INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_geo_alerts_user ON geo_alert_subscriptions(user_id);

-- ============================================
-- PAYMENTS SAFETY
-- ============================================

CREATE TABLE IF NOT EXISTS payment_splits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  amount_cents INTEGER NOT NULL,
  split_reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_splits_user ON payment_splits(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_splits_status ON payment_splits(status);

-- Payment Refunds
CREATE TABLE IF NOT EXISTS payment_refunds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  original_amount_cents INTEGER NOT NULL,
  refund_amount_cents INTEGER NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_payment_refunds_user ON payment_refunds(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_refunds_status ON payment_refunds(status);

-- ID Verification Tiers
CREATE TABLE IF NOT EXISTS id_verification_tiers (
  user_id UUID PRIMARY KEY,
  verification_level TEXT DEFAULT 'unverified' CHECK (verification_level IN ('unverified', 'basic', 'intermediate', 'advanced')),
  verified_at TIMESTAMPTZ,
  expiry_date DATE,
  documents_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Device Risk Signals
CREATE TABLE IF NOT EXISTS device_risk_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  device_id TEXT NOT NULL,
  signal_type TEXT NOT NULL CHECK (signal_type IN ('new_device', 'vpn_detected', 'location_change', 'unusual_pattern')),
  risk_score INTEGER DEFAULT 0,
  action_taken TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_device_risk_user ON device_risk_signals(user_id);
CREATE INDEX IF NOT EXISTS idx_device_risk_signal ON device_risk_signals(signal_type);

-- ============================================
-- ANALYTICS & OPERATIONS
-- ============================================

CREATE TABLE IF NOT EXISTS product_analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  event_name TEXT NOT NULL,
  event_properties JSONB,
  session_id TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_user ON product_analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON product_analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON product_analytics_events(timestamp DESC);

-- Structured Logs for Ops
CREATE TABLE IF NOT EXISTS structured_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level TEXT NOT NULL CHECK (level IN ('debug', 'info', 'warn', 'error')),
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  context JSONB,
  user_id UUID,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_logs_level ON structured_logs(level);
CREATE INDEX IF NOT EXISTS idx_logs_service ON structured_logs(service);
CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON structured_logs(timestamp DESC);

-- Synthetic Checks
CREATE TABLE IF NOT EXISTS synthetic_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  check_type TEXT NOT NULL CHECK (check_type IN ('api', 'database', 'auth', 'payment')),
  endpoint TEXT NOT NULL,
  status TEXT DEFAULT 'unknown' CHECK (status IN ('up', 'down', 'degraded', 'unknown')),
  response_time_ms INTEGER,
  error_message TEXT,
  check_timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_synthetic_check_type ON synthetic_checks(check_type);
CREATE INDEX IF NOT EXISTS idx_synthetic_timestamp ON synthetic_checks(check_timestamp DESC);










