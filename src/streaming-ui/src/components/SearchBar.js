import React from 'react';
import {
    SearchBox,
} from '@elastic/react-search-ui';
import { EuiIcon } from '@elastic/eui';
import { useHistory } from "react-router-dom";


import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider } from "@elastic/react-search-ui";

function SearchBar() {

    const connector = new AppSearchAPIConnector({
        searchKey: window._env_.AS_SEARCH_API_KEY,
        engineName: window._env_.ENGINE_NAME,
        endpointBase: window._env_.AS_BASE_URL,
        cacheResponses: false
    });

    const configurationOptions = {
        apiConnector: connector,
        trackUrlState: false,
        alwaysSearchOnInitialLoad: false,
        autocompleteQuery: {
            results: {
                resultsPerPage: 3,
                result_fields: {
                    title: {
                        snippet: {
                            size: 100,
                            fallback: true
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

    const history = useHistory();

    return (
        <SearchProvider config={configurationOptions}>
            <SearchBox
                autocompleteResults={{
                    sectionTitle: "Suggested results",
                    titleField: "title",
                    urlField: "url",
                    linkTarget: "_blank",
                }
                }
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