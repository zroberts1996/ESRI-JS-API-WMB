define([
  "dojo/ready",
  "dojo/json",

  "dojo/_base/array",
  "dojo/_base/Color",
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/kernel",

  "dojo/dom",
  "dojo/dom-geometry",
  "dojo/dom-attr",
  "dojo/dom-class",
  "dojo/dom-construct",
  "dojo/dom-style",

  "dojo/on",
  "dojo/Deferred",
  "dojo/promise/all",
  "dojo/query"], 
  
  function (ready, JSON,
    array, Color, declare, lang, kernel,
    dom, domGeometry, domAttr, domClass,
    domConstruct, domStyle,
    on, Deferred, all, query) {

    return declare("test", null, {
      constructor: function() {
        config: {}
      },
      
      startup: function (config) {
        this._createUI()
      },

      _createUI: function () {
        console.log("test")
      }
    })
})