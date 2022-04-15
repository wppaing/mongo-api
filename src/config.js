async function connectDB(client) {
  try {
    await client.connect();
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
