const mongoclient = require("mongodb").MongoClient;
const assert = require("assert");
const { uri } = require("./utils");

const agg = [
  {
    $search: {
      compound: {
        must: [
          {
            text: {
              query: ["Hawaii", "Alaska"],
              path: "plot",
            },
          },
          {
            regex: {
              query: "([0-9]{4})",
              path: "plot",
              allowAnalyzedField: true,
            },
          },
        ],
        mustNot: [
          {
            text: {
              query: ["Comedy", "Romance"],
              path: "genres",
            },
          },
          {
            text: {
              query: ["Beach", "Snow"],
              path: "title",
            },
          },
        ],
      },
    },
  },
  {
    $project: {
      title: 1,
      plot: 1,
      genres: 1,
      _id: 0,
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
    await cursor.forEach((db) => console.log(db));
    client.close();
  }
);
