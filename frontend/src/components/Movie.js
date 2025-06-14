import { SearchProvider, WithSearch } from "@elastic/react-search-ui";
import React from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav"
import connector from '../services/SearchConnector'; // Import the shared connector

function Movie() {

    const location = useLocation();
    const movieId = new URLSearchParams(location.search).get("id");

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

                backdrop_path: {
                    snippet: {}
                },
                overview: {
                    snippet: {}
                },
                release_date: {
                    snippet: {}
                },
                cast: {
                    snippet: {}
                },
                plot: {
                    raw: {}
                },
                id: {
                    snippet: {}
                }
            },
            result_size: 1
        },
        apiConnector: connector, // Use the shared connector
        alwaysSearchOnInitialLoad: true,
        trackUrlState: false
    };

    

    return (
        <SearchProvider config={config}>
            
            <Nav showSearch={true} fixed={true} />
            <WithSearch mapContextToProps={({ results }) => ({ results })}>
                
                {({ results }) => {
                    
                    if (!results || results.length === 0) return <div>Movie not found.</div>;

                    // Get the first result only
                    const movie = results[0];
                    const poster = movie.backdrop_path.raw
                        ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path.raw}`
                        : null;

                    return(
            
                        <div className="movie" style={{
                            backgroundImage: `url(${poster})`,
                          }}>
                            
                            <div className="container">
                                <div className="left">
                                    <h1 className="title">{results[0].title.raw}</h1>
                                    <p className="overview">{results[0].overview.raw}</p>

                                    <h3>Release</h3>
                                    <p>{results[0].release_date.raw}</p>

                                    <h3>Cast</h3>
                                    {results[0].cast.raw.slice(0, 10).map((number) => (
                                        <p key={number}>{number}</p>
                                    ))}
    
                                      
                                </div>
                                <div className="right">
                                {results[0]?.hasOwnProperty("plot") && 
                                    ( 
                                        <div className="plot">
                                            <h3>Plot</h3>
                                            <p className="plot_text">{results[0].plot.raw}</p>
                                        </div> 
                                    )} 

                                    

    
                                </div>
                                
                            </div>

                        </div>

                    ) 
                }}

            </WithSearch>
        </SearchProvider>
    );
}

export default Movie;
