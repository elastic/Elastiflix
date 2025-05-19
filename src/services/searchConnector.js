import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const connectorOptions = {
  host: process.env.REACT_APP_SEARCH_ES,
  index: process.env.REACT_APP_SEARCH_INDEX,
  ...(process.env.REACT_APP_SEARCH_API_KEY && { apiKey: process.env.REACT_APP_SEARCH_API_KEY })
};

const connector = new ElasticsearchAPIConnector(connectorOptions);

export default connector;
