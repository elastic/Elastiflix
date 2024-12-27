import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import { SearchProvider, WithSearch } from "@elastic/react-search-ui";

import ComingSoon from '../coming-soon.png'

function Recent(props) {

  const connector = new ElasticsearchAPIConnector({
    host: process.env.REACT_APP_ES_BASE_URL,
    index: process.env.REACT_APP_INDEX_NAME,
    apiKey: process.env.REACT_APP_ES_SEARCH_API_KEY,
  });



  const config = {
    apiConnector: connector,
    alwaysSearchOnInitialLoad: true,
    initialState: { 

      sortList: [
        { direction: "desc", field: "release_date" }
      ],
      resultsPerPage: 8
    },
    trackUrlState: false,
    searchQuery: {
      search_fields: {
        title: {
          weight: 1
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
    }
  };

  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ searchTerm, setSearchTerm, results }) => ({ searchTerm, setSearchTerm, results })}>

        {({ searchTerm, setSearchTerm, results }) => (
          <div className="row">
            <h2>Recent movies</h2>
            <div className="row__posters">
              {
                results.filter(r => r.poster_path.raw !== null).map(r =>
                  <img
                    key={r.id.raw}
                    className="row__poster row__posterLarge"
                    src={!r.poster_path.raw ? ComingSoon : `https://image.tmdb.org/t/p/original/${r.poster_path.raw}`}
                    alt={r.title.raw}
                  />
                )}
            </div>
          </div>
        )}
      </WithSearch>
    </SearchProvider>
  );
}

export default Recent;
