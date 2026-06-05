import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../lib/AuthProvider';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Compass,
  Gamepad2,
  Loader2,
  LockKeyhole,
  LogOut,
  MessageCircle,
  ShieldCheck,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

interface AuthPageProps {
  onAuthSuccess: () => void;
  onBack?: () => void;
}

const previewItems = [
  { icon: Trophy, label: 'Football at Sky Arena', meta: '3 spots open tonight', color: '#009b72' },
  { icon: CalendarDays, label: 'Indie music night', meta: 'Friday, 8 PM', color: '#c43b6d' },
  { icon: Gamepad2, label: 'Valorant squad', meta: 'Ranked lobby forming', color: '#315eea' },
];

function GoogleMark() {
  return (
    <svg className="auth-google-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

export function AuthPage({ onAuthSuccess, onBack }: AuthPageProps) {
  const { signIn, signInWithGoogle, user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [demoUserReady, setDemoUserReady] = useState(false);
  const [initializingDemo, setInitializingDemo] = useState(false);

  useEffect(() => {
    setDemoUserReady(true);
    setInitializingDemo(false);
  }, []);

  const handleDemoLogin = async () => {
    setTimeout(async () => {
      setLoading(true);
      try {
        const { data, error } = await signIn('demo@civita.com', 'demo123');
        if (error) {
          console.error('Demo login error:', error);
          toast.error('Demo login failed. Please try Google sign-in instead.');
        } else if (data) {
          toast.success('Demo profile opened');
          onAuthSuccess();
        }
      } catch (error: any) {
        console.error('Demo auth error:', error);
        toast.error('Demo login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 100);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { data, error } = await signInWithGoogle();
      if (error) {
        console.error('Google sign in error:', error);
        toast.error(error.message || 'Failed to sign in with Google');
      } else if (data) {
        toast.success('Welcome to Civita');
        onAuthSuccess();
      }
    } catch (error: any) {
      console.error('Google auth error:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <style>{`
        .auth-shell {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          color: #101828;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at 12% 18%, rgba(20, 184, 166, 0.26), transparent 32%),
            radial-gradient(circle at 88% 18%, rgba(196, 59, 109, 0.18), transparent 30%),
            linear-gradient(135deg, #f4fbf8 0%, #fff7ef 48%, #f8f5ff 100%);
        }

        .auth-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(16, 24, 40, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 24, 40, 0.06) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: linear-gradient(to bottom, black, transparent 86%);
          pointer-events: none;
        }

        .auth-back {
          position: absolute;
          z-index: 5;
          top: 24px;
          left: 24px;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 1px solid rgba(16, 24, 40, 0.12);
          background: rgba(255, 255, 255, 0.72);
          color: #344054;
          display: grid;
          place-items: center;
          box-shadow: 0 16px 50px rgba(16, 24, 40, 0.08);
          backdrop-filter: blur(18px);
          cursor: pointer;
          transition: transform 160ms ease, background 160ms ease, color 160ms ease;
        }

        .auth-back:hover {
          transform: translateY(-2px);
          background: #ffffff;
          color: #101828;
        }

        .auth-layout {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          max-width: 1180px;
          margin: 0 auto;
          padding: 88px 28px;
          display: grid;
          grid-template-columns: minmax(0, 1.04fr) minmax(390px, 0.82fr);
          gap: 34px;
          align-items: center;
        }

        .auth-hero {
          border-radius: 36px;
          padding: 42px;
          border: 1px solid rgba(255, 255, 255, 0.74);
          background: rgba(255, 255, 255, 0.54);
          box-shadow: 0 30px 90px rgba(16, 24, 40, 0.12);
          backdrop-filter: blur(22px);
        }

        .auth-brand-row {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 28px;
        }

        .auth-mark {
          width: 64px;
          height: 64px;
          border-radius: 22px;
          background: #101828;
          color: #ffffff;
          display: grid;
          place-items: center;
          box-shadow: 0 18px 36px rgba(16, 24, 40, 0.2);
        }

        .auth-mark-inner {
          width: 42px;
          height: 42px;
          border-radius: 15px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #10b981, #38bdf8 50%, #f97316);
        }

        .auth-kicker {
          margin: 0 0 4px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #667085;
        }

        .auth-title {
          margin: 0;
          max-width: 680px;
          font-size: clamp(52px, 7vw, 92px);
          line-height: 0.9;
          letter-spacing: -0.075em;
          font-weight: 950;
          color: #101828;
        }

        .auth-copy {
          margin: 24px 0 0;
          max-width: 660px;
          font-size: 19px;
          line-height: 1.65;
          color: #344054;
        }

        .auth-preview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 34px;
        }

        .auth-preview-card {
          min-height: 154px;
          border-radius: 28px;
          border: 1px solid rgba(16, 24, 40, 0.08);
          background: rgba(255, 255, 255, 0.72);
          padding: 18px;
          box-shadow: 0 14px 34px rgba(16, 24, 40, 0.08);
        }

        .auth-preview-icon {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border-radius: 18px;
          margin-bottom: 24px;
        }

        .auth-preview-label {
          margin: 0;
          color: #101828;
          font-weight: 850;
          line-height: 1.2;
        }

        .auth-preview-meta {
          margin: 8px 0 0;
          font-size: 14px;
          color: #667085;
        }

        .auth-signal-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 22px;
        }

        .auth-signal {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          border: 1px solid rgba(16, 24, 40, 0.1);
          background: rgba(255, 255, 255, 0.72);
          padding: 9px 13px;
          color: #344054;
          font-size: 13px;
          font-weight: 750;
          box-shadow: 0 10px 22px rgba(16, 24, 40, 0.06);
        }

        .auth-panel-wrap {
          border-radius: 34px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.56);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 36px 90px rgba(16, 24, 40, 0.16);
          backdrop-filter: blur(22px);
        }

        .auth-panel {
          border-radius: 26px;
          border: 1px solid rgba(16, 24, 40, 0.08);
          background: #fffdf8;
          padding: 34px;
        }

        .auth-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: #e7f8f1;
          color: #087457;
          border: 1px solid #bfead9;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .auth-panel-title {
          margin: 0;
          font-size: clamp(32px, 4vw, 44px);
          line-height: 1;
          letter-spacing: -0.055em;
          color: #101828;
          font-weight: 950;
        }

        .auth-panel-copy {
          margin: 14px 0 0;
          color: #475467;
          line-height: 1.65;
          font-size: 15px;
        }

        .auth-actions {
          margin-top: 28px;
          display: grid;
          gap: 12px;
        }

        .auth-button {
          width: 100%;
          min-height: 56px;
          border-radius: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 0;
          cursor: pointer;
          font-size: 15px;
          font-weight: 850;
          transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }

        .auth-button:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .auth-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .auth-google {
          color: #101828;
          background: #ffffff;
          border: 1px solid #d0d5dd;
          box-shadow: 0 12px 26px rgba(16, 24, 40, 0.08);
        }

        .auth-demo {
          background: #101828;
          color: #ffffff;
          justify-content: space-between;
          text-align: left;
          padding: 16px 18px;
          box-shadow: 0 20px 38px rgba(16, 24, 40, 0.18);
        }

        .auth-demo-text {
          display: grid;
          gap: 4px;
        }

        .auth-demo-title {
          font-weight: 900;
        }

        .auth-demo-sub {
          color: rgba(255, 255, 255, 0.68);
          font-size: 13px;
          font-weight: 600;
        }

        .auth-browse {
          background: transparent;
          color: #475467;
          min-height: 46px;
          border: 1px solid transparent;
        }

        .auth-browse:hover {
          background: rgba(255, 255, 255, 0.74);
          border-color: rgba(16, 24, 40, 0.1);
          color: #101828;
        }

        .auth-unlocks {
          margin-top: 24px;
          border-radius: 24px;
          border: 1px solid rgba(16, 24, 40, 0.08);
          background: #ffffff;
          padding: 18px;
        }

        .auth-unlocks-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 14px;
          color: #101828;
          font-weight: 900;
          font-size: 14px;
        }

        .auth-unlocks-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px 16px;
          color: #667085;
          font-size: 14px;
        }

        .auth-user-card {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }

        .auth-avatar {
          width: 64px;
          height: 64px;
          border-radius: 22px;
          display: grid;
          place-items: center;
          background: #101828;
          color: #ffffff;
          font-size: 24px;
          font-weight: 950;
        }

        .auth-account-box {
          border-radius: 24px;
          border: 1px solid rgba(16, 24, 40, 0.08);
          background: #ffffff;
          padding: 18px;
          margin: 22px 0;
        }

        .auth-account-label {
          margin: 0 0 4px;
          color: #667085;
          font-size: 13px;
          font-weight: 800;
        }

        .auth-account-email {
          margin: 0;
          color: #101828;
          font-size: 18px;
          font-weight: 850;
          overflow-wrap: anywhere;
        }

        .auth-primary {
          background: #101828;
          color: #ffffff;
          box-shadow: 0 20px 38px rgba(16, 24, 40, 0.18);
        }

        .auth-secondary {
          background: #ffffff;
          color: #344054;
          border: 1px solid #d0d5dd;
        }

        .auth-google-mark {
          width: 20px;
          height: 20px;
          flex: 0 0 auto;
        }

        .auth-icon {
          width: 20px;
          height: 20px;
          flex: 0 0 auto;
        }

        @media (max-width: 980px) {
          .auth-layout {
            grid-template-columns: 1fr;
            max-width: 760px;
            padding-top: 86px;
          }

          .auth-hero {
            padding: 30px;
          }
        }

        @media (max-width: 640px) {
          .auth-layout {
            padding: 78px 16px 30px;
          }

          .auth-title {
            font-size: 48px;
          }

          .auth-copy {
            font-size: 16px;
          }

          .auth-preview-grid {
            grid-template-columns: 1fr;
          }

          .auth-panel {
            padding: 24px;
          }

          .auth-unlocks-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {onBack && (
        <button className="auth-back" onClick={onBack} title="Back">
          <ArrowLeft className="auth-icon" />
        </button>
      )}

      <section className="auth-layout">
        <div className="auth-hero">
          <div className="auth-brand-row">
            <div className="auth-mark">
              <div className="auth-mark-inner">
                <Compass className="auth-icon" />
              </div>
            </div>
            <div>
              <p className="auth-kicker">Civita</p>
              <h1 className="auth-title">Find your next circle.</h1>
            </div>
          </div>

          <p className="auth-copy">
            Browse the city first. When something feels worth showing up for, sign in to join,
            chat, save your plans, and carry your trust score with you.
          </p>

          <div className="auth-preview-grid">
            {previewItems.map(({ icon: Icon, label, meta, color }) => (
              <div className="auth-preview-card" key={label}>
                <div className="auth-preview-icon" style={{ background: `${color}18`, color }}>
                  <Icon className="auth-icon" />
                </div>
                <p className="auth-preview-label">{label}</p>
                <p className="auth-preview-meta">{meta}</p>
              </div>
            ))}
          </div>

          <div className="auth-signal-row">
            <span className="auth-signal"><ShieldCheck className="auth-icon" /> Trust score ready</span>
            <span className="auth-signal"><Users className="auth-icon" /> Real people nearby</span>
            <span className="auth-signal"><MessageCircle className="auth-icon" /> Chats after joining</span>
          </div>
        </div>

        <div className="auth-panel-wrap">
          <div className="auth-panel">
            {user ? (
              <>
                <div className="auth-user-card">
                  <div className="auth-avatar">{(user.name || user.email).charAt(0).toUpperCase()}</div>
                  <div>
                    <p className="auth-kicker">You are in</p>
                    <h2 className="auth-panel-title">Welcome back</h2>
                  </div>
                </div>

                <div className="auth-account-box">
                  <p className="auth-account-label">Signed in as</p>
                  <p className="auth-account-email">{user.email}</p>
                </div>

                <div className="auth-actions">
                  <button className="auth-button auth-primary" type="button" onClick={onAuthSuccess}>
                    Continue to Civita
                  </button>
                  <button
                    className="auth-button auth-secondary"
                    type="button"
                    onClick={async () => {
                      await signOut();
                      toast.success('Logged out successfully');
                    }}
                  >
                    <LogOut className="auth-icon" />
                    Use another account
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="auth-pill">
                  <LockKeyhole className="auth-icon" />
                  Optional sign in
                </div>

                <h2 className="auth-panel-title">Join only when it clicks.</h2>
                <p className="auth-panel-copy">
                  No hard gate. Use an account when you want to join a plan, message a group,
                  or save your profile across sports, events, and gaming.
                </p>

                <div className="auth-actions">
                  <button className="auth-button auth-google" type="button" onClick={handleGoogleSignIn} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="auth-icon animate-spin" />
                        Opening sign in...
                      </>
                    ) : (
                      <>
                        <GoogleMark />
                        Continue with Google
                      </>
                    )}
                  </button>

                  {!import.meta.env.PROD && (
                    <button
                      className="auth-button auth-demo"
                      type="button"
                      onClick={handleDemoLogin}
                      disabled={loading || initializingDemo || !demoUserReady}
                    >
                      <span className="auth-demo-text">
                        <span className="auth-demo-title">
                          {initializingDemo || !demoUserReady ? 'Preparing demo profile' : "Browse demo profile"}
                        </span>
                        <span className="auth-demo-sub">Full app access with sample activity. No setup needed.</span>
                      </span>
                      {initializingDemo || !demoUserReady ? <Loader2 className="auth-icon animate-spin" /> : <Zap className="auth-icon" />}
                    </button>
                  )}

                </div>

                <div className="auth-unlocks">
                  <p className="auth-unlocks-title">
                    <CheckCircle2 className="auth-icon" />
                    What unlocks after sign in
                  </p>
                  <div className="auth-unlocks-grid">
                    <span>Join matches and rooms</span>
                    <span>Message confirmed groups</span>
                    <span>Save preferences</span>
                    <span>Build trust history</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
