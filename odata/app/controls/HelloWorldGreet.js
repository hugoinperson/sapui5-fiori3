sap.ui.define(["sap/ui/core/XMLComposite"], function(XMLComposite) {
	"use strict";

	return XMLComposite.extend("utg.controls.HelloWorldGreet", {
		metadata: {
			properties: {
				text: { type: "string", defaultValue: "Hello World!" }
			},
			aggregations: {
				options: {
					type: "sap.ui.core.Control",
					multiple: true
				}
			}
		},
		onOptionPressed: function(oEvent) {
			const target = oEvent.getSource().getText();
			alert(`Hello ${target}! 👋🏻`);
		}
	});
});
