import express from "express";
import cors from "cors";
import SearchConnector from "./SearchConnector.js";
import RerankConnector from "./RerankConnector.js";
import SemanticConnector from "./SemanticConnector.js";
import HybridConnector from "./HybridConnector.js";

const app = express();
if (process.env.LOCAL) {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );
}
app.use(express.json());

app.post("/api/search", async (req, res) => {
  const { state, queryConfig } = req.body;
  console.info("Search request:", state, queryConfig);
  const response = await SearchConnector.onSearch(state, queryConfig);
  res.json(response);
});

app.post("/api/rerank/search", async (req, res) => {
  const { state, queryConfig } = req.body;
  console.info("Rerank Search request:", state, queryConfig);  
  const response = await RerankConnector.onSearch(state, queryConfig);
  res.json(response);
});

app.post("/api/semantic/search", async (req, res) => {
  const { state, queryConfig } = req.body;
  console.info("Semantic Search request:", state, queryConfig);
  const response = await SemanticConnector.onSearch(state, queryConfig);
  res.json(response);
});

app.post("/api/hybrid/search", async (req, res) => {
  const { state, queryConfig } = req.body;
  console.info("Hybrid Search request:", state, queryConfig);
  const response = await HybridConnector.onSearch(state, queryConfig);
  res.json(response);
});

app.post("/api/autocomplete", async (req, res) => {
  const { state, queryConfig } = req.body;
  const response = await SearchConnector.onAutocomplete(state, queryConfig);
  res.json(response);
});

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(17700);