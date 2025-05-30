import { SearchProvider, SearchBox } from "@elastic/react-search-ui";
import { EuiIcon } from '@elastic/eui';
import { useHistory } from "react-router-dom";
import connector from '../services/SearchConnector'; 

const renderInput = ({ getInputProps }) => {
    return (
        <div className="search-box">
            <EuiIcon className="search-box__icon" type="search" />
            <input
                {...getInputProps({
                    className: "search-box__input",
                    placeholder: "Search by title, cast name..."
                })}
            />
        </div>
    )
}

function SearchBar() {

    const history = useHistory();

    const config = {
        apiConnector: connector, 
        trackUrlState: false,
        alwaysSearchOnInitialLoad: false
    };

    return (
        <SearchProvider config={config}>

            <SearchBox
                inputView={renderInput}
                debounceLength={100}
                onSubmit={searchTerm => {
                    history.push("/search?q=" + searchTerm);
                    window.location.href = "/search?q=" + searchTerm;
                }}
                
            />
        </SearchProvider>
    );
}

export default SearchBar;
