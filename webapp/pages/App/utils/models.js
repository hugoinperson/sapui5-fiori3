sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/Device"], function(JSONModel, Device) {
	"use strict";

	return {
		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createResourceModel: function() {
			var oModel = new JSONModel({
				logoUrl: sap.ui.require.toUrl("utg/pages/App/asset/logo.png")
			});
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createPageModel: function() {
			var oModel = new JSONModel({
				date: new Date().toLocaleString()
			});
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		}
	};
});
