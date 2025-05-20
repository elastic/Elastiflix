import { withSearch, Facet } from "@elastic/react-search-ui";
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiSpacer,
} from '@elastic/eui';
import Card from "./Card"
import { MultiCheckboxFacet } from "@elastic/react-search-ui-views";


function Results({ results, totalResults }) {

    return (
        totalResults ?
            <EuiFlexGroup gutterSize='l'>
                
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


export default withSearch(({ results, totalResults }) => ({
    results, totalResults
}))(Results);
