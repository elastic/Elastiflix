import { SearchProvider, Results, WithSearch } from "@elastic/react-search-ui";
import { Paging } from "@elastic/react-search-ui-views";
import connector from '../services/SearchConnector'; // Import the shared connector

function Popular() {

  const config = {
    initialState: {
      sortList: [
        { direction: "desc", field: "popularity" }
      ], resultsPerPage: 10
    },
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
    apiConnector: connector, // Use the shared connector
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
                results.filter(movie => movie.poster_path !== null).map(movie => (
                  <img
                    key={movie.id.raw}
                    className="row__poster row__posterLarge"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path.raw}`}
                    alt={movie.title.raw}
                    onClick={() => {
                      window.location.href = `/movie?id=${movie.id.raw}`
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