import { withSearch, Facet } from "@elastic/react-search-ui";
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiSpacer,
    EuiLoadingSpinner
} from '@elastic/eui';
import Card from "./Card"
import { MultiCheckboxFacet } from "@elastic/react-search-ui-views";


function Results({ results, totalResults, isLoading }) {

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <EuiLoadingSpinner size="xl" />
            </div>
        );
    }

    return (
        totalResults ?
            <EuiFlexGroup gutterSize='l'>
                <EuiFlexItem grow={false}>
                        <EuiFlexGroup gutterSize="xs" direction="column" style={{ paddingLeft: "40px" }}>
                                <EuiFlexItem grow={false}><Facet field="cast" label="Cast member" showSearch={true} view={MultiCheckboxFacet} /></EuiFlexItem>
                                <EuiFlexItem grow={false}><Facet field="genres" label="Genres" showSearch={true} view={MultiCheckboxFacet} filterType="any" /></EuiFlexItem>
                                <EuiFlexItem grow={false}><Facet field="user_score" label="User score" view={MultiCheckboxFacet} /></EuiFlexItem>
                                <EuiFlexItem grow={false}><Facet field="runtime" label="Runtime" view={MultiCheckboxFacet} /></EuiFlexItem>
                                <EuiFlexItem grow={false}><Facet field="production_companies" showSearch={true} label="Production company" view={MultiCheckboxFacet} /></EuiFlexItem>
                        </EuiFlexGroup>
                </EuiFlexItem>
                <EuiFlexItem style={{ paddingLeft: "40px", paddingRight: "40px" }}>
                    <EuiSpacer />
                    <EuiFlexGroup direction="column">
                        {results.map(r => {
                            return (
                                <EuiFlexItem key={r.id.raw} grow={false}>
                                    <Card movie={r}></Card>
                                </EuiFlexItem>
                            )
                        })}
                    </EuiFlexGroup>
                </EuiFlexItem>
            </EuiFlexGroup> :
            <div className="no-results">
                No movies found for your query, try another one!
            </div>

    );
}


export default withSearch(({ results, totalResults, isLoading }) => ({
    results, totalResults, isLoading
}))(Results);
