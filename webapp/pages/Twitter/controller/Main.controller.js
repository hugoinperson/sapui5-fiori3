sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/Component"], function(Controller, Component) {
	"use strict";

	return Controller.extend("utg.pages.Twitter.controller.Main", {
		onInit: function() {
			const twitterService = Component.get("twitterSrv");
			console.log("twitter service ... ", twitterService);
		}
	});
});
