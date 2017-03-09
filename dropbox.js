const curl = require("curlrequest");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/delete", function (req, res) {
    console.log("delete file");
    var data = {
        "path": "/probando",
    }
    var options = {
        url: "https://api.dropboxapi.com/2/files/delete",
        method: "POST",
        headers: {
            Authorization: "Bearer 957NesrUISAAAAAAAAAAMVRus44-AFW-ec0OFMDhXgrbm8macTcaJvjc8G7bGaez",
            "Content-Type": 'application/json ;charset=utf-8'
        },
        data: JSON.stringify(data)
    }
    curl.request(options, function (err, stdout, meta) {
        if (err) {
            console.log(err);
        } else {
            console.log("Normal");
            console.log(stdout);
        }
    });
    res.send("ok");
});

app.post("/createLink", function (req, res) {
    var path = req.body.path;
    console.log(path);
    console.log("create shared link file");
    var data = {
        "path": path
    }
    var options = {
        url: "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
        method: "POST",
        headers: {
            Authorization: "Bearer 957NesrUISAAAAAAAAAAMVRus44-AFW-ec0OFMDhXgrbm8macTcaJvjc8G7bGaez",
            "Content-Type": 'application/json ;charset=utf-8'
        },
        data: JSON.stringify(data)
    }
    curl.request(options, function (err, stdout, meta) {
        if (err) {
            console.log(err);
        } else {
            var obj = JSON.parse(stdout);
            console.log("Normal");
            console.log("link= " + obj.url);
            res.send({
                url: obj.url
            }
            );
            console.log(obj);
        }
    });
});

app.listen(5000, function () {
    console.log('App listening on port 5000!');
});