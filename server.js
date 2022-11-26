const express = require('express');
const cors = require('cors');

var app = express();
 
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/uploaded"))

app.use("/api/svh", require("./api"));
 
app.listen(3000, function () {
  console.log('Server is running on port 3000');
});