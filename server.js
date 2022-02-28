var express = require('express');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var options = {
    dotfile: 'ignore',
    extensions: ['htm', 'html'],
    index: 'index.html'
}
app.use(express.static('./public', options));

var PORT = 3000;
app.listen(PORT, () => console.log("Server started on port " + PORT));