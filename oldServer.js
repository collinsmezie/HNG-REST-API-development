const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
});

// mongoose.connect("mongodb://127.0.0.1:27017/test", {
//   useNewUrlParser: true,
// });
// const uri = "mongodb+srv://collins:IOODaG8iW9uhBA3E@cluster0.wqhme71.mongodb.net/?retryWrites=true&w=majority";


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection errors: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});