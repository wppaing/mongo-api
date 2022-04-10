const mongoclient = require("mongodb").MongoClient;
const assert = require("assert");
const { uri } = require("./utils");

const agg = [
  {
    $search: {
      text: {
        query: "baseball",
        path: "plot",
      },
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      title: 1,
      plot: 1,
    },
  },
];

mongoclient.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async function (connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db("sample_mflix").collection("movies");
    let cursor = await coll.aggregate(agg);
    await cursor.forEach((doc) => console.log(doc));
    client.close();
  }
);
