sap.ui.define(["sap/ui/core/XMLComposite"], function(XMLComposite) {
	"use strict";

	return XMLComposite.extend("utg.controls.HelloWorldCustom", {
		metadata: {
			properties: {
				text: { type: "string", defaultValue: "Hello World!" }
			},
			aggregations: {
				options: {
					type: "sap.ui.core.Control",
					multiple: true,
					forwarding: {
						idSuffix: "--myInternalBox",
						aggregation: "items"
					}
				}
			}
		}
	});
});
