sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/Component"], function(Controller, Component) {
	"use strict";

	return Controller.extend("utg.pages.App.controller.Main", {
		onInit: function() {
			console.log("KKKKKK");

			Component.create({
				id: "twitterSrv",
				name: "utg.services.Twitter",
				manifestFirst: true,
				async: true
			}).then(
				function(oComponent) {
					console.log("AHhhhhh", oComponent);

					// var instance = Component.get("twitterSrv");
					debugger;
				}.bind(this)
			);
		}
	});
});
