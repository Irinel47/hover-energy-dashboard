export default function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect
              x="0"
              y="7"
              width="3"
              height="7"
              rx="1"
              fill="white"
              opacity="0.65"
            />
            <rect
              x="5"
              y="4"
              width="3"
              height="10"
              rx="1"
              fill="white"
              opacity="0.82"
            />
            <rect x="10" y="1" width="3" height="13" rx="1" fill="white" />
          </svg>
        </div>
        <span className="header-name">World Energy</span>
      </div>

      <div className="header-center">
        <h1>60 Years of the Global Energy Mix</h1>
        <span>1965 – 2024 · Source: Our World in Data</span>
      </div>
    </header>
  );
}
