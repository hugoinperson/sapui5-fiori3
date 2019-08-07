sap.ui.define(["sap/ui/core/Component"], function(Component) {
	"use strict";
	return Component.extend("utg.services.Twitter.Component", {
		metadata: {
			manifest: "json"
		},

		init: function() {
			// call the base component's init function and create the App view

			console.log("VVVVV");
		},

		getTweets: function() {
			return fetch("http://localhost:2266/");
		}
	});
});
