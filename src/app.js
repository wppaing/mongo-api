require("dotenv/config");
const { MongoClient } = require("mongodb");
const { uri } = require("./utils");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const run = require("./autocomplete-query");

const app = express();
const client = new MongoClient(uri);
app.use(cors());
connectDB(client);

app.get("/", async (req, res) => {
  const keyword = req.query.keyword;
  const result = await run(keyword, client);
  res.send({
    status: "success",
    keyword,
    result,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
