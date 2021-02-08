// @formatter:off
require([
  "esri/config",
  "esri/geometry/Point",
  "esri/Map",
  "esri/views/MapView",
  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/layers/MapImageLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/TileLayer",
  "esri/WebMap",
  "esri/widgets/Print",
  "esri/widgets/Sketch",
  "esri/core/watchUtils",
  
  "esri/widgets/Search",
  "esri/widgets/Measurement",
  "esri/widgets/Home",
  "esri/widgets/Locate",
  "esri/widgets/Fullscreen",
  "esri/widgets/Compass",
  "esri/widgets/Expand",
  "esri/widgets/BasemapGallery",
  "esri/widgets/FeatureTable",
  "esri/Basemap",
  "esri/widgets/FeatureForm",

  "dojo/ready",
  "dojo/parser",
  "dojo/on",
  "dojo/dom",
  "dojo/dom-class",
  "dojo/domReady!"],
function (config, Point, Map, MapView, QueryTask, Query, MapImageLayer, FeatureLayer, TileLayer, WebMap, Print, Sketch, watchUtils, Search,
          Measurement, Home, Locate, Fullscreen, Compass, Expand, BasemapGallery, FeatureTable, Basemap, FeatureForm,
          ready, parser, on, dom, domClass) {

// Wait until DOM is ready *and* all outstanding require() calls have been resolved
ready(function () {

  // Parse DOM nodes decorated with the data-dojo-type attribute
  parser.parse();

  const layerReserve = new FeatureLayer({
    url: "https://proxyinternet.nrcan.gc.ca/arcgis/rest/services/MB-NC/WMB_Query_CA/MapServer/3",
    outFields: ["*"],
    //visible: false, 
  });


  const webmap = new WebMap({
    portalItem: {
      id: "842085e0f72c4cb588ddfbfaf144d198",
      portal: {
        url: "https://nrabt6hwvasd001.nrn.nrcan.gc.ca/portal"
      }
    }
  });

  const tileLayer = new TileLayer({
    url: "https://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT3978/MapServer"
  });


  const lyrBusiness = new MapImageLayer({
    url: "https://proxyinternet.nrcan.gc.ca/arcgis/rest/services/MB-NC/NRCan_SGB_Business_LCC/MapServer"
  });

  const mapMain = new Map({
    basemap: "topo-vector",
    //ground: "world-elevation",
    layers: [lyrBusiness, layerReserve],
  });

  const view = new MapView({
    container: "clssWebMap",
    //map: webmap,
    map: mapMain,
    zoom: 3,
    center: [-100, 65],

  });

  //mapMain.add(lyrBusiness);


  view.on("pointer-move", function (event) {
    var screenPoint = {
      x: event.x,
      y: event.y
    };
  
    view.hitTest(screenPoint).then(function (response) {
      if (response.results.length) {
        var graphic = response.results.filter(function (result) {
        // check if the graphic belongs to the layer of interest
          return result.graphic.layer === layerReserve;

        });
      
        var test = graphic[0].graphic;
        console.log(test.attributes);
      }
      else {
        console.log('no')
      }
    });
  });

  view.when(function() {
    console.log("SGB Business layer loaded successfully");
    domClass.remove(document.body, "app-loading");
    var zoomDiv = document.getElementsByClassName('esri-zoom')[0]

    var zoomIn = zoomDiv.children[0];
    zoomIn.id = "zoomIn";
    var zoomOut = zoomDiv.children[1];
    zoomOut.id = "zoomOut";


    zoomDiv.id = "zoomGroup"
    domClass.add("zoomGroup", "zoomGroup")
  })






  /*.then(function() {
    return layerReserve.when();
  })
  .then(function(layer) {
    const renderer = layer.renderer.clone();
    //renderer.symbol.width = 4;
    //renderer.symbol.color = [128, 128, 128, 0.8];
    layer.renderer = renderer;

    return view.whenLayerView(layer);
  })

  .then(function(layerView) {
    view.on("pointer-move", eventHandler);
    //view.on("pointer-down", eventHandler);

    function eventHandler(event) {
      var screenPoint = {
        x: event.x,
        y: event.y
      };
    
      //view.hitTest(screenPoint).then(getGraphics)

      // only include graphics from hurricanesLayer in the hitTest
      const opts = {
        include: layerReserve
      }
      view.hitTest(event, opts).then(getGraphics);
    }

    let highlight, currentYear, currentName;

    function getGraphics(response) {

      if (response.results.length) {
        const graphic = response.results[0].graphic;

        const attributes = graphic.attributes;
        //const category = attributes.CAT;
        //const wind = attributes.WIND_KTS;
        //const name = attributes.NAME;
        //const year = attributes.YEAR;
        const id = attributes.OBJECTID;

        //if (highlight && (currentName !== name || currentYear !== year)) {
        //  highlight.remove();
        //  highlight = null;
        //  return;
        //}

        if (highlight) {
          return;
        }

        //document.getElementById("info").style.visibility = "visible";
        //document.getElementById("name").innerHTML = name;
        //document.getElementById("category").innerHTML = "Category " + category;
        //document.getElementById("wind").innerHTML = wind + " kts";

        // highlight all features belonging to the same hurricane as the feature
        // returned from the hitTest
        const query = layerView.createQuery();
        //query.where = "YEAR = " + year + " AND NAME = '" + name + "'";
        layerView.queryObjectIds(query).then(function(ids) {
          if (highlight) {
            highlight.remove()
          }
          highlight = layerView.highlight(ids);
          //currentYear = year;
          //currentName = name;
        });
      } else {
        // remove the highlight if no features are
        // returned from the hitTest
        if (highlight){
          highlight.remove();
          highlight = null;
        }
        //document.getElementById("info").style.visibility = "hidden";
      }
    }
  });*/






  //=============================================================//
  const featureForm = new FeatureForm({
    container: "formDiv",
    //feature: graphic,
    //formTemplate: template
  });
  //=============================================================//
  var featureLayerPlans = new FeatureLayer({
    url: "https://proxyinternet.nrcan.gc.ca/arcgis/rest/services/MB-NC/WMB_Query_CA/MapServer/0",
    popupTemplate: {
      title: '<a href="https://clss.nrcan-rncan.gc.ca/plan-fra.php?id={PLANNO}" target="_blank">View {PLANNO}</a>',
      overwriteActions: true
    }
  });
  var featureLayerReserve = new FeatureLayer({
    url: "https://proxyinternet.nrcan.gc.ca/arcgis/rest/services/MB-NC/WMB_Query_CA/MapServer/3",
    popupTemplate: {
      title: '{FRENCHNAME}',
      overwriteActions: true
    }
  });
  var featureLayerProjects = new FeatureLayer({
    url: "https://proxyinternet.nrcan.gc.ca/arcgis/rest/services/MB-NC/WMB_Query_CA/MapServer/9",
    popupTemplate: {
      title: '<a href="https://clss.nrcan-rncan.gc.ca/project-projet/detail?id={URL}" target="_blank">View {PROJECTNUMBER}</a>',
      overwriteActions: true
    }
  });

  // Search widget
  const sources = [
    {
      layer: featureLayerPlans,
      searchFields: ["PLANNO"],
      displayField: "PLANNO",
      exactMatch: false,
      outFields: ["GlobalID ", "PLANNO", "DATESURVEYED"],
      name: "Survey Plans",
      placeholder: "Survey Plans",
    },
    {
      layer: featureLayerProjects,
      searchFields: ["PROJECTNUMBER"],
      displayField: "PROJECTNUMBER",
      exactMatch: false,
      outFields: ["URL", "PROJECTNUMBER", "FIRSTNATION"],
      name: "Surveys in Progress",
      placeholder: "Surveys in Progress",
    },
    {
      layer: featureLayerReserve,
      searchFields: ["ENGLISHNAME"],
      displayField: "ENGLISHNAME",
      exactMatch: false,
      outFields: ["FRENCHNAME", "ENGLISHNAME", "PROVINCE"],
      name: "Indian Reserve",
      placeholder: "Indian Reserve"
    }
  ]

  var searchWidget = new Search({
    view: view,
    allPlaceholder: "CLSS search options",
    searchAllEnabled: false,
    activeSourceIndex: 0,
    includeDefaultSources: false,
    maxResults: 100,
    maxSuggestions: 100,
    autoSelect: true,
    locationEnabled: false,
    sources: sources,
    container: "panelMenu",
  });

  searchWidget.on("search-complete", function(event){
    console.log(searchWidget.searchTerm);
  });
      /* Distance and Area measurement tools
         ================================================================ 
      */
      const distanceButton = document.getElementById("distance");
      const areaButton = document.getElementById("area");
      const clearButton = document.getElementById("clear");
      const measurement = new Measurement();

      view.ui.add(measurement, "top-right"); // Popup box for distance, area and units results
      measurement.view = view;

      distanceButton.addEventListener("click", function () {
        distanceMeasurement();
      });
      
      areaButton.addEventListener("click", function () {
        areaMeasurement();
      });
      
      clearButton.addEventListener("click", function () {
        clearMeasurement();
      });

      function distanceMeasurement() {
        const type = view.type;
        measurement.activeTool = "distance";
        distanceButton.classList.add("active");
        areaButton.classList.remove("active");
      }
      function areaMeasurement() {
        const type = view.type;
        measurement.activeTool = "area";
        areaButton.classList.add("active");
        distanceButton.classList.remove("active");
      }
      function clearMeasurement() {
        const type = view.type;
        measurement.activeTool = null;
        areaButton.classList.remove("active");
        distanceButton.classList.remove("active");
      }
      /* =================================================================== */


      var homeBtn = new Home({
          view: view,
          container: "home"
      });

      var locateBtn = new Locate({
          view: view,
          container: "locate"
      });

      var fullscreen = new Fullscreen({
          view: view,
          container: "fullscreen"
      });

      var compass = new Compass({
          view: view,
          id: 'test'
      });
      
      //view.ui.add(homeBtn, "bottom-right");
      //view.ui.add(locateBtn, "bottom-right");
      //view.ui.add(fullscreen, "bottom-right");
      view.ui.add(compass, "top-left");
      //=========================================================//

      var basemapGallery = new BasemapGallery({
        view: view,
        container: document.createElement("div"),
        source: [Basemap.fromId("topo-vector"), Basemap.fromId("hybrid"), Basemap.fromId("gray")]
      });

      var bgExpand = new Expand({
        view: view,
        content: basemapGallery,
        container: "basemapGallery",
      });

      // close the expand whenever a basemap is selected
      basemapGallery.watch("activeBasemap", function () {
        var mobileSize =
          view.heightBreakpoint === "xsmall" ||
          view.widthBreakpoint === "xsmall";
        bgExpand.collapse();

        if (mobileSize) {
          bgExpand.collapse();
        }
      });
      basemapGallery.when(function() {
        var expandPanel=document.getElementsByClassName('esri-expand__panel')[0]
        expandPanel.firstElementChild.style.backgroundColor='transparent'
      })

      //=========================================================//


      //=========================================================//
      // Créer un carte pour chacune des recherches et afficher le featuretable quand on clique sur le bouton, pourrait filtrer les résltats
      view.when(function () {
        var featureLayerPlans = new FeatureLayer({
          url: "https://proxyinternet.nrcan.gc.ca/arcgis/rest/services/MB-NC/WMB_Query_CA/MapServer/0",
          definitionExpression: "PLANNO like '%6742%'",
        });


        const featureTable = new FeatureTable({
          view: view, 
          layer: featureLayerPlans,
          fieldConfigs: [
            {
              name: "PROVINCE",
              label: "PROVINCE",
              direction: "asc"
            },
            {
              name: "PLANNO",
              label: "PLANNO"
            },
            {
              name: "PLANNO",
              label: "PLANNO"
            },

          ],
          //container: document.getElementById("tableDiv"),
        })
        featureTable.visibleElements = {
          selectionColumn: false
        };

        var print = new Print({
          view: view,
          printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        });
        view.ui.add(print, "top-right");

      })

      

      //=========================================================//

      var queryTask = new QueryTask({
        url: "https://proxyinternet.nrcan.gc.ca/arcgis/rest/services/MB-NC/NRCan_SGB_Provinces/MapServer/0"
      });

      var query = new Query();
      query.returnGeometry = false;
      query.outFields = ["CODE", "NAME_FR"];

      watchUtils.whenTrue(view, "stationary", function () {
        if (view.center) {
          query.geometry = {x: view.center.longitude, y: view.center.latitude, "type": "point"}
          queryTask.execute(query).then(function(results){
            var provinceOnScreen = results.features[0].attributes.NAME_FR;
            dom.byId("clssWebMap").title = provinceOnScreen;
            console.log(provinceOnScreen);
          });
        }
      });

      /* ==================================================================== */
      var coordsWidget = document.createElement("div");
      coordsWidget.id = "coordsWidget";
      coordsWidget.className = "esri-widget esri-component";
      coordsWidget.style.padding = "7px 15px 5px";

      view.ui.add(coordsWidget, "top-right");

      function showCoordinates(pt) {
        var coords = "Lat: " + pt.latitude.toFixed(2) +  " Lon: " + pt.longitude.toFixed(2) + " | Scale 1:" +  Math.round(view.scale * 1) / 1 + " | Zoom " + view.zoom;
        coordsWidget.innerHTML = coords;
      }
      view.watch("stationary", function (isStationary) {
          showCoordinates(view.center);
      });
        
      view.on("pointer-move", function (evt) {
          showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
      });

      /* ==================================================================== */

      const sketch = new Sketch({
        layer: lyrBusiness,
        view: view,
        // graphic will be selected as soon as it is created
        creationMode: "update"
      });
      view.ui.add(sketch, "top-right");

      /* ==================================================================== */






  });
})



function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}