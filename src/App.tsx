import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Calculator,
  ChevronDown,
  Clock3,
  Gamepad2,
  Headphones,
  Menu,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRound,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import { Language, TRANSLATIONS } from './translations';

const heroImage = '/hero-fox.png';
const USDT_RATE = 25800; // 1 USDT = 25,800 VNĐ

interface ServerItem {
  server: string;
  rate: number | null;
}

interface RegionData {
  code: string;
  name: string;
  emoji: string;
  ping: string;
  row1: ServerItem[];
  row2: ServerItem[];
}

const REGIONS_DATA: Record<string, RegionData> = {
  ASIA: {
    code: 'ASIA',
    name: 'Asia',
    emoji: '🌏',
    ping: '24ms',
    row1: [
      { server: 'Siel', rate: 13.9 },
      { server: 'Nezekan', rate: 13.1 },
      { server: 'Vaizel', rate: 11.3 },
      { server: 'Kaisinel', rate: 13.3 },
      { server: 'Meslamtaeda', rate: 11.8 },
      { server: 'Fregion', rate: 11.8 },
      { server: 'Yustiel', rate: 15.3 },
      { server: 'Ariel', rate: 13.9 },
      { server: 'Hithanya', rate: 11.7 },
      { server: 'Nania', rate: 13.7 },
    ],
    row2: [
      { server: 'Israphel', rate: 13.5 },
      { server: 'Zikel', rate: 13.0 },
      { server: 'Triniel', rate: 13.2 },
      { server: 'Lumiel', rate: 13.4 },
      { server: 'Beritra', rate: 10.8 },
      { server: 'Ereshkigal', rate: 13.2 },
      { server: 'Marchutan', rate: 15.8 },
      { server: 'Azphel', rate: 10.0 },
      { server: 'Nemon', rate: 13.8 },
      { server: 'Hadala', rate: 14.8 },
    ],
  },
  EU: {
    code: 'EU',
    name: 'Europe',
    emoji: '🏰',
    ping: '96ms',
    row1: [
      { server: 'Siel', rate: 13.1 },
      { server: 'Nezekan', rate: 14.5 },
      { server: 'Vaizel', rate: 14.4 },
      { server: 'Kaisinel', rate: 14.1 },
      { server: 'Meslamtaeda', rate: 9.9 },
      { server: 'Fregion', rate: 16.2 },
      { server: 'Yustiel', rate: 13.2 },
      { server: 'Ariel', rate: 13.0 },
      { server: 'Hithanya', rate: 13.1 },
      { server: 'Nania', rate: 25.2 },
      { server: 'Tahavatha', rate: 15.2 },
      { server: 'Luteros', rate: 21.5 },
      { server: 'Phemos', rate: 30.2 },
      { server: 'Daminu', rate: 24.2 },
      { server: 'Kasaka', rate: 20.5 },
      { server: 'Bakarma', rate: 26.7 },
      { server: 'Tsenka', rate: 33.7 },
      { server: 'Kochi', rate: 27.7 },
      { server: 'Ishtar', rate: 17.1 },
      { server: 'Tiamat', rate: 28.4 },
      { server: 'Gauss', rate: 38.6 },
      { server: 'Lamuatan', rate: 24.3 },
      { server: 'Nathara', rate: 41.0 },
    ],
    row2: [
      { server: 'Israphel', rate: 13.9 },
      { server: 'Zikel', rate: 13.9 },
      { server: 'Triniel', rate: 17.5 },
      { server: 'Lumiel', rate: 17.0 },
      { server: 'Beritra', rate: 18.6 },
      { server: 'Ereshkigal', rate: 15.3 },
      { server: 'Marchutan', rate: 20.4 },
      { server: 'Azphel', rate: 14.6 },
      { server: 'Nemon', rate: 20.3 },
      { server: 'Hadala', rate: 18.7 },
      { server: 'Ludra', rate: 25.4 },
      { server: 'Ulgorn', rate: 18.6 },
      { server: 'Mumin', rate: 18.9 },
      { server: 'Odar', rate: 19.1 },
      { server: 'Zemurru', rate: 20.5 },
      { server: 'Kromede', rate: 19.1 },
      { server: 'Baba', rate: 24.3 },
      { server: 'Fafnir', rate: 25.1 },
      { server: 'Indnath', rate: 18.0 },
      { server: 'Agnita', rate: 21.8 },
      { server: 'Atiel', rate: 23.0 },
      { server: 'Tassin', rate: 25.4 },
      { server: 'Quai', rate: 19.0 },
    ],
  },
  'NA-WEST': {
    code: 'NA-WEST',
    name: 'NA West',
    emoji: '🦅',
    ping: '142ms',
    row1: [
      { server: 'Siel', rate: 17.3 },
      { server: 'Nezekan', rate: 14.9 },
      { server: 'Vaizel', rate: 19.4 },
      { server: 'Kaisinel', rate: 15.3 },
      { server: 'Meslamtaeda', rate: null },
      { server: 'Fregion', rate: null },
      { server: 'Yustiel', rate: 21.3 },
      { server: 'Ariel', rate: null },
    ],
    row2: [
      { server: 'Israphel', rate: 13.6 },
      { server: 'Zikel', rate: 15.9 },
      { server: 'Triniel', rate: 14.0 },
      { server: 'Lumiel', rate: 16.9 },
      { server: 'Beritra', rate: null },
      { server: 'Ereshkigal', rate: null },
      { server: 'Marchutan', rate: 16.3 },
      { server: 'Azphel', rate: null },
    ],
  },
  'NA-EAST': {
    code: 'NA-EAST',
    name: 'NA East',
    emoji: '🗽',
    ping: '158ms',
    row1: [
      { server: 'Siel', rate: 22.9 },
      { server: 'Nezekan', rate: 21.1 },
      { server: 'Vaizel', rate: 16.8 },
      { server: 'Kaisinel', rate: 16.4 },
      { server: 'Meslamtaeda', rate: 13.7 },
      { server: 'Fregion', rate: 10.4 },
      { server: 'Yustiel', rate: 20.1 },
      { server: 'Ariel', rate: 20.1 },
      { server: 'Hithanya', rate: 15.3 },
    ],
    row2: [
      { server: 'Israphel', rate: 18.2 },
      { server: 'Zikel', rate: 20.5 },
      { server: 'Triniel', rate: 17.4 },
      { server: 'Lumiel', rate: 18.3 },
      { server: 'Beritra', rate: 24.3 },
      { server: 'Ereshkigal', rate: 15.1 },
      { server: 'Marchutan', rate: 14.4 },
      { server: 'Azphel', rate: 16.2 },
      { server: 'Nemon', rate: 22.2 },
    ],
  },
  SA: {
    code: 'SA',
    name: 'South America',
    emoji: '🌴',
    ping: '181ms',
    row1: [
      { server: 'Siel', rate: 30.4 },
      { server: 'Nezekan', rate: 32.0 },
      { server: 'Vaizel', rate: 29.4 },
      { server: 'Kaisinel', rate: 45.2 },
      { server: 'Meslamtaeda', rate: null },
      { server: 'Fregion', rate: null },
      { server: 'Yustiel', rate: 38.4 },
      { server: 'Ariel', rate: 122.7 },
    ],
    row2: [
      { server: 'Israphel', rate: 25.5 },
      { server: 'Zikel', rate: 29.4 },
      { server: 'Triniel', rate: 42.0 },
      { server: 'Lumiel', rate: null },
      { server: 'Beritra', rate: null },
      { server: 'Ereshkigal', rate: null },
      { server: 'Marchutan', rate: null },
      { server: 'Azphel', rate: 48.4 },
    ],
  },
};

const REGION_ASSETS: Record<string, { earth: string; color: string }> = {
  ASIA: { earth: '/earth-asia.svg', color: '#2bd8c0' },
  EU: { earth: '/earth-europe.svg', color: '#38bdf8' },
  'NA-WEST': { earth: '/earth-north-america.svg', color: '#ff9d4a' },
  'NA-EAST': { earth: '/earth-na-east.svg', color: '#818cf8' },
  SA: { earth: '/earth-south-america.svg', color: '#4ade80' },
};

const REGION_SHORT_LABEL: Record<string, string> = {
  ASIA: 'Asia',
  EU: 'EU',
  'NA-WEST': 'NA-W',
  'NA-EAST': 'NA-E',
  SA: 'S',
};

const regions = Object.values(REGIONS_DATA).map((reg) => ({
  name: reg.name,
  code: reg.code,
  emoji: reg.emoji,
  servers: reg.row1.length + reg.row2.length,
  ping: reg.ping,
}));

const allServerList = Object.entries(REGIONS_DATA).flatMap(([regCode, reg]) =>
  [...reg.row1, ...reg.row2].map((s, idx) => ({
    name: s.server,
    region: regCode,
    regionName: reg.name,
    rate: s.rate,
    online: s.rate !== null ? 350 + ((idx * 47) % 520) : 0,
    price: s.rate !== null ? `${s.rate}k / M` : 'N/A',
    status: s.rate !== null ? 'Ổn định' : 'Tạm ngưng',
  }))
);

function App() {
  const [lang, setLang] = useState<Language>('vi');
  const t = TRANSLATIONS[lang];

  const [activeRegion, setActiveRegion] = useState('ASIA');
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [consignModalOpen, setConsignModalOpen] = useState(false);
  const [boosterCategory, setBoosterCategory] = useState<'all' | 'leveling' | 'pet' | 'dungeon' | 'custom'>('all');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'excel' | 'cards'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return 'cards';
    }
    return 'excel';
  });
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);

  // Simple Auth states (tùy chọn, không bắt buộc đăng nhập để dùng web)
  const [authUser, setAuthUser] = useState<{ username: string; phone?: string } | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gegeteam_auth_user');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return null;
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!authUsername.trim() || !authPassword.trim()) {
      setAuthError('Vui lòng điền đầy đủ tài khoản và mật khẩu!');
      return;
    }
    try {
      const rawUsers = localStorage.getItem('gegeteam_users_db') || '{}';
      const usersDb = JSON.parse(rawUsers);
      const existing = usersDb[authUsername.trim().toLowerCase()];
      if (existing) {
        if (existing.password === authPassword) {
          const loggedUser = { username: existing.username, phone: existing.phone };
          setAuthUser(loggedUser);
          localStorage.setItem('gegeteam_auth_user', JSON.stringify(loggedUser));
          setAuthSuccess('Đăng nhập thành công!');
          setTimeout(() => {
            setAuthModalOpen(false);
            setAuthSuccess('');
          }, 600);
          return;
        } else {
          setAuthError('Mật khẩu không chính xác!');
          return;
        }
      } else {
        const loggedUser = { username: authUsername.trim() };
        usersDb[authUsername.trim().toLowerCase()] = { username: authUsername.trim(), password: authPassword };
        localStorage.setItem('gegeteam_users_db', JSON.stringify(usersDb));
        setAuthUser(loggedUser);
        localStorage.setItem('gegeteam_auth_user', JSON.stringify(loggedUser));
        setAuthSuccess('Đăng nhập thành công!');
        setTimeout(() => {
          setAuthModalOpen(false);
          setAuthSuccess('');
        }, 600);
      }
    } catch {
      const loggedUser = { username: authUsername.trim() };
      setAuthUser(loggedUser);
      localStorage.setItem('gegeteam_auth_user', JSON.stringify(loggedUser));
      setAuthModalOpen(false);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!authUsername.trim() || !authPassword.trim()) {
      setAuthError('Vui lòng nhập tên tài khoản và mật khẩu!');
      return;
    }
    if (authPassword.length < 4) {
      setAuthError('Mật khẩu tối thiểu 4 ký tự!');
      return;
    }
    try {
      const rawUsers = localStorage.getItem('gegeteam_users_db') || '{}';
      const usersDb = JSON.parse(rawUsers);
      const key = authUsername.trim().toLowerCase();
      if (usersDb[key]) {
        setAuthError('Tên tài khoản này đã có người đăng ký, vui lòng chọn tên khác!');
        return;
      }
      usersDb[key] = {
        username: authUsername.trim(),
        password: authPassword,
        phone: authPhone.trim(),
      };
      localStorage.setItem('gegeteam_users_db', JSON.stringify(usersDb));
      const loggedUser = { username: authUsername.trim(), phone: authPhone.trim() };
      setAuthUser(loggedUser);
      localStorage.setItem('gegeteam_auth_user', JSON.stringify(loggedUser));
      setAuthSuccess('Đăng ký thành công! Chào mừng bạn gia nhập GeGe Team.');
      setTimeout(() => {
        setAuthModalOpen(false);
        setAuthSuccess('');
      }, 700);
    } catch {
      const loggedUser = { username: authUsername.trim(), phone: authPhone.trim() };
      setAuthUser(loggedUser);
      localStorage.setItem('gegeteam_auth_user', JSON.stringify(loggedUser));
      setAuthModalOpen(false);
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.removeItem('gegeteam_auth_user');
  };

  // Calculator states
  const [calcServerKey, setCalcServerKey] = useState('ASIA|Siel|13.9');
  const [calcAmount, setCalcAmount] = useState<number | string>(0);
  const [payoutCurrency, setPayoutCurrency] = useState<'VND' | 'USDT'>('VND');

  const selectedCalcServer = useMemo(() => {
    const [region, server, rateStr] = calcServerKey.split('|');
    const rate = parseFloat(rateStr) || 0;
    return { region, server, rate };
  }, [calcServerKey]);

  const numericCalcAmount = typeof calcAmount === 'number' ? calcAmount : (parseFloat(calcAmount) || 0);
  const calcTotalVND = Math.round(numericCalcAmount * selectedCalcServer.rate * 1000);
  const calcTotalUSDT = (calcTotalVND / USDT_RATE).toFixed(2);

  const filteredServers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return allServerList.filter((server) => server.region === activeRegion);
    }
    // Match in current region first
    const inRegion = allServerList.filter(
      (server) => server.region === activeRegion && server.name.toLowerCase().includes(q)
    );
    if (inRegion.length > 0) return inRegion;
    // Or match across all regions
    return allServerList.filter((server) => server.name.toLowerCase().includes(q));
  }, [activeRegion, search]);

  const currentRegionData = REGIONS_DATA[activeRegion] || REGIONS_DATA['ASIA'];

  const onSelectServerForCalc = (regionCode: string, serverName: string, rate: number | null) => {
    if (rate === null) return;
    setCalcServerKey(`${regionCode}|${serverName}|${rate}`);
    const el = document.getElementById('calc-widget');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="site-header">
        <a className="brand" href="#sec-landing" aria-label="Gege Team trang chủ">
          <img src="/gegeteam-logo.png" alt="GeGe Team Logo" className="brand-logo-img" />
          <span className="brand-text-wrap">
            <strong>GEGE</strong>
            <small>TEAM</small>
          </span>
        </a>
        <nav className={`main-nav ${mobileMenu ? 'is-open' : ''}`}>
          <a className="active" href="#sec-landing" onClick={() => setMobileMenu(false)}>
            {t.nav.home}
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenu(false);
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t.nav.pricing}
          </a>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => {
              setMobileMenu(false);
              setConsignModalOpen(true);
            }}
          >
            {t.nav.consign}
          </button>
          <a
            href="https://zalo.me/0936854505"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenu(false)}
          >
            {t.nav.support}
          </a>
          {authUser ? (
            <div className="mobile-auth-bar">
              <span>👤 <b>{authUser.username}</b></span>
              <button
                type="button"
                className="mobile-logout-btn"
                onClick={() => {
                  handleLogout();
                  setMobileMenu(false);
                }}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="mobile-login-btn"
              onClick={() => {
                setMobileMenu(false);
                setAuthError('');
                setAuthSuccess('');
                setAuthModalOpen(true);
              }}
            >
              <UserRound size={16} /> {t.nav.login}
            </button>
          )}
        </nav>
        <div className="header-actions">
          {/* Language Switcher */}
          <button
            type="button"
            className="lang-toggle-btn"
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            title={lang === 'vi' ? 'Chuyển sang Tiếng Anh (English)' : 'Switch to Vietnamese'}
          >
            <span>{lang === 'vi' ? '🇻🇳 VN' : '🇬🇧 EN'}</span>
          </button>
          {authUser ? (
            <div className="auth-user-badge">
              <span className="aub-name">
                <UserRound size={14} /> <b>{authUser.username}</b>
              </span>
              <button
                type="button"
                className="aub-logout-btn"
                onClick={handleLogout}
                title="Đăng xuất"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="outline-button header-login"
              onClick={() => {
                setAuthError('');
                setAuthSuccess('');
                setAuthModalOpen(true);
              }}
            >
              <UserRound size={15} />
              <span>{t.nav.login}</span>
            </button>
          )}
          <button
            className="menu-toggle"
            aria-label="Mở menu"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="sec-landing">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow eyebrow-orange">{t.hero.eyebrow}</div>
            <h1>
              {t.hero.title1}
              <br />
              <em>{t.hero.title2}</em>
            </h1>
            <p>{t.hero.desc}</p>
            <div className="hero-actions">
              <a
                href="#pricing"
                className="primary-button"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t.hero.cta} <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-trust">
              <div className="trust-avatars">
                <span>G</span>
                <span>A</span>
                <span>K</span>
                <span>+</span>
              </div>
              <span>
                <b>1.510+</b> {t.hero.trust}
              </span>
            </div>
          </div>
          <div className="hero-art-wrap">
            <div className="hero-glow" />
            <img className="hero-art" src={heroImage} alt="Chiến binh trong thế giới fantasy" />
          </div>
        </section>

        <section className="feature-strip">
          <div>
            <span className="feature-icon orange">
              <ShieldCheck size={19} />
            </span>
            <span>
              <b>{t.features.safeTrade}</b>
              <small>{t.features.safeTradeSub}</small>
            </span>
          </div>
          <div>
            <span className="feature-icon blue">
              <Zap size={19} />
            </span>
            <span>
              <b>{t.features.booster}</b>
              <small>{t.features.boosterSub}</small>
            </span>
          </div>
          <div>
            <span className="feature-icon green">
              <Headphones size={19} />
            </span>
            <span>
              <b>{t.features.support}</b>
              <small>{t.features.supportSub}</small>
            </span>
          </div>
          <div className="feature-stat">
            <b>
              4.9<span>/5</span>
            </b>
            <small>{t.features.ratingSub}</small>
          </div>
        </section>

        <section className="pricing-section" id="pricing">
          <div className="section-heading">
            <div>
              <div className="eyebrow eyebrow-orange">{t.pricing.eyebrow}</div>
              <h2>
                {t.pricing.title} <em>{t.pricing.titleEm}</em>
              </h2>
              <p>{t.pricing.subtitle}</p>
            </div>
            <div className="updated updated-orange">
              <span className="live-pulse-dot" />
              {t.pricing.updated} <b>{t.pricing.justNow}</b>
            </div>
          </div>

          <div className="market-panel">
            <div className="market-toolbar">
              <div className="game-select-wrap">
                <button
                  type="button"
                  className="game-select-toggle"
                  onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
                  aria-expanded={regionDropdownOpen}
                >
                  <Gamepad2 size={18} />
                  <span>
                    <small>{t.pricing.viewingGame}</small>
                    <b>AION 2</b>
                  </span>
                  <ChevronDown size={16} className={`chevron-icon ${regionDropdownOpen ? 'rotated' : ''}`} />
                </button>

                {regionDropdownOpen && (
                  <div className="region-menu-dropdown">
                    {regions.map((region) => (
                      <button
                        key={region.code}
                        type="button"
                        className={`region-menu-row ${activeRegion === region.code ? 'active' : ''}`}
                        onClick={() => {
                          setActiveRegion(region.code);
                          setRegionDropdownOpen(false);
                        }}
                      >
                        <span className="rmr-flag">{region.emoji}</span>
                        <span className="rmr-name">{region.name}</span>
                        <span className="rmr-servers">{region.servers} {t.pricing.serversWord}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="refresh-button"
                onClick={() => {
                  alert(t.pricing.refreshAlert);
                }}
              >
                <RefreshCw size={15} /> {t.pricing.refresh}
              </button>
            </div>

            {/* VÙNG CHỌN REGION: Mặc định tối giản chuẩn như ảnh mẫu, Hover hiện quả địa cầu 3D tràn ngập ô */}
            <div className="region-grid">
              {regions.map((region) => {
                const asset = REGION_ASSETS[region.code] || REGION_ASSETS['ASIA'];
                const isSelected = activeRegion === region.code;
                return (
                  <button
                    key={region.code}
                    type="button"
                    className={`region-card ${isSelected ? 'selected' : ''} region-card-${region.code.toLowerCase()}`}
                    onClick={() => setActiveRegion(region.code)}
                  >
                    {/* Quả địa cầu 3D tràn ngập toàn bộ ô khi Hover */}
                    <div className="rc-hover-backdrop">
                      <img
                        src={asset.earth}
                        alt=""
                        className="rc-full-earth"
                      />
                      <div className="rc-backdrop-overlay" />
                    </div>

                    {/* Nội dung trung tâm: Mặc định chỉ hiện chữ tên Vùng (ASIA, EUROPE...) */}
                    <div className="rc-main-content">
                      <b className="rc-title">{region.name}</b>
                      <span className="rc-meta">
                        <span>{region.servers} servers</span>
                        <i className="rc-meta-sep">•</i>
                        <span className="rc-ping">{region.ping}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="server-head">
              <div className="search-box">
                <Search size={16} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t.pricing.searchPlaceholder}
                />
                {search && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setSearch('')}
                    title={t.pricing.clearSearch}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="table-note">
                <button
                  type="button"
                  className={`table-view-btn ${viewMode === 'excel' ? 'active' : ''}`}
                  onClick={() => setViewMode('excel')}
                >
                  {t.pricing.viewExcel}
                </button>
                <button
                  type="button"
                  className={`table-view-btn ${viewMode === 'cards' ? 'active' : ''}`}
                  onClick={() => setViewMode('cards')}
                >
                  {t.pricing.viewCards}
                </button>
              </div>
            </div>

            <div className="active-region">
              <span>
                {t.pricing.viewing} <b>{currentRegionData.name}</b> ({currentRegionData.row1.length + currentRegionData.row2.length} {t.pricing.serversWord})
              </span>
              <small>{t.pricing.hintClick}</small>
            </div>

            {/* VIEW 1: BẢNG EXCEL ĐẦY ĐỦ - SỐ NỔI BẬT THU HÚT GIAO DỊCH */}
            {viewMode === 'excel' && (
              <div className="excel-sheet-wrapper">
                <div className="excel-region-row">
                  <div className="excel-region-title">
                    <span>{currentRegionData.name}</span>
                  </div>
                  <div className="excel-table-scroll">
                    <table className="excel-green-table">
                      <thead>
                        <tr>
                          {currentRegionData.row1.map((item) => (
                            <th key={`h1-${item.server}`} className={search.trim() && item.server.toLowerCase().includes(search.toLowerCase()) ? 'th-highlighted' : ''}>{item.server}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {currentRegionData.row1.map((item) => (
                            <td
                              key={`r1-${item.server}`}
                              className={`${item.rate === null ? 'cell-na' : 'cell-clickable'} ${search.trim() && item.server.toLowerCase().includes(search.toLowerCase()) ? 'cell-highlighted' : ''}`.trim()}
                              onClick={() => onSelectServerForCalc(currentRegionData.code, item.server, item.rate)}
                              title={item.rate !== null ? `🔥 Nhấp để ký gửi ngay server ${item.server} (Tỷ giá ${item.rate})` : 'Chưa có tỷ giá'}
                            >
                              {item.rate !== null ? (
                                <span className="rate-num-val">
                                  {item.rate.toFixed(1)}
                                </span>
                              ) : (
                                <span className="rate-na-text">N/A</span>
                              )}
                            </td>
                          ))}
                        </tr>
                        <tr className="excel-header-row2">
                          {currentRegionData.row2.map((item) => (
                            <th key={`h2-${item.server}`} className={search.trim() && item.server.toLowerCase().includes(search.toLowerCase()) ? 'th-highlighted' : ''}>{item.server}</th>
                          ))}
                        </tr>
                        <tr>
                          {currentRegionData.row2.map((item) => (
                            <td
                              key={`r2-${item.server}`}
                              className={`${item.rate === null ? 'cell-na' : 'cell-clickable'} ${search.trim() && item.server.toLowerCase().includes(search.toLowerCase()) ? 'cell-highlighted' : ''}`.trim()}
                              onClick={() => onSelectServerForCalc(currentRegionData.code, item.server, item.rate)}
                              title={item.rate !== null ? `🔥 Nhấp để ký gửi ngay server ${item.server} (Tỷ giá ${item.rate})` : 'Chưa có tỷ giá'}
                            >
                              {item.rate !== null ? (
                                <span className="rate-num-val">
                                  {item.rate.toFixed(1)}
                                </span>
                              ) : (
                                <span className="rate-na-text">N/A</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: DẠNG THẺ DANH SÁCH GỌN */}
            {viewMode === 'cards' && (
              <div className="server-list">
                {filteredServers.length ? (
                  filteredServers.map((server) => (
                    <div
                      className="server-row server-row-orange"
                      key={`${server.region}-${server.name}`}
                      onClick={() => onSelectServerForCalc(server.region, server.name, server.rate)}
                    >
                      <img src="/kinah-coin.png" alt="Kinah" className="server-coin-icon" />
                      <span className="server-name-orange">
                        <b>{server.name}</b>
                        {search.trim() !== '' && (
                          <small className="server-reg-badge">{server.regionName}</small>
                        )}
                      </span>
                      <strong className="server-price-orange">
                        {server.rate !== null ? `${t.pricing.rateWord}: ${server.rate}` : 'N/A'}
                      </strong>
                      <button
                        className="buy-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectServerForCalc(server.region, server.name, server.rate);
                        }}
                      >
                        {t.pricing.sellBtn} <ArrowRight size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    {t.pricing.noServers}
                  </div>
                )}
              </div>
            )}

            {/* MÁY TÍNH TIỀN KINA NHANH (HỖ TRỢ CẢ TIỀN VIỆT VNĐ VÀ VÍ TIỀN SỐ USDT) */}
            <div className="quick-calculator-card" id="calc-widget">
              <div className="calc-top-header">
                <div className="calc-title-box">
                  <Calculator size={18} color="#38bdf8" />
                  <span className="calc-top-title">{t.calculator.title}</span>
                  <span className="calc-top-sub">{t.calculator.subtitle}</span>
                </div>

                {/* Thanh chọn đơn vị tiền: VNĐ vs USDT Ví Crypto */}
                <div className="calc-currency-pills">
                  <span className="ccp-label">{t.calculator.payoutMethod}</span>
                  <button
                    type="button"
                    className={`ccp-pill ${payoutCurrency === 'VND' ? 'active' : ''}`}
                    onClick={() => setPayoutCurrency('VND')}
                  >
                    🇻🇳 VNĐ
                  </button>
                  <button
                    type="button"
                    className={`ccp-pill ${payoutCurrency === 'USDT' ? 'active' : ''}`}
                    onClick={() => setPayoutCurrency('USDT')}
                  >
                    <img src="/usdt-icon.svg" alt="USDT" className="ccp-usdt-icon" />
                    ₮ USDT
                  </button>
                  <span className="ccp-rate-badge">{t.calculator.usdtRateHint}</span>
                </div>
              </div>

              <div className="calc-inputs-bar">
                <div className="calc-input-item">
                  <label>{t.calculator.selectServer}</label>
                  <select
                    value={calcServerKey}
                    onChange={(e) => setCalcServerKey(e.target.value)}
                  >
                    {Object.values(REGIONS_DATA).map((reg) => (
                      <optgroup key={reg.code} label={`${reg.name} (${REGION_SHORT_LABEL[reg.code] || reg.code})`}>
                        {[...reg.row1, ...reg.row2]
                          .filter((s) => s.rate !== null)
                          .map((s) => (
                            <option
                              key={`${reg.code}-${s.server}`}
                              value={`${reg.code}|${s.server}|${s.rate}`}
                            >
                              {s.server} ({REGION_SHORT_LABEL[reg.code] || reg.code}) · {s.rate}k
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="calc-input-item">
                  <label>{t.calculator.amountLabel}</label>
                  <div className="calc-amount-input-wrap">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      value={calcAmount}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          setCalcAmount('');
                        } else {
                          const parsed = parseFloat(val);
                          setCalcAmount(isNaN(parsed) ? '' : Math.max(0, parsed));
                        }
                      }}
                    />
                    <span className="calc-amount-unit">M</span>
                  </div>
                </div>

                {/* Cột hiển thị số tiền nhận được */}
                <div className="calc-input-item calc-output-item">
                  <label>{payoutCurrency === 'VND' ? 'Số tiền nhận được (VNĐ)' : 'Số tiền nhận được (USDT)'}</label>
                  <div className="calc-display-screen">
                    {payoutCurrency === 'VND' ? (
                      <>
                        <span className="calc-screen-val">
                          {calcTotalVND.toLocaleString('vi-VN')}
                        </span>
                        <span className="calc-screen-unit">VNĐ</span>
                        <button
                          type="button"
                          className="calc-screen-convert-pill"
                          onClick={() => setPayoutCurrency('USDT')}
                          title="Đổi hiển thị sang USDT"
                        >
                          ≈ {calcTotalUSDT} USDT
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="calc-screen-val">
                          {calcTotalUSDT}
                        </span>
                        <span className="calc-screen-unit">USDT</span>
                        <button
                          type="button"
                          className="calc-screen-convert-pill"
                          onClick={() => setPayoutCurrency('VND')}
                          title="Đổi hiển thị sang VNĐ"
                        >
                          ≈ {calcTotalVND.toLocaleString('vi-VN')} đ
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="calc-cta-wrap">
                  <a
                    href={`https://zalo.me/0936854505?text=${encodeURIComponent(
                      payoutCurrency === 'USDT'
                        ? `Chào Admin GeGe Team, mình muốn ký gửi ${calcAmount || 0}M Kina tại server ${selectedCalcServer.server} (${selectedCalcServer.region}), nhận thanh toán qua VÍ TIỀN SỐ USDT: ${calcTotalUSDT} USDT (Tương đương ${calcTotalVND.toLocaleString('vi-VN')} VNĐ). Nhờ Admin hỗ trợ!`
                        : `Chào Admin GeGe Team, mình muốn ký gửi ${calcAmount || 0}M Kina tại server ${selectedCalcServer.server} (${selectedCalcServer.region}), số tiền ước tính ${calcTotalVND.toLocaleString('vi-VN')} VNĐ (hoặc ${calcTotalUSDT} USDT). Nhờ Admin hỗ trợ!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="calc-sell-btn"
                  >
                    <span>{t.calculator.sellNow}</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>

            <div className="market-footer">
              <span>
                <Clock3 size={15} /> {t.pricing.footerNote}
              </span>
              <a href="#support">
                {t.pricing.footerLink} <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="support-section" id="boost">
          <div>
            <div className="eyebrow eyebrow-orange">{t.services.eyebrow}</div>
            <h2>
              {t.services.title1}
              <br />
              <em>{t.services.title2}</em>
            </h2>
          </div>
          <div className="support-cards">
            <button
              type="button"
              className="service-card service-card-btn"
              onClick={() => {
                setConsignModalOpen(true);
              }}
            >
              <span className="service-icon orange">
                <Zap size={22} />
              </span>
              <div>
                <b>{t.services.card1Title}</b>
                <p>{t.services.card1Desc}</p>
              </div>
              <ArrowRight size={18} />
            </button>

            <a
              href="https://zalo.me/0936854505"
              target="_blank"
              rel="noopener noreferrer"
              className="service-card"
            >
              <span className="service-icon blue">
                <Headphones size={22} />
              </span>
              <div>
                <b>{t.services.card2Title}</b>
                <p>{t.services.card2Desc}</p>
              </div>
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section className="community-section" id="support">
          <div className="section-heading" style={{ marginBottom: '22px' }}>
            <div>
              <div className="eyebrow eyebrow-orange">{t.community.eyebrow}</div>
              <h2>{t.community.title} <em>{t.community.titleEm}</em></h2>
              <p>{t.community.desc}</p>
            </div>
            <a
              href="https://gegeteam.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="hub-link-badge"
            >
              {t.community.hubLink} <ArrowRight size={15} />
            </a>
          </div>

          <div className="community-grid">
            {/* 1. Nhóm Zalo */}
            <a
              href="https://zalo.me/g/kmxfzujpa7akgrijn5hk"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card comm-card-zalo"
            >
              <div className="ccc-hover-backdrop">
                <img src="/logo-zalo.svg" alt="Zalo" className="ccc-full-logo" />
                <div className="ccc-backdrop-overlay" />
              </div>
              <div className="ccc-main-content">
                <div className="ccc-icon-wrap zalo-bg">
                  <img src="/logo-zalo.svg" alt="Zalo" className="ccc-badge-logo" />
                </div>
                <div className="ccc-content">
                  <b>{t.community.zaloGroup}</b>
                  <small>{t.community.zaloGroupSub}</small>
                </div>
                <span className="ccc-action-tag">{t.community.joinNow}</span>
              </div>
            </a>

            {/* 2. Fanpage Facebook */}
            <a
              href="https://www.facebook.com/GegeTeam.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card comm-card-fb"
            >
              <div className="ccc-hover-backdrop">
                <img src="/logo-facebook.svg" alt="Facebook" className="ccc-full-logo" />
                <div className="ccc-backdrop-overlay" />
              </div>
              <div className="ccc-main-content">
                <div className="ccc-icon-wrap fb-bg">
                  <img src="/logo-facebook.svg" alt="Facebook" className="ccc-badge-logo" />
                </div>
                <div className="ccc-content">
                  <b>{t.community.fbPage}</b>
                  <small>{t.community.fbPageSub}</small>
                </div>
                <span className="ccc-action-tag">{t.community.followNow}</span>
              </div>
            </a>

            {/* 3. Group Facebook */}
            <a
              href="https://www.facebook.com/groups/457999664580741"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card comm-card-group"
            >
              <div className="ccc-hover-backdrop">
                <img src="/logo-facebook.svg" alt="Group Facebook" className="ccc-full-logo" />
                <div className="ccc-backdrop-overlay" />
              </div>
              <div className="ccc-main-content">
                <div className="ccc-icon-wrap group-bg">
                  <img src="/logo-facebook.svg" alt="Group" className="ccc-badge-logo" />
                </div>
                <div className="ccc-content">
                  <b>{t.community.fbGroup}</b>
                  <small>{t.community.fbGroupSub}</small>
                </div>
                <span className="ccc-action-tag">{t.community.enterGroup}</span>
              </div>
            </a>

            {/* 4. Discord */}
            <a
              href="https://discord.gg/gege-team"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card comm-card-discord"
            >
              <div className="ccc-hover-backdrop">
                <img src="/logo-discord.svg" alt="Discord" className="ccc-full-logo" />
                <div className="ccc-backdrop-overlay" />
              </div>
              <div className="ccc-main-content">
                <div className="ccc-icon-wrap discord-bg">
                  <img src="/logo-discord.svg" alt="Discord" className="ccc-badge-logo" />
                </div>
                <div className="ccc-content">
                  <b>{t.community.discord}</b>
                  <small>{t.community.discordSub}</small>
                </div>
                <span className="ccc-action-tag">{t.community.connect}</span>
              </div>
            </a>

            {/* 5. Zalo Admin */}
            <a
              href="https://zalo.me/0936854505"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card comm-card-admin"
            >
              <div className="ccc-hover-backdrop">
                <img src="/logo-zalo.svg" alt="Zalo Admin" className="ccc-full-logo" />
                <div className="ccc-backdrop-overlay" />
              </div>
              <div className="ccc-main-content">
                <div className="ccc-icon-wrap admin-bg">
                  <img src="/logo-zalo.svg" alt="Zalo Admin" className="ccc-badge-logo" />
                </div>
                <div className="ccc-content">
                  <b>{t.community.adminZalo}</b>
                  <small>{t.community.adminZaloSub}</small>
                </div>
                <span className="ccc-action-tag">{t.community.msgNow}</span>
              </div>
            </a>

            {/* 6. Cổng Tổng Hợp gegeteam.xyz */}
            <a
              href="https://gegeteam.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card comm-card-portal"
            >
              <div className="ccc-hover-backdrop">
                <img src="/gegeteam-logo.png" alt="GeGe Team" className="ccc-full-logo ccc-full-logo-gege" />
                <div className="ccc-backdrop-overlay" />
              </div>
              <div className="ccc-main-content">
                <div className="ccc-icon-wrap bio-bg">
                  <img src="/gegeteam-logo.png" alt="GeGe Portal" className="ccc-badge-logo" />
                </div>
                <div className="ccc-content">
                  <b>{t.community.portal}</b>
                  <small>{t.community.portalSub}</small>
                </div>
                <span className="ccc-action-tag">{t.community.openPortal}</span>
              </div>
            </a>
          </div>
        </section>

        {/* MODAL KÝ GỬI & BOOSTER DỊCH VỤ */}
        {consignModalOpen && (
          <div className="modal-overlay" onClick={() => setConsignModalOpen(false)}>
            <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-bar">
                <div className="modal-title-group">
                  <span className="modal-tag-badge">{t.modal.tag}</span>
                  <h3>{t.modal.title}</h3>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setConsignModalOpen(false)}
                  aria-label="Đóng"
                >
                  ✕
                </button>
              </div>

              {/* BOOSTER BODY */}
              <div className="modal-booster-body">
                {/* 1. THANH ĐIỀU HƯỚNG / BỘ LỌC DANH MỤC NHANH */}
                <div className="booster-cat-tabs">
                  <button
                    type="button"
                    className={`bct-btn ${boosterCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setBoosterCategory('all')}
                  >
                    🔥 Tất Cả Dịch Vụ
                  </button>
                  <button
                    type="button"
                    className={`bct-btn ${boosterCategory === 'leveling' ? 'active' : ''}`}
                    onClick={() => setBoosterCategory('leveling')}
                  >
                    ⚡ Combo 1-45 (GS)
                  </button>
                  <button
                    type="button"
                    className={`bct-btn ${boosterCategory === 'dungeon' ? 'active' : ''}`}
                    onClick={() => setBoosterCategory('dungeon')}
                  >
                    ⚔️ Phó Bản & Siêu Việt
                  </button>
                  <button
                    type="button"
                    className={`bct-btn ${boosterCategory === 'pet' ? 'active' : ''}`}
                    onClick={() => setBoosterCategory('pet')}
                  >
                    🐾 Farm & Level Pet
                  </button>
                  <button
                    type="button"
                    className={`bct-btn ${boosterCategory === 'custom' ? 'active' : ''}`}
                    onClick={() => setBoosterCategory('custom')}
                  >
                    🛠️ Theo Yêu Cầu
                  </button>
                </div>

                {/* 2. MỤC 2: COMBO CÀY CẤP 1-45 (THEO GEAR SCORE) */}
                {(boosterCategory === 'all' || boosterCategory === 'leveling') && (
                  <div className="booster-group-section">
                    <div className="bgs-header">
                      <div className="bgs-title-wrap">
                        <span className="bgs-badge-tag gold">⚡ GÓI LEVELING TRỌN GÓI</span>
                        <h4>Leveling 1 - 45 (Full Quest & Gear Score)</h4>
                        <p className="bgs-desc">
                          Bao gồm trọn gói: <b>Full Main Quest</b> + <b>Stronghold</b> + <b>Dungeon</b> + <b>Feather Monolith Lv 30</b>
                        </p>
                      </div>
                      <div className="bgs-notice-box">
                        💬 <i>Riêng các gói cày cấp theo GS, vui lòng <b>Inbox Admin Zalo</b> để được tư vấn mốc đồ và chốt giá ưu đãi chính xác nhất!</i>
                      </div>
                    </div>

                    <div className="booster-gs-grid">
                      {/* GS 1,400 */}
                      <div className="bgs-card">
                        <div className="bgsc-top">
                          <span className="bgsc-gs-badge">GS 1,400+</span>
                          <h5>Gói Khởi Đầu Cơ Bản</h5>
                          <div className="bgsc-price">
                            1.300k
                            <small className="bgsc-subnote">/ trọn gói</small>
                          </div>
                        </div>
                        <ul className="bgsc-specs">
                          <li>✓ Cày cấp từ Level 1 lên 45</li>
                          <li>✓ Hoàn thành Full Main Quest</li>
                          <li>✓ Stronghold + Sealed Dungeon</li>
                          <li>✓ Feather Monolith đạt Lv 30</li>
                          <li>✓ Đạt chuẩn Gear Score 1,400+</li>
                        </ul>
                        <a
                          href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20b%C3%A1o%20gi%C3%A1%20g%C3%B3i%20Leveling%201-45%20%2B%20GS%201400%20(1300k)%20AION%202"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bgsc-action-btn"
                        >
                          💬 Inbox Admin Nhận Giá →
                        </a>
                      </div>

                      {/* GS 1,800 */}
                      <div className="bgs-card">
                        <div className="bgsc-top">
                          <span className="bgsc-gs-badge blue">GS 1,800+</span>
                          <h5>Gói Chiến Binh Phó Bản</h5>
                          <div className="bgsc-price">
                            2.600k
                            <small className="bgsc-subnote">/ trọn gói</small>
                          </div>
                        </div>
                        <ul className="bgsc-specs">
                          <li>✓ Cày cấp từ Level 1 lên 45</li>
                          <li>✓ Hoàn thành Full Main Quest</li>
                          <li>✓ Stronghold + Sealed Dungeon</li>
                          <li>✓ Feather Monolith đạt Lv 30</li>
                          <li>✓ Đạt chuẩn Gear Score 1,800+</li>
                        </ul>
                        <a
                          href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20b%C3%A1o%20gi%C3%A1%20g%C3%B3i%20Leveling%201-45%20%2B%20GS%201800%20(2600k)%20AION%202"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bgsc-action-btn"
                        >
                          💬 Inbox Admin Nhận Giá →
                        </a>
                      </div>

                      {/* GS 2,100 */}
                      <div className="bgs-card highlight">
                        <div className="bgsc-top">
                          <span className="bgsc-gs-badge orange">GS 2,100+</span>
                          <span className="bgsc-hot-tag">🔥 ĐƯỢC CHỌN NHIỀU</span>
                          <h5>Gói Chinh Phạt Cao Cấp</h5>
                          <div className="bgsc-price orange">
                            4.500k
                            <small className="bgsc-subnote">/ trọn gói</small>
                          </div>
                        </div>
                        <ul className="bgsc-specs">
                          <li>✓ Cày cấp từ Level 1 lên 45</li>
                          <li>✓ Hoàn thành Full Main Quest</li>
                          <li>✓ Stronghold + Sealed Dungeon</li>
                          <li>✓ Feather Monolith đạt Lv 30</li>
                          <li>✓ Đạt chuẩn Gear Score 2,100+</li>
                          <li>✓ Đủ điều kiện đi các Dungeon Conquest</li>
                        </ul>
                        <a
                          href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20b%C3%A1o%20gi%C3%A1%20g%C3%B3i%20Leveling%201-45%20%2B%20GS%202100%20(4500k)%20AION%202"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bgsc-action-btn orange"
                        >
                          💬 Inbox Admin Nhận Giá →
                        </a>
                      </div>

                      {/* GS 2,500 */}
                      <div className="bgs-card vip">
                        <div className="bgsc-top">
                          <span className="bgsc-gs-badge purple">GS 2,500+</span>
                          <span className="bgsc-hot-tag purple">👑 VIP ENDGAME</span>
                          <h5>Gói Thần Tốc Thượng Phẩm</h5>
                          <div className="bgsc-price purple">
                            9.500k
                            <small className="bgsc-subnote">/ trọn gói</small>
                          </div>
                        </div>
                        <ul className="bgsc-specs">
                          <li>✓ Cày cấp từ Level 1 lên 45</li>
                          <li>✓ Hoàn thành Full Main Quest</li>
                          <li>✓ Stronghold + Sealed Dungeon</li>
                          <li>✓ Feather Monolith đạt Lv 30</li>
                          <li>✓ Gear Score siêu cấp 2,500+</li>
                          <li>✓ Đủ điều kiện đi Dungeon Siêu Việt (Transcendence)</li>
                        </ul>
                        <a
                          href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20b%C3%A1o%20gi%C3%A1%20g%C3%B3i%20Leveling%201-45%20%2B%20GS%202500%20(9500k)%20AION%202"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bgsc-action-btn purple"
                        >
                          💬 Inbox Admin Nhận Giá →
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. MỤC 3: PHÓ BẢN CHINH PHẠT (CONQUEST) & SIÊU VIỆT (TRANSCENDENCE) */}
                {(boosterCategory === 'all' || boosterCategory === 'dungeon') && (
                  <div className="booster-group-section">
                    <div className="bgs-header">
                      <span className="bgs-badge-tag cyan">⚔️ KÉO PHÓ BẢN (RUN DUNGEON)</span>
                      <h4>Phó Bản Chinh Phạt (Conquest) & Siêu Việt (Transcendence)</h4>
                      <p className="bgs-desc">Kéo slot phó bản nhanh gọn, nhận đồ Tím/Vàng, an toàn tuyệt đối</p>
                    </div>

                    <div className="booster-dungeon-grid">
                      {/* Conquest items */}
                      <div className="bd-row">
                        <div className="bd-info">
                          <span className="bd-tag conquest">✴️ CONQUEST</span>
                          <b className="bd-title">Urugugu Canyon</b>
                          <span className="bd-req">Yêu cầu GS: <b>1,400+</b></span>
                        </div>
                        <div className="bd-action-box">
                          <span className="bd-price">25k <small>/ run</small></span>
                          <a
                            href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Urugugu%20Canyon%20(25k)"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bd-btn"
                          >
                            Đặt Slot →
                          </a>
                        </div>
                      </div>

                      <div className="bd-row">
                        <div className="bd-info">
                          <span className="bd-tag conquest">✴️ CONQUEST</span>
                          <b className="bd-title">Vakron Sky Island</b>
                          <span className="bd-req">Yêu cầu GS: <b>1,400+</b></span>
                        </div>
                        <div className="bd-action-box">
                          <span className="bd-price">25k <small>/ run</small></span>
                          <a
                            href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Vakron%20Sky%20Island%20(25k)"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bd-btn"
                          >
                            Đặt Slot →
                          </a>
                        </div>
                      </div>

                      <div className="bd-row">
                        <div className="bd-info">
                          <span className="bd-tag conquest">✴️ CONQUEST</span>
                          <b className="bd-title">Ferocious Horn Den (Normal)</b>
                          <span className="bd-req">Yêu cầu GS: <b>2,100+</b></span>
                        </div>
                        <div className="bd-action-box">
                          <span className="bd-price">25k <small>/ run</small></span>
                          <a
                            href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Ferocious%20Horn%20Den%2025k"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bd-btn"
                          >
                            Đặt Slot →
                          </a>
                        </div>
                      </div>

                      <div className="bd-row">
                        <div className="bd-info">
                          <span className="bd-tag conquest">✴️ CONQUEST</span>
                          <b className="bd-title">Ferocious Horn Den (Hard)</b>
                          <span className="bd-req">Yêu cầu GS: <b>2,100+</b></span>
                        </div>
                        <div className="bd-action-box">
                          <span className="bd-price orange">60k <small>/ run</small></span>
                          <a
                            href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Ferocious%20Horn%20Den%2060k"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bd-btn"
                          >
                            Đặt Slot →
                          </a>
                        </div>
                      </div>

                      <div className="bd-row">
                        <div className="bd-info">
                          <span className="bd-tag conquest">✴️ CONQUEST</span>
                          <b className="bd-title">Fire Temple</b>
                          <span className="bd-req">Yêu cầu GS: <b>2,100+</b></span>
                        </div>
                        <div className="bd-action-box">
                          <span className="bd-price orange">60k <small>/ run</small></span>
                          <a
                            href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Fire%20Temple%20(60k)"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bd-btn"
                          >
                            Đặt Slot →
                          </a>
                        </div>
                      </div>

                      {/* Transcendence items */}
                      <div className="bd-row trans-row">
                        <div className="bd-info">
                          <span className="bd-tag trans">✴️ TRANSCENDENCE</span>
                          <b className="bd-title">Deus Research Base (Stage 3)</b>
                          <span className="bd-req">Yêu cầu GS: <b>2,100+</b></span>
                        </div>
                        <div className="bd-action-box">
                          <span className="bd-price purple">70k <small>/ run</small></span>
                          <a
                            href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Deus%20Research%20Base%20Stage%203%20(70k)"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bd-btn purple"
                          >
                            Đặt Slot →
                          </a>
                        </div>
                      </div>

                      <div className="bd-row trans-row">
                        <div className="bd-info">
                          <span className="bd-tag trans">✴️ TRANSCENDENCE</span>
                          <b className="bd-title">Shattered Arkanis (Stage 4)</b>
                          <span className="bd-req">Yêu cầu GS: <b>2,500+</b></span>
                        </div>
                        <div className="bd-action-box">
                          <span className="bd-price purple">100k <small>/ run</small></span>
                          <a
                            href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Shattered%20Arkanis%20Stage%204%20(100k)"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bd-btn purple"
                          >
                            Đặt Slot →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. MỤC 1: LEVELING & FARM PET */}
                {(boosterCategory === 'all' || boosterCategory === 'pet') && (
                  <div className="booster-group-section">
                    <div className="bgs-header">
                      <span className="bgs-badge-tag green">🐾 LEVELING & FARM PET</span>
                      <h4>Nâng Cấp Pet & Farm Giờ</h4>
                      <p className="bgs-desc">Cày cấp thú cưng, farm quái nhặt nguyên liệu và trang bị Pet</p>
                    </div>

                    <div className="booster-pet-grid">
                      <div className="bpet-card">
                        <div className="bpet-header">
                          <span className="bpet-icon">🐾</span>
                          <div>
                            <h5>Pet Level 0 - 3</h5>
                            <small>Nâng cấp Pet sơ cấp nhanh chóng</small>
                          </div>
                        </div>
                        <div className="bpet-price">40k</div>
                        <a
                          href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20c%C3%A0y%20Pet%20level%200-3%20(40k)"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bpet-btn"
                        >
                          Đặt Cày Pet →
                        </a>
                      </div>

                      <div className="bpet-card">
                        <div className="bpet-header">
                          <span className="bpet-icon">⏳</span>
                          <div>
                            <h5>1 Giờ Farm Pet</h5>
                            <small>Farm quái nhặt đồ, tích lũy exp Pet</small>
                          </div>
                        </div>
                        <div className="bpet-price">80k <small>/ giờ</small></div>
                        <a
                          href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20thu%C3%AA%201%20hour%20farm%20Pet%20(80k)"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bpet-btn"
                        >
                          Thuê Farm 1 Giờ →
                        </a>
                      </div>

                      <div className="bpet-card highlight">
                        <div className="bpet-save-badge">🔥 TIẾT KIỆM 50K</div>
                        <div className="bpet-header">
                          <span className="bpet-icon">🎁</span>
                          <div>
                            <h5>Bundle 5 Giờ Farm Pet</h5>
                            <small>Gói farm liên tục tối ưu chi phí</small>
                          </div>
                        </div>
                        <div className="bpet-price orange">350k <small className="strike">400k</small></div>
                        <a
                          href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20Bundle%205%20hours%20farm%20Pet%20(350k)"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bpet-btn orange"
                        >
                          Đặt Bundle 350k →
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. MỤC 4: DỊCH VỤ THEO YÊU CẦU (CUSTOM SERVICE) */}
                {(boosterCategory === 'all' || boosterCategory === 'custom') && (
                  <div className="booster-group-section">
                    <div className="bgs-header">
                      <span className="bgs-badge-tag orange">🛠️ CUSTOM SERVICE</span>
                      <h4>Dịch Vụ Theo Yêu Cầu</h4>
                      <p className="bgs-desc">Cá nhân hóa theo nhân vật & tài khoản của bạn</p>
                    </div>

                    <div className="booster-custom-grid">
                      <div className="bcustom-card">
                        <div className="bcc-title-row">
                          <span className="bcc-icon">🛡️</span>
                          <div>
                            <h5>Nâng Cấp Gear Score (GS) & Lực Chiến (CP)</h5>
                            <p>Nhận chăm sóc tài khoản, tối ưu trang bị, khảm ngọc và kéo mốc GS/CP chuẩn yêu cầu đi mọi hoạt động.</p>
                          </div>
                        </div>
                        <div className="bcc-bottom">
                          <span className="bcc-price-tag">Giá: <b>Inbox Admin</b></span>
                          <a
                            href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20N%C3%A2ng%20c%E1%BA%A5p%20GS%20%2F%20CP%20theo%20y%C3%AAu%20c%E1%BA%A7u"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bcustom-btn"
                          >
                            💬 Nhắn Zalo Báo Giá Ngay →
                          </a>
                        </div>
                      </div>

                      <div className="bcustom-card">
                        <div className="bcc-title-row">
                          <span className="bcc-icon">🔨</span>
                          <div>
                            <h5>Craft / Đúc Item Trang Bị Lv 102</h5>
                            <p>Chế tạo trang bị vũ khí, giáp, trang sức cao cấp Lv 102 chuẩn opt cao, phôi đẹp cho mọi hệ phái.</p>
                          </div>
                        </div>
                        <div className="bcc-bottom">
                          <span className="bcc-price-tag">Giá: <b>Inbox Admin</b></span>
                          <a
                            href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20Craft%20item%20trang%20b%E1%BB%8B%20Lv102"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bcustom-btn"
                          >
                            💬 Nhắn Zalo Báo Giá Ngay →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. LIÊN HỆ TỔNG ĐÀI ADMIN */}
                <div className="booster-contact-strip">
                  <span>📞 Hotline / Zalo: <b>0936.854.505</b></span>
                  <span>🎮 Discord: <b>gege_team</b></span>
                  <a
                    href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20mu%E1%BB%91n%20t%C6%B0%20v%E1%BA%A5n%20d%E1%BB%8Bch%20v%E1%BB%A5%20Booster"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bcs-link-btn"
                  >
                    Nhắn Zalo Nhận Tư Vấn 24/7 →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL ĐĂNG NHẬP / ĐĂNG KÝ TÙY CHỌN (KHÔNG BẮT BUỘC ĐỂ DÙNG WEB) */}
        {authModalOpen && (
          <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
            <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="auth-modal-header">
                <div className="auth-modal-title">
                  <span className="auth-pill-tag">THÀNH VIÊN GEGE TEAM</span>
                  <h3>{authMode === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Tài Khoản'}</h3>
                  <p className="auth-modal-sub">
                    {authMode === 'login'
                      ? 'Đăng nhập tiện lợi (hoàn toàn không bắt buộc để xem web)'
                      : 'Tạo tài khoản nhanh chóng chỉ trong 10 giây'}
                  </p>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setAuthModalOpen(false)}
                  aria-label="Đóng"
                >
                  ✕
                </button>
              </div>

              <div className="auth-tabs">
                <button
                  type="button"
                  className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError('');
                    setAuthSuccess('');
                  }}
                >
                  Đăng Nhập
                </button>
                <button
                  type="button"
                  className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
                  onClick={() => {
                    setAuthMode('register');
                    setAuthError('');
                    setAuthSuccess('');
                  }}
                >
                  Đăng Ký Mới
                </button>
              </div>

              <form className="auth-form" onSubmit={authMode === 'login' ? handleLogin : handleRegister}>
                {authError && <div className="auth-alert error">{authError}</div>}
                {authSuccess && <div className="auth-alert success">{authSuccess}</div>}

                <div className="auth-field">
                  <label>Tên tài khoản / Nickname</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: NightStalker"
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                  />
                </div>

                {authMode === 'register' && (
                  <div className="auth-field">
                    <label>Số điện thoại hoặc Zalo (tùy chọn)</label>
                    <input
                      type="text"
                      placeholder="VD: 0912345678"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                    />
                  </div>
                )}

                <div className="auth-field">
                  <label>Mật khẩu</label>
                  <input
                    type="password"
                    required
                    placeholder="Nhập mật khẩu của bạn"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="auth-submit-btn">
                  {authMode === 'login' ? 'Đăng Nhập Ngay →' : 'Tạo Tài Khoản →'}
                </button>

                <div className="auth-note-guest">
                  💡 <i>Bạn hoàn toàn có thể tự do xem tỷ giá, tính tiền và đặt dịch vụ mà <b>không cần đăng nhập</b>.</i>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <span>{t.footer.rights}</span>
        <span>{t.footer.privacy}&nbsp;&nbsp; {t.footer.terms}</span>
      </footer>
    </div>
  );
}

export default App;
