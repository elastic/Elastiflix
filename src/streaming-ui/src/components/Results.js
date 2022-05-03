import { withSearch } from "@elastic/react-search-ui";
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiSpacer,
} from '@elastic/eui';
import Card from "./Card"


function Results({ results }) {


    return (

                <EuiFlexItem style={{paddingLeft: "40px", paddingRight: "40px"}}>
                    <EuiSpacer />
                    <EuiFlexGroup direction="column">
                        {results.map(r => {
                            return (
                                <EuiFlexItem key={r.id.raw}>
                                    <Card movie={r}></Card>
                                </EuiFlexItem>
                            )
                        })}
                    </EuiFlexGroup>
                </EuiFlexItem>

    );
}


export default withSearch(({ results }) => ({
    results
}))(Results);
