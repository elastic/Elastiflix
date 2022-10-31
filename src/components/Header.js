function Header() {
    return (
      <header className="banner">
        <div className="banner__contents">
          <h1 className="banner__title">Luca</h1>
          <div className="banner__buttons">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
          </div>
          <p className="banner__description">Luca and his best friend Alberto experience an unforgettable summer on the Italian Riviera. But all the fun is threatened by a deeply-held secret: they are sea monsters...</p>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
    );
  }

  export default Header;
