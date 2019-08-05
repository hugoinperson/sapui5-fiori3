sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"], function(
	Controller,
	JSONModel,
	Filter,
	FilterOperator
) {
	"use strict";

	return Controller.extend("utg.controller.Main", {
		onInit: function() {
			this.aSearchFilters = [];
			this.aTabFilters = [];

			const cardManifests = new JSONModel("../model/cardManifest.json");
			const componentCardUrl = sap.ui.require.toUrl("utg/componentCard/manifest.json");

			this.getView().setModel(cardManifests, "manifests");
			this.getView().setModel(
				new JSONModel({
					componentCardUrl: componentCardUrl
				})
			);

			// 	"@openui5/sap.f": "^1.68.1",
			// "@openui5/sap.m": "^1.68.1",
			// "@openui5/sap.tnt": "^1.68.1",
			// "@openui5/sap.ui.commons": "^1.68.1",
			// "@openui5/sap.ui.core": "^1.68.1",
			// "@openui5/sap.ui.integration": "^1.68.1",
			// "@openui5/themelib_sap_fiori_3": "^1.68.1"

			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},

		/**
		 * Adds a new todo item to the bottom of the list.
		 */
		addTodo: function() {
			var oModel = this.getView().getModel();
			var aTodos = oModel.getProperty("/todos").map(function(oTodo) {
				return Object.assign({}, oTodo);
			});

			aTodos.push({
				title: oModel.getProperty("/newTodo"),
				completed: false
			});

			oModel.setProperty("/todos", aTodos);
			oModel.setProperty("/newTodo", "");
		},

		/**
		 * Removes all completed items from the todo list.
		 */
		clearCompleted: function() {
			var oModel = this.getView().getModel();
			var aTodos = oModel.getProperty("/todos").map(function(oTodo) {
				return Object.assign({}, oTodo);
			});

			var i = aTodos.length;
			while (i--) {
				var oTodo = aTodos[i];
				if (oTodo.completed) {
					aTodos.splice(i, 1);
				}
			}

			oModel.setProperty("/todos", aTodos);
		},

		/**
		 * Updates the number of items not yet completed
		 */
		updateItemsLeftCount: function() {
			var oModel = this.getView().getModel();
			var aTodos = oModel.getProperty("/todos") || [];

			var iItemsLeft = aTodos.filter(function(oTodo) {
				return oTodo.completed !== true;
			}).length;

			oModel.setProperty("/itemsLeftCount", iItemsLeft);
		},

		/**
		 * Trigger search for specific items. The removal of items is disable as long as the search is used.
		 * @param {sap.ui.base.Event} oEvent Input changed event
		 */
		onSearch: function(oEvent) {
			var oModel = this.getView().getModel();

			// First reset current filters
			this.aSearchFilters = [];

			// add filter for search
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				oModel.setProperty("/itemsRemovable", false);
				var filter = new Filter("title", FilterOperator.Contains, sQuery);
				this.aSearchFilters.push(filter);
			} else {
				oModel.setProperty("/itemsRemovable", true);
			}

			this._applyListFilters();
		},

		onFilter: function(oEvent) {
			// First reset current filters
			this.aTabFilters = [];

			// add filter for search
			var sFilterKey = oEvent.getParameter("item").getKey();

			// eslint-disable-line default-case
			switch (sFilterKey) {
				case "active":
					this.aTabFilters.push(new Filter("completed", FilterOperator.EQ, false));
					break;
				case "completed":
					this.aTabFilters.push(new Filter("completed", FilterOperator.EQ, true));
					break;
				case "all":
				default:
				// Don't use any filter
			}

			this._applyListFilters();
		},

		_applyListFilters: function() {
			var oList = this.byId("todoList");
			var oBinding = oList.getBinding("items");

			oBinding.filter(this.aSearchFilters.concat(this.aTabFilters), "todos");
		}
	});
});
