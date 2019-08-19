require("dotenv").config();
var Twitter = require("twitter");

var T = new Twitter({
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token_key: process.env.access_token_key,
	access_token_secret: process.env.access_token_secret
});

// var params = {
// 	q: "#nodejs",
// 	count: 1,
// 	result_type: "recent",
// 	lang: "en"
// };

var params = {
	screen_name: "Utegration",
	count: 10
};

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 2266;

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// create application/json parser
var jsonParser = bodyParser.json();

app.get("/", (req, res) => {
	T.get("statuses/user_timeline", params, function(err, data, response) {
		if (!err) {
			return res.send(data);
		} else {
			console.log(err);
			return res.send("Something goes wrong!");
		}
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
