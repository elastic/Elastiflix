import { SearchProvider, Results, WithSearch } from "@elastic/react-search-ui";
import { Paging } from "@elastic/react-search-ui-views";
import connector from '../services/searchConnector'; // Import the shared connector

import ComingSoon from '../assets/coming-soon.png'

function Recent() {

  const config = {
    apiConnector: connector, // Use the shared connector
    alwaysSearchOnInitialLoad: true,
    initialState: { 
      sortList: [
        { direction: "desc", field: "release_date" }
      ],
      resultsPerPage: 15
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
                    onClick={() => {
                      window.location.href = `/movie?id=${r.id.raw}`
                    }}
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
