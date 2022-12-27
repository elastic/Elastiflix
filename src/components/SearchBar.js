import React from 'react';
import {
    SearchBox,
} from '@elastic/react-search-ui';
import { EuiIcon } from '@elastic/eui';
import { useHistory } from "react-router-dom";


import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider } from "@elastic/react-search-ui";


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

    const connector = new AppSearchAPIConnector({
        searchKey: process.env.REACT_APP_AS_SEARCH_API_KEY,
        engineName: process.env.REACT_APP_ENGINE_NAME,
        endpointBase: process.env.REACT_APP_AS_BASE_URL,
        cacheResponses: false
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
                size: 3
              }
        }
    };

    

    const history = useHistory();

    return (
        <SearchProvider config={configurationOptions}>
            <SearchBox
                searchAsYouType={true}
                inputView={renderInput}
                autocompleteSuggestions={{
                    sectionTitle: "Suggested Queries"
                }}
                autocompleteMinimumCharacters={2}
                onSubmit={searchTerm => {
                    history.push("/search?q=" + searchTerm);
                }}
                onSelectAutocomplete={(selection, defaultOnSelectAutocomplete) => {
                    if (selection.suggestion) {
                        history.push("/search?q=" + selection.suggestion);
                    } else {
                        defaultOnSelectAutocomplete(selection);
                    }
                }}
            />
        </SearchProvider>
    );
}

export default SearchBar;