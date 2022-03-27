const app = require("./app.js");
const db = require('../db/db')

db.connectDB();

const port = process.env.PORT ? process.env.PORT : 8080;;

app.listen(port, () => {
  console.log(process.env);
  console.log("Started server on http://localhost:" + port);
});














