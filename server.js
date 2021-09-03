// const fs = require('fs');

// const newNote = {
//     "title":"new Note",
//     "text":"test text"
// }
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
const express = require('express');
const PORT = 3001;
var app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => {
    console.log("listening on port ", PORT);
})