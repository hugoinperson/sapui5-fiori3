sap.ui.define(["sap/ui/test/Opa5"], function(Opa5) {
	"use strict";

	return Opa5.extend("utg.ui5.fiori3.test.integration.arrangements.Startup", {
		iStartMyApp: function() {
			this.iStartMyUIComponent({
				componentConfig: {
					name: "utg.ui5.fiori3",
					async: true,
					manifest: true
				}
			});
		}
	});
});
