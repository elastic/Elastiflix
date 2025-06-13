import { SearchProvider, SearchBox } from "@elastic/react-search-ui";
import { EuiIcon } from '@elastic/eui';
import { useHistory } from "react-router-dom";
import connector from '../services/SearchConnector'; // Import the shared connector

const renderInput = ({ getAutocomplete, getInputProps }) => {
    return (
        <div className="search-box">
            <EuiIcon className="search-box__icon" type="search" />
            <input
                {...getInputProps({
                    className: "search-box__input",
                    placeholder: "Search by title, cast name..."
                })}
            />
        {getAutocomplete()}
        </div>
    )
}

function SearchBar() {

    const history = useHistory();

    const configurationOptions = {
        apiConnector: connector, // Use the shared connector
        trackUrlState: false,
        alwaysSearchOnInitialLoad: false,
        autocompleteQuery: {
            results: {
                resultsPerPage: 5,
                result_fields: {
                    title: { snippet: { size: 100, fallback: true }}
                }
            }
        }
    };

    return (
        <SearchProvider config={configurationOptions}>

            <SearchBox
                inputView={renderInput}
                debounceLength={0}
                onSubmit={searchTerm => {
                    history.push("/search?q=" + searchTerm);
                    window.location.href = "/search?q=" + searchTerm;
                }}
                autocompleteMinimumCharacters={2}
                autocompleteResults={{
                    sectionTitle: "Results",
                    titleField: "title",
                }}
                onSelectAutocomplete={(selection) => {
                    if (selection.title) {
                        window.location.href = "/search?q=" + selection.title.raw;
                    }
                }}
            />
        </SearchProvider>
    );
}
export default SearchBar;