require("dotenv/config");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const run = require("./autocomplete-query");

app.get("/", async (req, res) => {
  const keyword = req.query.keyword;
  const result = await run(keyword);
  res.send({
    status: "success",
    keyword,
    result,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
