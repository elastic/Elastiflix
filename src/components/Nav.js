
import SearchBar from "./SearchBar";
import logo from '../logo.svg'

function Nav({ fixed = false, showSearch = false }) {
    return (
        <div className={`nav ${fixed ? 'nav-fixed' : ''}`}>
            <a href="/home">
                <img
                    className="nav__logo"
                    src={logo}
                    alt="Site Logo"
                />
            </a>
            {showSearch && (
                <div className="search_bar">
                    <SearchBar />
                </div>
            )}
        </div>
    );
}

export default Nav;
