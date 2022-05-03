import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, WithSearch } from "@elastic/react-search-ui";

function Popular(props) {
    const connector = new AppSearchAPIConnector({
        searchKey: window._env_.AS_SEARCH_API_KEY,
        engineName: window._env_.ENGINE_NAME,
        endpointBase: window._env_.AS_BASE_URL,
        cacheResponses: false
    })

    const config = {
        apiConnector: connector,
        alwaysSearchOnInitialLoad: true,
        initialState: { sortDirection: "desc", sortField: "popularity", resultsPerPage: 10 },
        trackUrlState: false,
        suggestions: {
            types: {
              // Limit query to only suggest based on "title" field
              documents: { fields: ["title"] }
            },
            // Limit the number of suggestions returned from the server
            size: 4
          }
    };

    return (
        <SearchProvider config={config}>
            <WithSearch mapContextToProps={({ searchTerm, setSearchTerm, results }) => ({ searchTerm, setSearchTerm, results })}>
                {({ searchTerm, setSearchTerm, results }) => (
                    <div className="row">
                        <h2>Popular movies</h2>
                        <div className="row__posters">
                            {results.map(r => (
                                <img
                                    className="row__poster row__posterLarge"
                                    src={`https://image.tmdb.org/t/p/original/${r.poster_path.raw}`}
                                    alt={r.title.raw}
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