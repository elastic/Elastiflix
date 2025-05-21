import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const connectorOptions = {
    host: process.env.REACT_APP_SEARCH_ES,
    index: process.env.REACT_APP_SEARCH_INDEX,
    ...(process.env.REACT_APP_SEARCH_API_KEY && { apiKey: process.env.REACT_APP_SEARCH_API_KEY })
};

const connector = new ElasticsearchAPIConnector(connectorOptions, (requestBody, requestState, queryConfig) => {

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

export default connector;
