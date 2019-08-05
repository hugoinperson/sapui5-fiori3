var Twitter = require("twitter");
var config = require("./config.js");

var T = new Twitter(config);

// var params = {
// 	q: "#nodejs",
// 	count: 1,
// 	result_type: "recent",
// 	lang: "en"
// };

var params = {
	screen_name: "BonnieGlaser",
	count: 2
};

T.get("statuses/user_timeline", params, function(err, data, response) {
	if (!err) {
		// Loop through the returned tweets
		for (let i = 0; i < data.length; i++) {
			// Get the tweet text from the returned data
			let text = data[i].text;

			console.log(text);

			// Try to Favorite the selected Tweet
			// T.post("favorites/create", id, function(err, response) {
			// 	// If the favorite fails, log the error message
			// 	if (err) {
			// 		console.log(err[0].message);
			// 	}
			// 	// If the favorite is successful, log the url of the tweet
			// 	else {
			// 		let username = response.user.screen_name;
			// 		let tweetId = response.id_str;
			// 		console.log("Favorited: ", `https://twitter.com/${username}/status/${tweetId}`);
			// 	}
			// });
		}
	} else {
		console.log(err);
	}
});
