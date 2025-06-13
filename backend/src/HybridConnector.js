import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const HybridConnector = new ElasticsearchAPIConnector({
  host: process.env.ES_HOST,
  index: process.env.ES_INDEX,
  apiKey: process.env.ES_API_KEY
},(requestBody, requestState, queryConfig) => {

  if (!requestState.searchTerm) return requestBody;

  const body = {
    retriever: {
      linear: {
        retrievers: [
          {
            retriever: {
              standard: {
                query: requestBody.query
              }
            },
            weight: 1
          },
          {
            retriever: {
              standard: {
                query: {
                  semantic: {
                    field: "plot_elser",
                    query: requestState.searchTerm
                  }
                }
              }
            },
            weight: 3
          }
        ],
        rank_window_size: 100
      }
    }
  }

  //delete the original query and sort from requestBody
  delete requestBody.query;
  delete requestBody.sort;

  //adding the new "retriever" clause to the requestBody
  requestBody.retriever = body.retriever;

  return requestBody;
  });

export default HybridConnector;