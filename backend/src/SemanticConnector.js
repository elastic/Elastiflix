import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const SemanticConnector = new ElasticsearchAPIConnector({
  host: process.env.ES_HOST,
  index: process.env.ES_INDEX,
  apiKey: process.env.ES_API_KEY
}, (requestBody, requestState, queryConfig) => {

    if (!requestState.searchTerm) return requestBody;

    const body = {
      query: {
        semantic: {
          field: "plot_elser",
          query: requestState.searchTerm
        }
      }
    }

    requestBody.query = body.query;
    delete requestBody.sort;

    return requestBody;
  });

export default SemanticConnector;