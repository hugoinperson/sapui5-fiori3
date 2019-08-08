sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/core/Component"], function(UIComponent, Component) {
	"use strict";
	return UIComponent.extend("utg.pages.Tweets.Component", {
		metadata: {
			manifest: "json"
		},

		init: function() {
			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);

			// initiate services
			Promise.all([this.createTwitterService()])
				.then(data => {
					console.log("jjjj", data);
				})
				.finally(() => {
					// create the views based on the url/hash
					this.getRouter().initialize();
				});
		},

		createTwitterService: function() {
			return Component.create({
				id: "twitterSrv",
				name: "utg.services.Twitter",
				manifestFirst: true,
				async: true
			});
		}
	});
});
