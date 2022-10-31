import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchBox, SearchProvider, Facet, Sorting } from "@elastic/react-search-ui";
import MultiCheckboxFacet from "./MultiCheckboxFacet";
import Results from "./Results"
import Nav from "./Nav"
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiIcon,
} from '@elastic/eui';


function SearchPage() {
  const connector = new AppSearchAPIConnector({
    searchKey: process.env.REACT_APP_AS_SEARCH_API_KEY,
    engineName: process.env.REACT_APP_ENGINE_NAME,
    endpointBase: process.env.REACT_APP_AS_BASE_URL,
    cacheResponses: false
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
            snippet: {
              size: 100,
              fallback: true
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
      resultsPerPage: 10,
      result_fields: {
        title: { snippet: { size: 100, fallback: true }, raw: {} },
        poster_path: { raw: {} },
        release_date: { raw: {} },
        overview: { snippet: { size: 300, fallback: true } },
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

  return (

    <SearchProvider config={configurationOptions}>
      <div className="search-page-wrapper">
        <Nav />
        <div className="search-header">
          <SearchBox
            inputView={renderInput}
            searchAsYouType={true}
            autocompleteSuggestions={{
              sectionTitle: "Suggested Queries"
            }}
            className="search-box-container"
            autocompleteMinimumCharacters={2}
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
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiSpacer />
            <EuiFlexGroup gutterSize="xs" direction="column" style={{ paddingLeft: "40px" }}>
              {/* <DateSelectFacet field="release_date" /> */}
              <EuiFlexItem grow={false}><Facet field="cast" label="Cast member" showSearch={true} view={MultiCheckboxFacet} /></EuiFlexItem>
              <EuiFlexItem grow={false}><Facet field="genres" label="Genres" showSearch={true} view={MultiCheckboxFacet} /></EuiFlexItem>
              <EuiFlexItem grow={false}><Facet field="user_score" label="User score" view={MultiCheckboxFacet} /></EuiFlexItem>
              <EuiFlexItem grow={false}><Facet field="runtime" label="Runtime" view={MultiCheckboxFacet} /></EuiFlexItem>
              <EuiFlexItem grow={false}><Facet field="production_companies" showSearch={true} label="Production company" view={MultiCheckboxFacet} /></EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <Results />
        </EuiFlexGroup>
      </div>

    </SearchProvider>
  )

}


export default SearchPage
