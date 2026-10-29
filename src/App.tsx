import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Calculator,
  ChevronDown,
  CircleHelp,
  Clock3,
  Copy,
  Crown,
  Gamepad2,
  Headphones,
  Menu,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Swords,
  UserRound,
  X,
  Zap,
} from 'lucide-react';

const heroImage = '/hero-fox.png';

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
    name: 'North America',
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
    name: 'NA-East',
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
  const [activeRegion, setActiveRegion] = useState('ASIA');
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [consignModalOpen, setConsignModalOpen] = useState(false);
  const [consignTab, setConsignTab] = useState<'booster' | 'consign'>('booster');

  // Form states for Ký gửi
  const [kyGuiServer, setKyGuiServer] = useState('Siel (Asia)');
  const [kyGuiAmount, setKyGuiAmount] = useState('50');
  const [kyGuiIGN, setKyGuiIGN] = useState('');
  const [kyGuiBank, setKyGuiBank] = useState('');
  const [kyGuiAccount, setKyGuiAccount] = useState('');
  const [kyGuiOwner, setKyGuiOwner] = useState('');
  const [kyGuiContact, setKyGuiContact] = useState('');
  const [viewMode, setViewMode] = useState<'excel' | 'cards'>('excel');
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Calculator states
  const [calcServerKey, setCalcServerKey] = useState('ASIA|Siel|13.9');
  const [calcAmount, setCalcAmount] = useState<number>(50);

  const selectedCalcServer = useMemo(() => {
    const [region, server, rateStr] = calcServerKey.split('|');
    const rate = parseFloat(rateStr) || 0;
    return { region, server, rate };
  }, [calcServerKey]);

  const calcTotalVND = Math.round(calcAmount * selectedCalcServer.rate * 1000);

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

  const copyDiscord = async () => {
    await navigator.clipboard?.writeText('discord.gg/gege-team');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

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
            Trang chủ
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenu(false);
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Bảng giá Kina
          </a>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => {
              setMobileMenu(false);
              setConsignTab('booster');
              setConsignModalOpen(true);
            }}
          >
            Ký gửi & Booster
          </button>
          <a
            href="https://zalo.me/0936854505"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenu(false)}
          >
            Hỗ trợ (Zalo)
          </a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Tài khoản">
            <UserRound size={18} />
          </button>
          <button className="outline-button header-login">Đăng nhập</button>
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
            <div className="eyebrow eyebrow-orange">GEGETEAM - NHÀ CÁO</div>
            <h1>
              Chơi lớn hơn.
              <br />
              <em>Sống chất hơn.</em>
            </h1>
            <p>
              Nơi hội tụ những chiến binh AION Việt Nam. Giao dịch an tâm, hỗ trợ tận tâm,
              trải nghiệm xứng tầm.
            </p>
            <div className="hero-actions">
              <a
                href="#pricing"
                className="primary-button"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Khám phá bảng giá <ArrowRight size={17} />
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
                <b>1.510+</b> game thủ đang tin dùng
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
              <b>An tâm giao dịch</b>
              <small>Minh bạch & bảo mật</small>
            </span>
          </div>
          <div>
            <span className="feature-icon blue">
              <Zap size={19} />
            </span>
            <span>
              <b>Booster chuyên nghiệp</b>
              <small>Cày cấp & hỗ trợ phó bản</small>
            </span>
          </div>
          <div>
            <span className="feature-icon green">
              <Headphones size={19} />
            </span>
            <span>
              <b>Hỗ trợ tận tâm</b>
              <small>Đồng hành mọi lúc</small>
            </span>
          </div>
          <div className="feature-stat">
            <b>
              4.9<span>/5</span>
            </b>
            <small>Đánh giá cộng đồng</small>
          </div>
        </section>

        <section className="pricing-section" id="pricing">
          <div className="section-heading">
            <div>
              <div className="eyebrow eyebrow-orange">AION 2 - KINAH</div>
              <h2>
                Bảng giá <em>Kina AION Toàn Cầu</em>
              </h2>
              <p>Chọn khu vực để xem danh sách server và tỷ giá cập nhật mới nhất.</p>
            </div>
            <div className="updated updated-orange">Cập nhật trực tiếp <b>vừa xong</b></div>
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
                    <small>Đang xem bảng giá</small>
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
                        <span className="rmr-servers">{region.servers} servers</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="refresh-button"
                onClick={() => {
                  alert('Tỷ giá đã được đồng bộ với hệ thống!');
                }}
              >
                <RefreshCw size={15} /> Làm mới
              </button>
            </div>

            <div className="region-grid">
              {regions.map((region) => (
                <button
                  key={region.code}
                  className={`region-card ${activeRegion === region.code ? 'selected' : ''}`}
                  onClick={() => setActiveRegion(region.code)}
                >
                  <span className="region-emoji">{region.emoji}</span>
                  <b>{region.name}</b>
                  <small>
                    {region.servers} servers <i>•</i> {region.ping}
                  </small>
                </button>
              ))}
            </div>

            <div className="server-head">
              <div className="search-box">
                <Search size={16} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tìm nhanh tên server..."
                />
                {search && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setSearch('')}
                    title="Xoá tìm kiếm"
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
                  ☷ Bảng Excel đầy đủ
                </button>
                <button
                  type="button"
                  className={`table-view-btn ${viewMode === 'cards' ? 'active' : ''}`}
                  onClick={() => setViewMode('cards')}
                >
                  ▦ Dạng thẻ gọn
                </button>
              </div>
            </div>

            <div className="active-region">
              <span>
                Đang xem: <b>{currentRegionData.name}</b> ({currentRegionData.row1.length + currentRegionData.row2.length} server)
              </span>
              <small>💡 Nhấp vào ô tỷ giá để đưa vào Máy Tính Kina nhanh</small>
            </div>

            {/* VIEW 1: BẢNG EXCEL ĐẦY ĐỦ NHƯ HÌNH */}
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
                              title={item.rate !== null ? `Nhấp để tính tiền server ${item.server}` : 'Chưa có tỷ giá'}
                            >
                              {item.rate !== null ? item.rate.toFixed(1) : 'N/A'}
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
                              title={item.rate !== null ? `Nhấp để tính tiền server ${item.server}` : 'Chưa có tỷ giá'}
                            >
                              {item.rate !== null ? item.rate.toFixed(1) : 'N/A'}
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
                        {server.rate !== null ? `RATE: ${server.rate}` : 'N/A'}
                      </strong>
                      <button
                        className="buy-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectServerForCalc(server.region, server.name, server.rate);
                        }}
                      >
                        Bán Ngay <ArrowRight size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    Không tìm thấy server phù hợp trong khu vực này.
                  </div>
                )}
              </div>
            )}

            {/* MÁY TÍNH TIỀN KINA NHANH (KHÔNG CÓ KHUNG GÒ BÓ, HIỆN PHÉP TÍNH VỚI DẤU =) */}
            <div className="quick-calculator-card" id="calc-widget">
              <div className="calc-top-header">
                <Calculator size={18} color="#38bdf8" />
                <span className="calc-top-title">Máy Tính Tiền Kina Nhanh</span>
                <span className="calc-top-sub">Ước tính số tiền VNĐ bạn sẽ nhận được khi bán Kina</span>
              </div>
              <div className="calc-inputs-bar">
                <div className="calc-input-item">
                  <label>Server Đã Chọn:</label>
                  <select
                    value={calcServerKey}
                    onChange={(e) => setCalcServerKey(e.target.value)}
                  >
                    {Object.values(REGIONS_DATA).map((reg) => (
                      <optgroup key={reg.code} label={`Region ${reg.name}`}>
                        {[...reg.row1, ...reg.row2]
                          .filter((s) => s.rate !== null)
                          .map((s) => (
                            <option
                              key={`${reg.code}-${s.server}`}
                              value={`${reg.code}|${s.server}|${s.rate}`}
                            >
                              {s.server} ({reg.name} · Rate: {s.rate})
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="calc-input-item">
                  <label>Số Kina (M / Triệu):</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                  />
                </div>

                {/* Phép tính trực tiếp không để trong khung hộp cứng nhắc */}
                <div className="calc-live-formula">
                  <span className="calc-math-equation">
                    {calcAmount}M × {selectedCalcServer.rate} =
                  </span>
                  <span className="calc-math-result">
                    {calcTotalVND.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>

                <a
                  href={`https://zalo.me/0936854505?text=${encodeURIComponent(
                    `Chào Admin GeGe Team, mình muốn bán ${calcAmount}M Kina tại server ${selectedCalcServer.server} (${selectedCalcServer.region}), số tiền ước tính ${calcTotalVND.toLocaleString(
                      'vi-VN'
                    )} VNĐ. Nhờ Admin hỗ trợ thu mua!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="calc-sell-btn"
                >
                  Bán Ngay
                </a>
              </div>
            </div>

            <div className="market-footer">
              <span>
                <Clock3 size={15} /> Tỷ giá cập nhật liên tục từ nguồn thị trường GeGe Team.
              </span>
              <a href="#support">
                Xem hướng dẫn giao dịch Kina <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="support-section" id="boost">
          <div>
            <div className="eyebrow eyebrow-orange">DỊCH VỤ CỦA GEGETEAM - NHÀ CÁO</div>
            <h2>
              Mọi thứ bạn cần
              <br />
              <em>đều ở đây.</em>
            </h2>
          </div>
          <div className="support-cards">
            <button
              type="button"
              className="service-card service-card-btn"
              onClick={() => {
                setConsignTab('booster');
                setConsignModalOpen(true);
              }}
            >
              <span className="service-icon orange">
                <Zap size={22} />
              </span>
              <div>
                <b>Ký gửi & Booster AION</b>
                <p>Bảng giá booster cày cấp & cổng ký gửi Kinah bán giùm chuyển khoản.</p>
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
                <b>Trung tâm hỗ trợ (Zalo)</b>
                <p>Chat trực tiếp Admin 0936.854.505 giải đáp & giao dịch 24/7.</p>
              </div>
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section className="community-section" id="support">
          <div className="section-heading" style={{ marginBottom: '22px' }}>
            <div>
              <div className="eyebrow eyebrow-orange">MẠNG LƯỚI KẾT NỐI</div>
              <h2>Gia nhập cộng đồng <em>GEGE TEAM — NHÀ CÁO</em></h2>
              <p>Kết nối qua các kênh chính thức của GeGe Team để cập nhật tỷ giá, nhận ưu đãi và hỗ trợ tức thì.</p>
            </div>
            <a
              href="https://gegeteam.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="hub-link-badge"
            >
              🌐 Truy cập gegeteam.xyz <ArrowRight size={15} />
            </a>
          </div>

          <div className="community-grid">
            <a
              href="https://zalo.me/g/kmxfzujpa7akgrijn5hk"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card zalo-border"
            >
              <div className="ccc-icon-wrap zalo-bg">💬</div>
              <div className="ccc-content">
                <b>Nhóm Zalo AION Nhà Cáo</b>
                <small>Giao lưu buôn bán Kinah & cập nhật tin game hot mỗi ngày</small>
              </div>
              <span className="ccc-action-tag">Tham gia ngay →</span>
            </a>

            <a
              href="https://www.facebook.com/GegeTeam.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card fb-border"
            >
              <div className="ccc-icon-wrap fb-bg">📘</div>
              <div className="ccc-content">
                <b>Fanpage GeGe Team</b>
                <small>Trang tin chính thức, mini game & sự kiện quà tặng</small>
              </div>
              <span className="ccc-action-tag">Theo dõi →</span>
            </a>

            <a
              href="https://www.facebook.com/groups/457999664580741"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card group-border"
            >
              <div className="ccc-icon-wrap group-bg">👥</div>
              <div className="ccc-content">
                <b>Group Cộng Đồng AION</b>
                <small>Diễn đàn thảo luận, tuyển thành viên quân đoàn & party phó bản</small>
              </div>
              <span className="ccc-action-tag">Vào nhóm →</span>
            </a>

            <a
              href="https://discord.gg/gege-team"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card discord-border"
            >
              <div className="ccc-icon-wrap discord-bg">🎮</div>
              <div className="ccc-content">
                <b>Discord GeGe Team</b>
                <small>Kênh voice chat, thảo luận chiến thuật & call team đi raid</small>
              </div>
              <span className="ccc-action-tag">Kết nối →</span>
            </a>

            <a
              href="https://zalo.me/0936854505"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card admin-border"
            >
              <div className="ccc-icon-wrap admin-bg">📱</div>
              <div className="ccc-content">
                <b>Zalo Admin (0936.854.505)</b>
                <small>Hotline trực tiếp hỗ trợ mua bán Kinah & dịch vụ Booster 24/7</small>
              </div>
              <span className="ccc-action-tag">Nhắn tin ngay →</span>
            </a>

            <a
              href="https://gegeteam.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card bio-border"
            >
              <div className="ccc-icon-wrap bio-bg">🌟</div>
              <div className="ccc-content">
                <b>Cổng Tổng Hợp gegeteam.xyz</b>
                <small>Tất cả liên kết, danh sách server và kênh chính thức tụ họp</small>
              </div>
              <span className="ccc-action-tag">Mở cổng →</span>
            </a>
          </div>
        </section>
            {/* MODAL KÝ GỬI & BOOSTER DỊCH VỤ */}
      {consignModalOpen && (
        <div className="modal-overlay" onClick={() => setConsignModalOpen(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div className="modal-title-group">
                <span className="modal-tag-badge">AION 2 GLOBAL</span>
                <h3>Dịch Vụ Booster &amp; Ký Gửi Kinah</h3>
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

            {/* TAB SELECTOR */}
            <div className="modal-tabs-nav">
              <button
                type="button"
                className={`modal-tab-btn ${consignTab === 'booster' ? 'active' : ''}`}
                onClick={() => setConsignTab('booster')}
              >
                ⚡ Bảng Giá Booster Cày Cấp
              </button>
              <button
                type="button"
                className={`modal-tab-btn ${consignTab === 'consign' ? 'active' : ''}`}
                onClick={() => setConsignTab('consign')}
              >
                📦 Ký Gửi Kinah (Bán Giùm &amp; CK)
              </button>
            </div>

            {/* TAB 1: BOOSTER */}
            {consignTab === 'booster' && (
              <div className="modal-booster-body">
                <div className="booster-combos-grid">
                  {/* FULL COMBO 1 PHÉ */}
                  <div className="booster-combo-card combo-standard">
                    <div className="bcc-header">
                      <span className="bcc-badge">TIẾT KIỆM</span>
                      <h4>FULL COMBO 1 PHÉ</h4>
                      <div className="bcc-price">650k</div>
                    </div>
                    <ul className="bcc-features">
                      <li>✓ Leveling 1 &gt; 45</li>
                      <li>✓ Full nhiệm vụ xanh</li>
                      <li>✓ ? - Stronghold</li>
                      <li>✓ Full lông thường</li>
                      <li>✓ Spacetime Rift</li>
                    </ul>
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20g%C3%B3i%20FULL%20COMBO%201%20PH%C3%89%20(650k)%20AION%202"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bcc-btn bcc-btn-blue"
                    >
                      Đặt Gói 650k Qua Zalo →
                    </a>
                  </div>

                  {/* FULL COMBO 2 PHÉ VIP */}
                  <div className="booster-combo-card combo-vip">
                    <div className="bcc-header">
                      <span className="bcc-badge vip">VIP CAO CẤP</span>
                      <h4>FULL COMBO 2 PHÉ VIP</h4>
                      <div className="bcc-price vip">850k</div>
                    </div>
                    <ul className="bcc-features">
                      <li>✓ Leveling 1 &gt; 45</li>
                      <li>✓ Full nhiệm vụ xanh</li>
                      <li>✓ ? - Stronghold</li>
                      <li>✓ Full lông thường + Abyss</li>
                      <li>✓ Spacetime Rift</li>
                    </ul>
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20g%C3%B3i%20FULL%20COMBO%202%20PH%C3%89%20VIP%20(850k)%20AION%202"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bcc-btn bcc-btn-orange"
                    >
                      Đặt Gói VIP 850k Qua Zalo →
                    </a>
                  </div>
                </div>

                {/* BẢNG GIÁ LẺ */}
                <div className="booster-single-table-wrap">
                  <div className="bst-title">BẢNG GIÁ DỊCH VỤ LẺ (TỪ POSTER GEGE TEAM)</div>
                  <div className="bst-grid">
                    <div className="bst-row">
                      <span className="bst-name">⚔️ Leveling 1 -&gt; 45</span>
                      <span className="bst-price">350k</span>
                    </div>
                    <div className="bst-row">
                      <span className="bst-name">🏰 Sealed Dungeon + Stronghold</span>
                      <span className="bst-price">220k</span>
                    </div>
                    <div className="bst-row">
                      <span className="bst-name">🌌 Full Spacetime Rift</span>
                      <span className="bst-price">320k</span>
                    </div>
                    <div className="bst-row">
                      <span className="bst-name">🪶 Full Lông Thường / Lông Abyss</span>
                      <span className="bst-price">50k</span>
                    </div>
                    <div className="bst-row">
                      <span className="bst-name">🐾 Farm Pet</span>
                      <span className="bst-price">50k - 60k/h</span>
                    </div>
                    <div className="bst-row">
                      <span className="bst-name">📜 Daily Quest Abyss</span>
                      <span className="bst-price">50k - 60k</span>
                    </div>
                    <div className="bst-row highlight">
                      <span className="bst-name">🛡️ Chăm acc, up lực chiến toàn diện</span>
                      <span className="bst-price contact">Nhắn tin để biết thêm</span>
                    </div>
                  </div>

                  <div className="booster-contact-strip">
                    <span>📞 Zalo: <b>0936.854.505</b></span>
                    <span>🎮 Discord: <b>gege_team</b></span>
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20mu%E1%BB%91n%20t%C6%B0%20v%E1%BA%A5n%20d%E1%BB%8Bch%20v%E1%BB%A5%20Booster"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bcs-link-btn"
                    >
                      Nhắn Zalo Nhận Tư Vấn
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: KÝ GỬI KINAH */}
            {consignTab === 'consign' && (
              <div className="modal-consign-body">
                <div className="consign-intro-banner">
                  <span className="cib-icon">💰</span>
                  <div>
                    <b>BẠN MUỐN BÁN KINAH NHƯNG KHÔNG CÓ THỜI GIAN?</b>
                    <p>Hãy ký gửi Kinah cho GeGe Team! Chúng mình sẽ nhận Kinah trong game, bán giùm theo giá tốt nhất và chuyển khoản tiền ngay vào tài khoản ngân hàng của bạn.</p>
                  </div>
                </div>

                <div className="consign-form-grid">
                  <div className="cfg-field">
                    <label>Server &amp; Vùng:</label>
                    <select value={kyGuiServer} onChange={(e) => setKyGuiServer(e.target.value)}>
                      {Object.values(REGIONS_DATA).map((reg) => (
                        <optgroup key={reg.code} label={`Region ${reg.name}`}>
                          {[...reg.row1, ...reg.row2]
                            .filter((s) => s.rate !== null)
                            .map((s) => (
                              <option key={`${reg.code}-${s.server}`} value={`${s.server} (${reg.name})`}>
                                {s.server} ({reg.name} · Rate: {s.rate})
                              </option>
                            ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div className="cfg-field">
                    <label>Số Kinah Ký Gửi (M / Triệu):</label>
                    <input
                      type="number"
                      placeholder="VD: 50"
                      value={kyGuiAmount}
                      onChange={(e) => setKyGuiAmount(e.target.value)}
                    />
                  </div>

                  <div className="cfg-field">
                    <label>Tên Nhân Vật Trong Game (IGN):</label>
                    <input
                      type="text"
                      placeholder="VD: NightStalker"
                      value={kyGuiIGN}
                      onChange={(e) => setKyGuiIGN(e.target.value)}
                    />
                  </div>

                  <div className="cfg-field">
                    <label>Tên Ngân Hàng Nhận Tiền:</label>
                    <input
                      type="text"
                      placeholder="VD: Vietcombank / MB / Techcombank"
                      value={kyGuiBank}
                      onChange={(e) => setKyGuiBank(e.target.value)}
                    />
                  </div>

                  <div className="cfg-field">
                    <label>Số Tài Khoản Ngân Hàng (STK):</label>
                    <input
                      type="text"
                      placeholder="VD: 0123456789"
                      value={kyGuiAccount}
                      onChange={(e) => setKyGuiAccount(e.target.value)}
                    />
                  </div>

                  <div className="cfg-field">
                    <label>Tên Chủ Tài Khoản:</label>
                    <input
                      type="text"
                      placeholder="VD: NGUYEN VAN A"
                      value={kyGuiOwner}
                      onChange={(e) => setKyGuiOwner(e.target.value)}
                    />
                  </div>

                  <div className="cfg-field full-width">
                    <label>Số Điện Thoại / Zalo Của Bạn Để Liên Hệ:</label>
                    <input
                      type="text"
                      placeholder="VD: 0912345678"
                      value={kyGuiContact}
                      onChange={(e) => setKyGuiContact(e.target.value)}
                    />
                  </div>
                </div>

                <div className="consign-steps-row">
                  <div className="csr-step">
                    <b>1. Điền thông tin</b>
                    <small>Nhập số Kinah và STK ngân hàng nhận tiền</small>
                  </div>
                  <div className="csr-arrow">→</div>
                  <div className="csr-step">
                    <b>2. Giao dịch ingame</b>
                    <small>Đưa Kinah cho nhân vật của GeGe Team</small>
                  </div>
                  <div className="csr-arrow">→</div>
                  <div className="csr-step">
                    <b>3. Nhận chuyển khoản</b>
                    <small>GeGe Team bán giùm và CK 100% về tài khoản của bạn</small>
                  </div>
                </div>

                <button
                  type="button"
                  className="consign-submit-btn"
                  onClick={() => {
                    const msg = `Chào Admin GeGe Team, mình muốn KÝ GỬI BÁN GIÙM KINAH:
- Server: ${kyGuiServer}
- Số Kinah: ${kyGuiAmount}M
- Tên nhân vật game: ${kyGuiIGN || 'Chưa điền'}
- Ngân hàng: ${kyGuiBank || 'Chưa điền'}
- STK nhận tiền: ${kyGuiAccount || 'Chưa điền'}
- Tên chủ thẻ: ${kyGuiOwner || 'Chưa điền'}
- SĐT/Zalo liên hệ: ${kyGuiContact || 'Chưa điền'}
Nhờ Admin hỗ trợ nhận Kinah và chuyển khoản giúp mình!`;
                    window.open(`https://zalo.me/0936854505?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
                  }}
                >
                  🚀 Gửi Yêu Cầu Ký Gửi &amp; Nhận Hỗ Trợ Qua Zalo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      </main>
      <footer className="site-footer">
        <span>© 2026 Gege Team. All rights reserved. Made for AION players.</span>
        <span>Chính sách bảo mật&nbsp;&nbsp; Điều khoản sử dụng</span>
      </footer>
    </div>
  );
}

export default App;
