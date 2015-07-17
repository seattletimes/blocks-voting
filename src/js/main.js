//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var data = require("./blocks2.geo.json");
var parcels = require("./test.geo.json");
var $ = require('jquery');

//ICH code for popup template if needed----------
var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
};


var geojson;

 map.scrollWheelZoom.disable();

 function getColor(d) {
    return d > 12.48   ? '#0F3F18' :
           d > 6.14   ? '#4C855F' :
           d > 2.36   ? '#A7CEB4' :
                      '#DDF4E9';
}

 function hhColor(d) {
    return d > 160000   ? '#333333' :
           d > 110000   ? '#333333' :
           // d > 70000   ? '#9152D3' :
                      '#transparent';
}

 function nhwColor(d) {
    return d > 0.9   ? '#333333' :
           // d > 0.801   ? '#333333' :
           // d > 70000   ? '#9152D3' :
                      '#transparent';
}


function style(feature) {
    return {
        fillColor: getColor(feature.properties.Dollars_pe),
        weight: 0.5,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

function hhstyle(feature) {
    return {
        fillColor: "transparent",
        weight: 2,
        opacity: 1,
        color: hhColor(feature.properties.Med_HH_Inc),
        fillOpacity: 0.7
    };
}

function nhwstyle(feature) {
    return {
        fillColor: "transparent",
        weight: 2,
        opacity: 1,
        color: nhwColor(feature.properties.Pct_White),
        fillOpacity: 0.7
    };
}

var base = L.geoJson(data, {style: style, onEachFeature:onEachFeature}).addTo(map);
var layerhh = L.geoJson(data, {style: hhstyle, onEachFeature:onEachFeature});
var layernhw = L.geoJson(data, {style: nhwstyle, onEachFeature:onEachFeature});

var parceldata = L.geoJson(parcels, {
   style: function (feature) {
        return {color: 'black', fillColor: "black", weight: 0.5, fillOpacity: 1};
    },
});

$(".type-button").click(function() {

  $("#menu a.selected").removeClass("selected");
  $(this).addClass("selected");
  var type = $(this).data("type");
  document.body.className = type;
 

  if (type =="view_lots") {
    parceldata.addTo(map);
    map.removeLayer(layerhh);
    map.removeLayer(layernhw);
  }

   if (type =="med_hh") {
    layerhh.addTo(map);
    map.removeLayer(parceldata);
    map.removeLayer(layernhw);
  }

  if (type =="nhw_pop") {
    layernhw.addTo(map);
    map.removeLayer(parceldata);
    map.removeLayer(layerhh);
  }

});

window.toggle = false;

$( ".name-button" ).on( "click", function() {

   if(!toggle) {
    map.removeLayer(base);
  } else {
    map.addLayer(base);
  }
  toggle = !toggle;
 

 // base.toggle(this.checked);
 
});

