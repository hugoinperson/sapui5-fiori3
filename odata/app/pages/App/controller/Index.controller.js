sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";

	return Controller.extend("utg.pages.App.controller.Index", {
		onInit: function() {
			this._iconTabBar = this.getView().byId("utgIconTabBar");
			this._compRouter = this.getOwnerComponent().getRouter();
			this._compEventBus = this.getOwnerComponent().getEventBus();

			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

			// Startup functions
			this._subscribeEvents();
		},

		_subscribeEvents: function() {
			this._compRouter.attachRouteMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function(oEvent) {
			const route = oEvent.getParameter("name");
			this._iconTabBar.setSelectedKey(route);
		},

		onGoHome: function() {
			this._compEventBus.publish("app", "routing", { target: "overview" });
		},

		onSelectPage: function(oEvent) {
			const key = oEvent.getParameter("key");
			this._compEventBus.publish("app", "routing", { target: key });
		}
	});
});
