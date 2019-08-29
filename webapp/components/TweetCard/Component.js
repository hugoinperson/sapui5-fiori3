sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"], function(UIComponent, JSONModel) {
	"use strict";

	var Component = UIComponent.extend("utg.components.TweetCard.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);

			// fetch card data
			const cardData = this.getManifest()["sap.card"]["data"]["json"];
			const cardModel = new JSONModel(cardData);
			this.setModel(cardModel);
		}
	});

	return Component;
});
