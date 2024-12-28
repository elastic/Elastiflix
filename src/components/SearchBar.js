
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import { SearchProvider } from "@elastic/react-search-ui";
import { EuiIcon } from '@elastic/eui';
import { useHistory } from "react-router-dom";
import { SearchBox } from '@elastic/react-search-ui';


const renderInput = ({ getAutocomplete, getInputProps, getButtonProps }) => {
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

    const connector = new ElasticsearchAPIConnector({
        host: process.env.REACT_APP_ES_BASE_URL,
        index: process.env.REACT_APP_INDEX_NAME,
        apiKey: process.env.REACT_APP_ES_SEARCH_API_KEY,
    });

    const configurationOptions = {
        apiConnector: connector,
        trackUrlState: false,
        alwaysSearchOnInitialLoad: false,
        autocompleteQuery: {
            results: {
                result_fields: {
                    title: {
                        snippet: {
                            size: 100
                        }
                    }
                }
            },
            suggestions: {
                types: {
                    // Limit query to only suggest based on "title" field
                    documents: { fields: ["title"] }
                },
                // Limit the number of suggestions returned from the server
                size: 2
            }
        }
    };



    const history = useHistory();

    return (
        <SearchProvider config={configurationOptions}>

            <SearchBox
                searchAsYouType={true}
                inputView={renderInput}
                autocompleteMinimumCharacters={2}
                autocompleteResults={{
                    linkTarget: "_blank",
                    sectionTitle: "Results",
                    titleField: "title",
                    urlField: "nps_link",
                    shouldTrackClickThrough: true,
                    clickThroughTags: ["test"]
                }}
                debounceLength={0}
                onSubmit={searchTerm => {
                    history.push("/search?q=" + searchTerm);
                    window.location.href = "/search?q=" + searchTerm;
                }}
                onSelectAutocomplete={(selection, { }) => {
                    if (selection.title) {
                        window.location.href = "/search?q=" + selection.title.raw;
                    }
                }}
            />
        </SearchProvider>
    );
}

export default SearchBar;