const app = require("./app.js");
const connectDB = require('../db/db')

connectDB();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Started server on port " + port);
});














