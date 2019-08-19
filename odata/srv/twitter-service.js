/**
 * Implementation for TwitterService defined in ./cat-service.cds
 */

require("dotenv").config({ path: "../.env" });

const twitter = require("twitter");
const twitterHandle = new twitter({
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token_key: process.env.access_token_key,
	access_token_secret: process.env.access_token_secret
});

function parseTweets(tweets) {
	return tweets.map(tweet => ({
		ID: `${tweet.id_str}`,
		text: tweet.full_text,
		// author_ID: `${tweet.user.id_str}`,
		time: `${new Date(tweet.created_at).toISOString()}`,
		userName: tweet.user.name,
		userPicUrl: tweet.user.profile_image_url
	}));
}

function parseMedia(media, tweetId) {
	return media.map(source => ({
		ID: `${source.id_str}`,
		tweet_ID: `${tweetId}`,
		url: source.media_url_https,
		type: source.type
	}));
}

module.exports = srv => {
	srv.on("READ", "Tweets", async req => {
		const params = {
			screen_name: "Utegration",
			count: 30,
			tweet_mode: "extended"
		};

		const data = await twitterHandle.get("statuses/user_timeline", params);

		if (data) {
			// console.log(JSON.stringify(data, null, 2));
			return parseTweets(data);
		} else {
			req.reject(500, "Cannot get tweets!");
		}
	});

	// srv.on("READ", "Authors", req => {
	// 	return [{ ID: "1446943182", name: "Hello" }];
	// });

	// srv.on("READ", "Media", req => {
	// 	return [{ ID: "123", tweet_ID: "1155870849339154437" }];
	// });
};
