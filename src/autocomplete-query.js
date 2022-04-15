async function run(keyword, client) {
  try {
    //set namespace
    const database = client.db("sample_mflix");
    const coll = database.collection("movies");

    // define pipeline
    const agg = [
      {
        $search: {
          autocomplete: {
            query: keyword,
            path: "title",
          },
        },
      },
      {
        $limit: 20,
      },
      {
        $project: {
          _id: 0,
          title: 1,
        },
      },
    ];

    // run pipeline
    const data = [];
    const result = await coll.aggregate(agg);
    await result.forEach((doc) => data.push(doc));
    return data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = run;
