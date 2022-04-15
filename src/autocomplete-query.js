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
          plot: 1,
          genres: 1,
          runtime: 1,
          cast: 1,
          poster: 1,
          title: 1,
          fullplot: 1,
          languages: 1,
          directors: 1,
          rated: 1,
          awards: 1,
          year: 1,
          countries: 1,
          imdb: 1,
          type: 1,
          tomatoes: 1,
        },
      },
    ];

    // run pipeline
    const data = [];
    const result = await coll.aggregate(agg);
    await result.forEach((doc) => data.push(doc));
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = run;
