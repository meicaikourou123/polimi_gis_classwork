/**
 * This file is the main map script. The contents of this script gets executed sequentially
 * when it is imported.
 */

//Step 1: Add the OSM base map and the map object to the WebGIS
//Put here the OSM layer. 

let osm = new ol.layer.Tile({
    visible: true,
    source: new ol.source.OSM()
});
const initialZoom = 2;
const initialCoordinates = [0, 0];
let map = new ol.Map({
    target: document.getElementById('map'),
    layers: [osm],
    view: new ol.View({
        center: initialCoordinates,
        zoom: initialZoom
    })
});
//Put here the main map object.


//Step 2: The Colombia Boundary layer definition. This is a WMS layer
let colombiaBoundary = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: {'LAYERS': 'gis:COL_adm0'}
    })
});
map.addLayer(colombiaBoundary);

//Step 3: Add the other layers from the online geoserver
//The Colombia Departments layer definition. Here we use opacity to dim the layer
// const initialCoordinates = [-74, 4.6];
var map = new ol.Map({
    target: document.getElementById('map'),
    layers: [osm],
    view: new ol.View({
        center: ol.proj.fromLonLat( [-74, 4.6]),
        zoom: 5
    })
});

//The Colombian roads layer definition. This is a WMS layer.
var colombiaBoundary = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: {'LAYERS': 'gis:COL_adm0', 'STYLES': 'restricted'}
    })
});
map.addLayer(colombiaBoundary);

//The Colombian rivers layer definition. This is a WMS layer.
