sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/Component", "sap/ui/model/json/JSONModel"], function(
	Controller,
	Component,
	JSONModel
) {
	"use strict";

	return Controller.extend("utg.pages.Overview.controller.Main", {
		onInit: function() {
			this._cardManifests = new JSONModel(sap.ui.require.toUrl("utg/pages/Overview/model/cards.json"));

			this.getView().setModel(this._cardManifests, "manifests");
		}
	});
});
