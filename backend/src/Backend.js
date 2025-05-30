import express from "express";
import cors from "cors";
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const app = express();
app.use(cors());
app.use(express.json());

const connector = new ElasticsearchAPIConnector({
  host: process.env.ES_HOST,
  index: process.env.ES_INDEX,
  apiKey: process.env.ES_API_KEY
});

app.post("/api/search", async (req, res) => {
  const { state, queryConfig } = req.body;

  const response = await connector.onSearch(state, queryConfig);
  res.json(response);
});

app.post("/api/autocomplete", async (req, res) => {
  const { state, queryConfig } = req.body;
  const response = await connector.onAutocomplete(state, queryConfig);
  res.json(response);
});

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(17700);