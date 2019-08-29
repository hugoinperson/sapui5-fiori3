sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"], function(UIComponent, JSONModel) {
	"use strict";
	return UIComponent.extend("utg.pages.Tweets.Component", {
		metadata: {
			manifest: "json"
		},
		init: async function() {
			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);

			// load the component card manifest
			const compCardUrl = sap.ui.require.toUrl("utg/components/TweetCard/manifest.json");
			const compCardManifestModel = new JSONModel(compCardUrl);
			this.setModel(compCardManifestModel, "compCardManifest");
			await compCardManifestModel.dataLoaded();

			// create the views based on the url/hash
			this.getRouter().initialize();
		}
	});
});
