sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/Component", "sap/ui/model/json/JSONModel"], function(
	Controller,
	Component,
	JSONModel
) {
	"use strict";

	return Controller.extend("utg.pages.Tweets.controller.Main", {
		onInit: function() {
			this._twitterService = Component.get("twitterSrv");
			this._twitterModel = new JSONModel();
			this._cardManifests = new JSONModel(sap.ui.require.toUrl("utg/pages/Overview/model/cards.json"));

			this.getView().setModel(this._cardManifests, "manifests");
			this.getView().setModel(this._twitterModel, "twitter");

			this._twitterService
				.getTweets()
				.then(res => res.json())
				.then(data => {
					this._twitterModel.setProperty("/tweets", data);
				})
				.catch(error => {
					console.log("no", error);
				});
		}
	});
});
