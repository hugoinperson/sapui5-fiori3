sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"], function(Controller, JSONModel) {
	"use strict";

	var ComponentCardController = Controller.extend("utg.ui5.fiori3.componentCard.Main", {
		onInit: function() {
			var mapImageUrl = sap.ui.require.toUrl("utg/ui5/fiori3/componentCard/asset/map.png");

			this.getView().setModel(new JSONModel({ mapImageUrl: mapImageUrl }));
		}
	});

	return ComponentCardController;
});
