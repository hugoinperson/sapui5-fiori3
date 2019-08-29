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
	return tweets
		.sort((a, b) => {
			const date1 = new Date(a.created_at).getTime();
			const date2 = new Date(b.created_at).getTime();
			return date1 - date2;
		})
		.map(tweet => ({
			ID: `${tweet.id_str}`,
			text: tweet.full_text,
			time: `${new Date(tweet.created_at).toISOString()}`,
			userName: tweet.user.name,
			screenName: tweet.user.screen_name,
			userPicUrl: tweet.user.profile_image_url.replace("http", "https")
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
		const timelineParams = {
			screen_name: "Utegration",
			count: 30,
			tweet_mode: "extended"
		};

		const searchParams = {
			q: "@Utegration",
			count: 30,
			result_type: "mixed",
			tweet_mode: "extended"
		};

		const timelineData = await twitterHandle.get("statuses/user_timeline", timelineParams);
		const searchData = await twitterHandle.get("search/tweets", searchParams);

		if (timelineData && searchData) {
			const data = [...timelineData, ...searchData.statuses];
			// console.log(JSON.stringify(data, null, 2));
			return parseTweets(data);
		} else {
			req.reject(500, "Cannot get tweets!");
		}
	});
};
