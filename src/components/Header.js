import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import { SearchProvider, WithSearch } from "@elastic/react-search-ui";

function Header() {
  const connector = new ElasticsearchAPIConnector({
    host: process.env.REACT_APP_ES_BASE_URL,
    index: process.env.REACT_APP_INDEX_NAME,
    apiKey: process.env.REACT_APP_ES_SEARCH_API_KEY,
  });

  const config = {
    initialState: { sortDirection: "desc", sortField: "popularity", resultsPerPage: 1 }, // Only fetch 1 result
    searchQuery: {
      filters: [
        {
          field: "id", 
          values: ["568124"], // Match this field's value to the passed `id`
          type: "all", 
        }
      ],
      result_fields: {
        title: { raw: {} },
        poster_path: { raw: {} },
        overview: { raw: {} },
        release_date: { raw: {} },
      },
    },
    apiConnector: connector,
    alwaysSearchOnInitialLoad: true,
    trackUrlState: false,
  };

  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ results }) => ({ results })} // Map only the results
      >
        {({ results }) => {
          if (!results || results.length === 0) return <div>Loading...</div>;

          // Get the first result
          const movie = results[0];
          const poster = movie.poster_path.raw
            ? `https://image.tmdb.org/t/p/original/${movie.poster_path.raw}`
            : null;

          return (
            <header
              className="banner"
              style={{
                backgroundImage: `url(${poster})`,
              }}
            >
              <div className="banner__contents">
                <h1 className="banner__title">{movie.title.raw}</h1>
                <div className="banner__buttons">
                  <button className="banner__button">Play</button>
                  <button className="banner__button">My List</button>
                </div>
                <p className="banner__description">{movie.overview.raw}</p>
              </div>
              <div className="banner--fadeBottom"></div>
            </header>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}

export default Header;
