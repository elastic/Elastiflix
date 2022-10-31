
import SearchBar from "./SearchBar";
import logo from '../logo.svg'

function Nav(props) {


    return (
        <div className="nav">
            <a href="/">
                <img
                    className="nav__logo"
                    src={logo}
                    alt=""
                />
            </a>
            {props.showSearch ? <div className="search_bar">
                <SearchBar />
            </div> : <></>}
        </div>
    );
}

// Set default props
Nav.defaultProps = {
    showSearch: false
};

export default Nav;
