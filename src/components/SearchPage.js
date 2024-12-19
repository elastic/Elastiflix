import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import { SearchBox, SearchProvider, Facet, Sorting } from "@elastic/react-search-ui";

import Results from "./Results"
import Nav from "./Nav"
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiIcon,
} from '@elastic/eui';

const renderInput = ({ getAutocomplete, getInputProps, getButtonProps }) => {
  return (
    <div className="search-box">
      <EuiIcon className="search-box__icon" type="search" />
      <input
        {...getInputProps({
          className: "search-box__input",
          placeholder: "Movie, cast..."
        })}
      />
      {getAutocomplete()}
    </div>
  )
}


function SearchPage() {
  const connector = new ElasticsearchAPIConnector({
    host: process.env.REACT_APP_ES_BASE_URL,
    index: process.env.REACT_APP_INDEX_NAME,
    apiKey: process.env.REACT_APP_ES_SEARCH_API_KEY,
  });

  const configurationOptions = {
    apiConnector: connector,
    trackUrlState: true,
    alwaysSearchOnInitialLoad: true,
    autocompleteQuery: {
      results: {
        resultsPerPage: 3,
        result_fields: {
          title: {
            raw: {
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
    },
    searchQuery: {
      disjunctiveFacets: ["genres"],
      resultsPerPage: 10,
      result_fields: {
        title: { raw: { size: 100 }, raw: {} },
        poster_path: { raw: {} },
        release_date: { raw: {} },
        overview: { raw: { size: 300 } },
        cast: { raw: {} }
      }/*,
      facets: {
        spoken_languages: { type: "value", size: 5 },
        cast: { type: "value", size: 5 },
        genres: { type: "value", size: 5 },
        production_companies: { type: "value", size: 5 },
        runtime: {
          type: "range",
          ranges: [
            { from: 0, to: 60, name: "Less than an hour" },
            { from: 61, name: "More than an hour" }
          ]
        },
        user_score: {
          type: "range",
          ranges: [
            { from: 0, to: 5, name: "0 - 5" },
            { from: 6, to: 8, name: "6 - 8" },
            { from: 9, to: 10, name: "9 - 10" }
          ]
        }
      }*/
    }
  };



  return (

    <SearchProvider config={configurationOptions}>
      <div className="search-page-wrapper">
        <Nav />
        <div className="search-header">
          <SearchBox
            inputView={renderInput}
            searchAsYouType={true}
            autocompleteMinimumCharacters={2}
            autocompleteResults={{
              linkTarget: "_blank",
              sectionTitle: "Results",
              titleField: "title",
              urlField: "nps_link",
              shouldTrackClickThrough: true,
              clickThroughTags: ["test"]
            }}
            className="search-box-container"
          />
          <Sorting
            className="sidebar-sort"
            sortOptions={[
              {
                name: 'Relevance',
                value: '',
                direction: '',
              },
              {
                name: 'Release date (Desc)',
                value: 'release_date',
                direction: 'desc',
              },
              {
                name: 'Release date (Asc)',
                value: 'release_date',
                direction: 'asc',
              }]}
          />
        </div>
        <Results />
      </div>

    </SearchProvider>
  )

}


export default SearchPage
