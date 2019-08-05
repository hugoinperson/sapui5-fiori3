sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";

	return Controller.extend("utg.pages.App.controller.Index", {
		onInit: function() {
			this._compEventBus = this.getOwnerComponent().getEventBus();

			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},

		onGoHome: function() {
			this._compEventBus.publish("app", "routing", { target: "main" });
		},

		onSwitch: function(oEvent) {
			const key = oEvent.getParameter("item").getKey();

			switch (key) {
				case "twitter":
					this._compEventBus.publish("app", "routing", { target: "twitter" });
					break;
				case "linkedin":
					this._compEventBus.publish("app", "routing", { target: "linkedin" });
					break;
				case "facebook":
					this._compEventBus.publish("app", "routing", { target: "facebook" });
					break;
				default:
					this._compEventBus.publish("app", "routing", { target: "main" });
					break;
			}
			console.log("PPPPPP", oEvent);
		}
	});
});
