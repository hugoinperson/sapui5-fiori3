sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/Device", "utg/pages/App/utils/models"], function(UIComponent, Device, models) {
	"use strict";
	return UIComponent.extend("utg.pages.App.Component", {
		metadata: {
			manifest: "json"
		},

		init: function() {
			// set models
			this.setModel(models.createDeviceModel(), "device");
			this.setModel(models.createResourceModel(), "resource");
			this.setModel(models.createPageModel(), "page");

			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);

			// create the views based on the url/hash
			this.getRouter().initialize();
			this.subscribeEvent();
		},

		subscribeEvent: function() {
			var oEventBus = this.getEventBus();

			oEventBus.subscribe("app", "routing", this.goToPage, this);
		},

		goToPage: function(sChannel, sEvent, oPayload) {
			this.getRouter().navTo(oPayload.target);
		},

		getContentDensityClass: function() {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				// eslint-disable-next-line sap-no-proprietary-browser-api
				if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) {
					// apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});
});
