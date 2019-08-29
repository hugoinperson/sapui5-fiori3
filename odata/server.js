const express = require("express");
const cds = require("@sap/cds");
const cors = require("cors");
const fioriPreview = require("@sap/cds/lib/utils/fiori-preview");

/** that's our pretty standard express server.js setup... */
const serve = (module.exports = async (models, o) => {
	const app = express();

	app.use(
		cors({
			exposedHeaders: "OData-Version"
		})
	);

	// serve static resources
	app.use(express.static(cds.env.folders.app)); //> defaults to ./app
	app.get("/", (_, res) => res.send(index.html)); //> if none in ./app
	app.get("/\\$fiori-preview", fioriPreview.middleware);
	app.use(logger);

	// connect to primary database if configured
	await cds.connect(cds.env.requires.db || false);

	// construct and mount modeled services
	await cds.serve(models, o).in(app);

	// start http server
	const { PORT = 4004 } = process.env;
	return app.listen(PORT);
});

/** generic index.html --> served unless you have one in app folder */
const index = {
	get html() {
		if (this._html) return this._html;

		const { isfile } = cds.utils,
			{ app } = cds.env.folders,
			{ join } = require("path");
		const _has_fiori_html = isfile(join(app, "fiori.html"));

		return (this._html = `
    <html>
        <head>
            <style>
                body { margin: 44px; font-family: Avenir Next, sans-serif }
                h1 { }
                .small { font-size: 10px }
            </style>
        </head>
        <body>
            <h1> Welcome to <i>cds.services</i> </h1>
            <p> These are the paths currently served ...
            ${_has_fiori_html ? `<h3><a href="/fiori.html">/fiori.html</a></h3>` : ""}
            ${cds.service.providers
							.map(
								service => `
                <h3>
                    <a href="${service.path}">${service.path}</a> /
                    <a href="${service.path}/$metadata">$metadata</a>
                </h3>
                <ul>${_exposedEntities4(service)
									.map(
										e => `
                    <li>
                        <a href="${service.path}/${e}">${e}</a>
                        <a class="small" href="/$fiori-preview?${fioriPreview.buildQueryParams(service.name, e)}"
                           title="Fiori elements list page"> &hellip;in Fiori</a>
                    </li>`
									)
									.join("")}
                </ul>
            `
							)
							.join("")}
        </body>
    </html>
    `);

		function _exposedEntities4(service) {
			const exposed = [],
				{ entities } = service;
			for (let e in entities) {
				if (entities[e]["@cds.autoexposed"] && !entities[e]["@cds.autoexpose"]) continue;
				if (e.endsWith("_texts")) continue;
				if (e.endsWith("DraftAdministrativeData")) continue;
				exposed.push(e);
			}
			return exposed;
		}
	}
};

/** simple logger --> you might want to use morgan instead */
const logger = (req, _, next) => {
	console.log(req.method, req.url);
	next(); // eslint-disable-line
};

if (!module.parent) serve("all");
