sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/Component",
		"sap/ui/model/json/JSONModel",
		"sap/m/Text",
		"sap/ui/integration/widgets/Card",
		"sap/f/GridContainerItemLayoutData"
	],
	function(Controller, Component, JSONModel, Text, Card, GridContainerItemLayoutData) {
		"use strict";

		return Controller.extend("utg.pages.Tweets.controller.Main", {
			onInit: function() {
				// use custom component for integration card
				this._compCardManifest = this.getOwnerComponent()
					.getModel("compCardManifest")
					.getData();
			},

			cardFactory: function(sId, oContext) {
				const tweet = this.parseTweet(oContext.getObject());
				const layoutData = new GridContainerItemLayoutData({ minRows: 1, columns: 4 });

				// custom manifest for component card
				const customManifest = JSON.parse(JSON.stringify(this._compCardManifest));
				customManifest["sap.card"]["data"] = { json: tweet };
				const manifest = customManifest;
				const card = new Card({ manifest, layoutData });

				return card;
			},

			parseTweet: function(tweet) {
				if (!tweet) {
					return {};
				}

				// parse text
				let content = tweet.text;
				if (content.substring(0, 3) === "RT ") {
					tweet.text = content.replace("RT ", "");
					tweet.type = "Retweet";
				} else {
					tweet.type = "Tweet";
				}

				// parse time
				tweet.time = new Date(tweet.time).toLocaleString();

				return tweet;
			}
		});
	}
);
