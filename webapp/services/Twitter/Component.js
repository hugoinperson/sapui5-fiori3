sap.ui.define(["sap/ui/core/Component", "sap/ui/model/odata/v2/ODataModel"], function(Component, ODataModel) {
	"use strict";
	return Component.extend("utg.services.Twitter.Component", {
		metadata: {
			manifest: "json"
		},

		init: function() {
			// call the base component's init function and create the App view
			this._odataModel = new ODataModel("http://localhost:4004/twitter/");
			console.log("VVVVV", this._odataModel);
		},

		getTweets: function() {
			return fetch("http://localhost:4004/twitter/Tweets");
		}
	});
});
