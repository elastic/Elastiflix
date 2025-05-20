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
      disjunctiveFacets: ["genres"],
      resultsPerPage: 10,
      result_fields: {
        title: { raw: { size: 100 } },
        poster_path: { raw: {} },
        release_date: { raw: {} },
        overview: { raw: { size: 300 } },
        cast: { raw: {} }
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
