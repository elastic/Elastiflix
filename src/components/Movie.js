import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import { SearchProvider, WithSearch } from "@elastic/react-search-ui";
import React from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav"

function Movie() {

    const location = useLocation();
    const movieId = new URLSearchParams(location.search).get("id");

    const connector = new ElasticsearchAPIConnector({
        host: process.env.REACT_APP_ES_BASE_URL,
        index: process.env.REACT_APP_INDEX_NAME,
        apiKey: process.env.REACT_APP_ES_SEARCH_API_KEY,
    });

    const config = {
        initialState: {},
        searchQuery: {
            filters: [
                {
                  type: "all",
                  field: "id",
                  values: [movieId] 
                }
              ],
            result_fields: {
                title: {
                    snippet: {}
                },
                poster_path: {
                    snippet: {}
                },
                backdrop_path: {
                    snippet: {}
                },
                overview: {
                    snippet: {}
                },
                release_date: {
                    snippet: {}
                },
                id: {
                    snippet: {}
                }
            },
            result_size: 1
        },
        apiConnector: connector,
        alwaysSearchOnInitialLoad: true,
        trackUrlState: false
    };

    return (
        <SearchProvider config={config}>
            <Nav showSearch={true} fixed={true}/>
            
            <WithSearch mapContextToProps={({ results }) => ({ results })}>
                
                {({ results }) => (
                    results.length > 0 ? (
                        <div>
                            <h3>{results[0].title.raw}</h3>
                            <div className="banner__contents">
                                <h1 className="banner__title">{results[0].title.raw}</h1>
                                <div className="banner__buttons">
                                <button className="banner__button">Play</button>
                                <button className="banner__button">My List</button>
                                </div>
                                <p className="banner__description">{results[0].overview.raw}</p>
                            </div>
                            <div className="banner--fadeBottom"></div>
                        </div>
                        
                    ) : (
                        <p>No results found</p>
                    )
                )}
                
            </WithSearch>
        </SearchProvider>
    );
}

export default Movie;
