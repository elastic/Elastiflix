import {
  SearchProvider
} from "@elastic/react-search-ui";
import connector from "../services/SearchConnector";
import { SearchBox, Sorting } from "@elastic/react-search-ui";
import {
  EuiIcon,
} from '@elastic/eui';

import Results from "./Results"
import Nav from "./Nav"


const renderInput = ({ getAutocomplete, getInputProps, getButtonProps }) => {
  return (
    <div className="search-box">
      <EuiIcon className="search-box__icon" type="search" />
      <input
        {...getInputProps({
          className: "search-box__input",
          placeholder: "Movie, cast or theme..."
        })}
      />
    </div>
  )
}


function SearchPage() {

  const config = {
    apiConnector: connector,
    trackUrlState: true,
    alwaysSearchOnInitialLoad: true,

    searchQuery: {
      search_fields: {  //adding search_fields
        title: { weight: 2 },
        overview: {}
      },
      disjunctiveFacets: ["genres"],
      resultsPerPage: 10,
      result_fields: {
        title: { raw: { size: 100 } },
        poster_path: { raw: {} },
        release_date: { raw: {} },
        overview: { raw: { size: 300 } },
        cast: { raw: {} }
      },
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
      }
    }
  };



  return (

    <SearchProvider config={config}>
      <div className="search-page-wrapper">
        <Nav />
        <div className="search-header">
          <SearchBox
            inputView={renderInput}
            className="search-box-container"
          />
        </div>
        <Results />
      </div>

    </SearchProvider>
  )

}


export default SearchPage
