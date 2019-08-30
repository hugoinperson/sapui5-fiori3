sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/core/Component"], function(UIComponent, Component) {
	"use strict";
	return UIComponent.extend("utg.pages.Overview.Component", {
		metadata: {
			manifest: "json"
		},

		init: function() {
			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);

			this.getRouter().initialize();
		}
	});
});
