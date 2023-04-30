const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let raw_data_path = "";
let output_data_path = "";

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(__dirname + '/style.css');
});

app.get('/index.js', (req, res) => {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/index.js');
});


app.post('/paths', (req, res) => {
    raw_data_path = req.body.raw
    output_data_path = req.body.out
    console.log(req.body)
    console.log()
    console.log(raw_data_path)
});

app.post('/next', (req, res) => {
    if (raw_data_path === "" || output_data_path === "") {
        res.send("paths_not_set");
    } else {
        res.send("paths_set");
        console.log("next")
    }
});

app.post('/repeat', (req, res) => {
    if (raw_data_path === "" || output_data_path === "") {
        res.send("paths_not_set");
    } else {
        res.send("paths_set");
        console.log("repeat")
    }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

