sap.ui.define(["sap/ui/core/XMLComposite"], function(XMLComposite) {
	"use strict";

	return XMLComposite.extend("utg.controls.HelloWorldBase", {
		metadata: {
			properties: {
				text: { type: "string", defaultValue: "Hello World!" }
			}
		}
	});
});
