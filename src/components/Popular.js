import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import {
    
    SearchProvider,

    WithSearch
  } from "@elastic/react-search-ui";

function Popular(props) {

    const connector = new ElasticsearchAPIConnector({
        host: process.env.REACT_APP_ES_BASE_URL,
        index: process.env.REACT_APP_INDEX_NAME,
        apiKey: process.env.REACT_APP_ES_SEARCH_API_KEY,
    });

    const config = {
        initialState: { sortDirection: "desc", sortField: "popularity", resultsPerPage: 10 },
        searchQuery: {
            search_fields: {
                title: {
                    weight: 3
                }
            },
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
                },
                "workaround-popular": {
                    snippet: {}
                }
            }
        },
        apiConnector: connector,
        alwaysSearchOnInitialLoad: true,
        trackUrlState: false
    };

    return (
        <SearchProvider config={config}>
            <WithSearch mapContextToProps={({ searchTerm, setSearchTerm, results }) => ({ searchTerm, setSearchTerm, results })}>
                
                {({ searchTerm, setSearchTerm, results }) => (
                    <div className="row">
                        <h2>Popular movies</h2>
                        <div className="row__posters">
                            {
                            results.filter(r => r.poster_path !== null).map(r => (
                                <img
                                    key={r.id.raw}
                                    className="row__poster row__posterLarge"
                                    src={`https://image.tmdb.org/t/p/original/${r.poster_path.raw}`}
                                    alt={r.title.raw}
                                    // onclick set the movie var in the local storate to the current movie
                                    onClick={() => {
                                        console.log("clicked")
                                        console.log(r)
                                        console.log(r.backdrop_path.raw)
                                        // setMovieState({
                                        //     title: r.title.raw,
                                        //     description: r.overview.raw,
                                        //     backdrop: `https://image.tmdb.org/t/p/original/${r.backdrop_path.raw}`,
                                        //     id: r.id.raw
                                        // })
                                        // setMovie({
                                        //     title: r.title.raw,
                                        //     description: r.overview.raw,
                                        //     backdrop: `https://image.tmdb.org/t/p/original/${r.backdrop_path.raw}`,
                                        //     id: r.id.raw
                                        // })
                                        // window.localStorage.setItem('movie', JSON.stringify({
                                        //     title: r.title.raw,
                                        //     description: r.overview.raw,
                                        //     backdrop: `https://image.tmdb.org/t/p/original/${r.backdrop_path.raw}`,
                                        //     id: r.id.raw
                                        // }))
                                        window.location.href = "/home"
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </WithSearch>
        </SearchProvider>
    );
}

export default Popular;