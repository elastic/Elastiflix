import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const HybridConnector = new ElasticsearchAPIConnector({
  host: process.env.ES_HOST,
  index: process.env.ES_INDEX,
  apiKey: process.env.ES_API_KEY
},(requestBody, requestState, queryConfig) => {

    if (!requestState.searchTerm) return requestBody;

    const body = {
      retriever: {
        rrf: {
          retrievers: [
            {
              standard: {
                query: {}
              }
            },
            {
              standard: {
                query: {
                  semantic: {
                    field: "extra.plot_llm",
                    query: requestState.searchTerm
                  }
                }
              }
            }
          ],
          rank_window_size: 200,
          rank_constant: 1
        }
      }
    }

    body.retriever.rrf.retrievers[0].standard.query = requestBody.query;

    //delete the original query and sort from requestBody
    delete requestBody.query;
    delete requestBody.sort;

    //adding the new "retriever" clause to the requestBody
    requestBody.retriever = body.retriever;

    return requestBody;
  });

export default HybridConnector;