//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var data = require("./blocks2.geo.json");
var $ = require('jquery');

//ICH code for popup template if needed----------
var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
};

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

var base = L.geoJson(data, {style: style, onEachFeature:onEachFeature}).addTo(map);

var layer1 = L.geoJson(data, {style: hhstyle, onEachFeature:onEachFeature}).addTo(map);
