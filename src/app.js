require("dotenv/config");
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const { uri } = require("./utils");

const app = express();
const client = new MongoClient(uri);

app.use(cors());

async function connectDB() {
  await client.connect();
  console.log(`MongoDB connected`);
}
connectDB();

const run = require("./autocomplete-query");

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
