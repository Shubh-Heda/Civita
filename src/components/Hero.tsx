import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Gamepad2, ShieldCheck, Sparkles, Trophy } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onCategorySelect?: (category: 'sports' | 'events' | 'gaming') => void;
}

const DIVISION_PREVIEWS = [
  {
    id: 'sports',
    label: 'Sports & Turf',
    icon: Trophy,
    color: '#16a34a',
    lightBg: '#f0fdf4',
    border: '#bbf7d0',
    image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a26?w=900&q=80',
  },
  {
    id: 'events',
    label: 'Events',
    icon: CalendarDays,
    color: '#be123c',
    lightBg: '#fff1f2',
    border: '#fecdd3',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900&q=80',
  },
  {
    id: 'gaming',
    label: 'Gaming',
    icon: Gamepad2,
    color: '#1d4ed8',
    lightBg: '#eff6ff',
    border: '#bfdbfe',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80',
  },
] as const;

export function Hero({ onGetStarted, onCategorySelect }: HeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-grid-texture" />
      <div className="hero-shape" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-inner">
        <div className="hero-shell">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="hero-copy"
          >
            <div className="hero-eyebrow">
              <Sparkles className="hero-eyebrow-icon" />
              Sports, events, and gaming in one place.
            </div>

            <h1>Your city, ready when you are.</h1>

            <p>
              Civita helps you find people, plans, and places without the endless group-chat chase.
            </p>

            <div className="hero-actions">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onGetStarted}
                className="hero-primary"
              >
                Start exploring
                <ArrowRight className="hero-button-icon" />
              </motion.button>

              <div className="hero-trust">
                <ShieldCheck className="hero-trust-icon" />
                Trusted local community
              </div>
            </div>

            <div className="hero-focus-row">
              {DIVISION_PREVIEWS.map((division) => {
                const Icon = division.icon;

                return (
                  <button
                    type="button"
                    key={division.id}
                    className="hero-focus-pill"
                    style={{ color: division.color, background: division.lightBg, borderColor: division.border }}
                    onClick={() => onCategorySelect ? onCategorySelect(division.id) : onGetStarted()}
                  >
                    <Icon />
                    {division.label.replace(' & Turf', '')}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <div className="hero-image-collage" aria-label="Civita activities preview">
            {DIVISION_PREVIEWS.map((division, index) => {
              return (
                <motion.button
                  type="button"
                  key={division.id}
                  aria-label={`Explore ${division.label}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.22 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  className={`hero-image-tile hero-image-tile-${division.id}`}
                  style={{ borderColor: division.border }}
                  onClick={() => onCategorySelect ? onCategorySelect(division.id) : onGetStarted()}
                >
                  <img src={division.image} alt="" />
                </motion.button>
              );
            })}
            <div className="hero-collage-panel" />
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          background:
            linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.46) 48%, rgba(255,255,255,0.78) 100%),
            radial-gradient(circle at 18% 20%, rgba(34,197,94,0.14), transparent 28%),
            radial-gradient(circle at 72% 18%, rgba(244,63,94,0.12), transparent 30%),
            radial-gradient(circle at 58% 86%, rgba(37,99,235,0.12), transparent 34%),
            #f7f4ec;
          padding-top: 42px;
          padding-bottom: 58px;
          position: relative;
          overflow: hidden;
        }

        .hero-grid-texture {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.55;
          background-image:
            linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px);
          background-size: 38px 38px;
          pointer-events: none;
        }

        .hero-shape {
          position: absolute;
          inset: 20px 22px auto auto;
          width: 260px;
          height: 260px;
          background: conic-gradient(from 140deg, rgba(34,197,94,0.18), rgba(244,63,94,0.16), rgba(37,99,235,0.16), rgba(34,197,94,0.18));
          clip-path: polygon(50% 0%, 100% 28%, 82% 100%, 16% 84%, 0% 28%);
          filter: blur(1px);
          opacity: 0.45;
          pointer-events: none;
          z-index: 0;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
        }

        .hero-shell {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(460px, 1.08fr);
          align-items: center;
          gap: 62px;
          min-height: 570px;
        }

        .hero-copy {
          max-width: 520px;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          color: #475569;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
          margin-bottom: 18px;
        }

        .hero-eyebrow-icon {
          width: 14px;
          height: 14px;
        }

        .hero-copy h1 {
          font-size: clamp(42px, 5vw, 70px);
          font-weight: 900;
          color: #0f172a;
          margin: 0;
          line-height: 1.02;
          letter-spacing: 0;
        }

        .hero-copy p {
          font-size: 18px;
          color: #475569;
          max-width: 430px;
          margin: 18px 0 0;
          line-height: 1.62;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .hero-primary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 14px 22px;
          border-radius: 14px;
          border: 0;
          background: #111827;
          color: #fff;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.24);
        }

        .hero-button-icon {
          width: 17px;
          height: 17px;
        }

        .hero-trust {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #334155;
          font-size: 13px;
          font-weight: 700;
        }

        .hero-trust-icon {
          width: 17px;
          height: 17px;
          color: #0f766e;
        }

        .hero-focus-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
          max-width: 520px;
        }

        .hero-focus-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 13px;
          border: 1px solid;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 10px 28px rgba(15,23,42,0.05);
        }

        .hero-focus-pill svg {
          width: 18px;
          height: 18px;
        }

        .hero-image-collage {
          min-height: 590px;
          position: relative;
        }

        .hero-collage-panel {
          position: absolute;
          inset: 38px 26px 34px 42px;
          border-radius: 34px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.52), rgba(255,255,255,0.18)),
            linear-gradient(160deg, rgba(34,197,94,0.12), rgba(244,63,94,0.11), rgba(37,99,235,0.12));
          border: 1px solid rgba(255,255,255,0.82);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 22px 70px rgba(15,23,42,0.08);
          z-index: 0;
        }

        .hero-image-tile {
          position: absolute;
          padding: 0;
          border: 1.5px solid;
          border-radius: 28px;
          overflow: hidden;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 22px 56px rgba(15, 23, 42, 0.15);
          z-index: 1;
        }

        .hero-image-tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.03);
        }

        .hero-image-tile-sports {
          width: 58%;
          height: 330px;
          top: 10px;
          left: 0;
        }

        .hero-image-tile-events {
          width: 47%;
          height: 250px;
          top: 88px;
          right: 0;
          z-index: 2;
        }

        .hero-image-tile-gaming {
          width: 70%;
          height: 270px;
          left: 16%;
          bottom: 0;
          z-index: 3;
        }

        @media (max-width: 1024px) {
          .hero-shell {
            grid-template-columns: 1fr;
            min-height: auto;
            gap: 36px;
          }

          .hero-copy {
            max-width: 720px;
          }

          .hero-image-collage {
            min-height: 560px;
          }
        }

        @media (max-width: 700px) {
          .hero-copy h1 {
            font-size: 40px;
          }

          .hero-image-collage {
            min-height: auto;
            display: grid;
            gap: 14px;
          }

          .hero-collage-panel {
            display: none;
          }

          .hero-image-tile,
          .hero-image-tile-sports,
          .hero-image-tile-events,
          .hero-image-tile-gaming {
            position: relative;
            inset: auto;
            width: 100%;
            height: 220px;
            border-radius: 22px;
          }
        }
      `}</style>
    </section>
  );
}
