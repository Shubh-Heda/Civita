import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navigationItems = [
  { label: 'Home', value: 'landing', num: '01', accent: '#16a34a', fill: '#f0fdf4', border: '#86efac' },
  { label: 'Explore', value: 'explore', num: '02', accent: '#1d4ed8', fill: '#eff6ff', border: '#93c5fd' },
  { label: 'Community', value: 'community', num: '03', accent: '#be123c', fill: '#fff1f2', border: '#fda4af' },
] as const;

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const normalizedCurrentPage = currentPage.toLowerCase();

  return (
    <header className="civita-nav">
      <div className="civita-nav-ribbon" aria-hidden>
        <span className="civita-nav-ribbon-sports" />
        <span className="civita-nav-ribbon-events" />
        <span className="civita-nav-ribbon-gaming" />
      </div>

      <div className="civita-nav-inner">
        <motion.button
          type="button"
          whileHover={{ x: -2, y: -2 }}
          whileTap={{ x: 0, y: 0 }}
          className="civita-nav-brand"
          onClick={() => onNavigate('landing')}
          aria-label="Go to home"
        >
          <span className="civita-nav-mark">
            <Trophy className="civita-nav-mark-icon" strokeWidth={2.4} />
          </span>
          <span className="civita-nav-title">
            <span className="civita-nav-title-main">CIVITA</span>
            <span className="civita-nav-title-sub">city playbook</span>
          </span>
        </motion.button>

        <nav className="civita-nav-menu" aria-label="Main">
          <ul className="civita-nav-list">
            {navigationItems.map((item, index) => {
              const active = normalizedCurrentPage === item.value;
              return (
                <li key={item.value}>
                  <motion.button
                    type="button"
                    initial={false}
                    animate={{
                      rotate: active ? -2 : index === 1 ? 1.5 : -1,
                      y: active ? -3 : 0,
                    }}
                    whileHover={{ rotate: 0, y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate(item.value)}
                    className={`civita-nav-tab ${active ? 'is-active' : ''}`}
                    style={
                      {
                        '--tab-accent': item.accent,
                        '--tab-fill': item.fill,
                        '--tab-border': item.border,
                      } as React.CSSProperties
                    }
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="civita-nav-tab-num">{item.num}</span>
                    <span className="civita-nav-tab-label">{item.label}</span>
                    {active && <span className="civita-nav-tab-dot" aria-hidden />}
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="civita-nav-footer-line" aria-hidden />

      <style>{`
        .civita-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #f7f4ec;
          border-bottom: 3px solid #0f172a;
        }

        .civita-nav-ribbon {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          height: 5px;
        }

        .civita-nav-ribbon-sports {
          background: #16a34a;
        }

        .civita-nav-ribbon-events {
          background: #be123c;
        }

        .civita-nav-ribbon-gaming {
          background: #1d4ed8;
        }

        .civita-nav-inner {
          max-width: 80rem;
          margin: 0 auto;
          padding: 18px 24px 16px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 28px;
          flex-wrap: wrap;
        }

        .civita-nav-brand {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          border: 0;
          background: transparent;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
        }

        .civita-nav-mark {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          background: #0f172a;
          color: #f8fafc;
          border: 2.5px solid #0f172a;
          border-radius: 14px;
          box-shadow: 5px 5px 0 #16a34a;
          transform: rotate(-4deg);
        }

        .civita-nav-mark-icon {
          width: 26px;
          height: 26px;
        }

        .civita-nav-title {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .civita-nav-title-main {
          font-size: clamp(26px, 4vw, 34px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 0.95;
          color: #0f172a;
          text-transform: uppercase;
        }

        .civita-nav-title-sub {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #64748b;
          padding-left: 2px;
        }

        .civita-nav-menu {
          flex: 1;
          display: flex;
          justify-content: center;
          min-width: 0;
        }

        .civita-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: flex-end;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .civita-nav-tab {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          min-width: 108px;
          padding: 12px 16px 14px;
          border: 2.5px solid #0f172a;
          border-radius: 16px 16px 10px 10px;
          background: #fff;
          cursor: pointer;
          box-shadow: 4px 4px 0 #0f172a;
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }

        .civita-nav-tab::after {
          content: '';
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 6px;
          height: 6px;
          border-radius: 99px;
          background: repeating-linear-gradient(
            90deg,
            #0f172a 0 4px,
            transparent 4px 8px
          );
          opacity: 0.12;
        }

        .civita-nav-tab:hover {
          background: var(--tab-fill);
        }

        .civita-nav-tab.is-active {
          background: var(--tab-fill);
          box-shadow: 6px 6px 0 var(--tab-accent);
          border-color: var(--tab-accent);
        }

        .civita-nav-tab-num {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.12em;
          color: var(--tab-accent);
        }

        .civita-nav-tab-label {
          font-size: 15px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1;
        }

        .civita-nav-tab.is-active .civita-nav-tab-label {
          text-decoration: underline;
          text-decoration-thickness: 3px;
          text-underline-offset: 4px;
          text-decoration-color: var(--tab-accent);
        }

        .civita-nav-tab-dot {
          position: absolute;
          top: 10px;
          right: 12px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--tab-accent);
          border: 2px solid #0f172a;
        }

        .civita-nav-footer-line {
          height: 0;
        }

        @media (max-width: 767px) {
          .civita-nav-inner {
            padding: 14px 16px 12px;
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .civita-nav-brand {
            justify-content: center;
          }

          .civita-nav-menu {
            justify-content: stretch;
          }

          .civita-nav-list {
            width: 100%;
            justify-content: stretch;
            gap: 8px;
          }

          .civita-nav-tab {
            flex: 1;
            min-width: 0;
            padding: 10px 10px 12px;
            align-items: center;
            text-align: center;
          }

          .civita-nav-tab-num {
            display: none;
          }

          .civita-nav-mark {
            width: 44px;
            height: 44px;
          }

          .civita-nav-title-main {
            font-size: 24px;
          }
        }
      `}</style>
    </header>
  );
}
