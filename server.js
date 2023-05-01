const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let raw_data_path = "";
let output_data_path = "";
let current_idx = 0;
let current_file = "";

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

function sendNextFile(res) {
    current_file = fs.readdirSync(raw_data_path).sort()[current_idx];
    next_raw_file_path = path.join(raw_data_path, current_file);
    next_raw_file = fs.readFileSync(next_raw_file_path, 'utf8');
    next_raw_file = JSON.parse(next_raw_file);
    next_raw_file["code"] = "200";
    res.send(next_raw_file);
}

function checkPaths(paths) {
    for (let path of paths) {
        if (!fs.existsSync(path)) {
            console.log("Path does not exist: " + path);
            return false;
        }
    }
    return true;
}

function appendTime(filename) {
    filename = filename.split(".");
    filename[0] += "_" + Date.now();
    return filename.join(".");
}

app.post('/paths', (req, res) => {
    raw_data_path = req.body.raw
    output_data_path = req.body.out
    if (checkPaths([raw_data_path, output_data_path])) {
        sendNextFile(res);
    } else {
        res.send({ "code": "400", "message": "Invalid paths" });
    }
});

app.post('/next', (req, res) => {
    if (raw_data_path === "" || output_data_path === "") {
        res.send({ "code": "400", "message": "Need to set the paths to the prompt and target files" });
    } else {
        data = {
            "prompt": req.body.prompt,
            "target": req.body.target,
        };
        write_path = path.join(output_data_path, appendTime(current_file));
        fs.writeFileSync(write_path, JSON.stringify(data));
        if (req.body.repeat) {
            sendNextFile(res);
        } else {
            current_idx += 1;
            current_file = fs.readdirSync(raw_data_path).sort()[current_idx];
            if (current_idx < fs.readdirSync(raw_data_path).length) {
                sendNextFile(res);
            } else {
                res.send({ "code": "200", "message": "Done" });
            }
        }
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
