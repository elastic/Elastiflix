import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const RerankConnector = new ElasticsearchAPIConnector({
  host: process.env.ES_HOST,
  index: process.env.ES_INDEX,
  apiKey: process.env.ES_API_KEY,
  connectionOptions: {
    requestTimeout: 30000  
  }
},(requestBody, requestState, queryConfig) => {

    if (!requestState.searchTerm) return requestBody;

    const body = {
        retriever: {
            text_similarity_reranker: {
                retriever: {
                    standard: {
                        query: {}
                    }
                },
                field: "title",
                inference_id: "rerank",
                inference_text: requestState.searchTerm,
                rank_window_size: 100            
            }

        }
    }

    body.retriever.text_similarity_reranker.retriever.standard.query = requestBody.query;

    //delete the original query and sort from requestBody
    delete requestBody.query;
    delete requestBody.sort;

    //adding the new "retriever" clause to the requestBody
    requestBody.retriever = body.retriever;

    // For fulltext search, we keep the default query structure

    return requestBody;
});

export default RerankConnector;