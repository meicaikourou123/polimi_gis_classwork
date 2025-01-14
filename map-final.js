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
//Put here the main map object.
const initialZoom = 5;
const initialCoordinates = [-74, 4.6];
let map = new ol.Map({
    target: document.getElementById('map'),
    layers: [osm],
    view: new ol.View({
        center: ol.proj.fromLonLat(initialCoordinates), //We have to convert from EPSG:4326 to EPSG:3857 because openlayers uses it by default!
        zoom: initialZoom
    })
});

//Step 2: The Colombia Boundary layer definition. This is a WMS layer
var colombiaBoundary = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gis:COL_adm0', 'STYLES': 'restricted' }
    }),
});
map.addLayer(colombiaBoundary);

//Step 3: Add the other layers from the online geoserver
//The Colombia Departments layer definition. Here we use opacity to dim the layer
var colombiaDepartments = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gis:COL_adm1' }
    }),
    opacity: 0.5
});
map.addLayer(colombiaDepartments);

//The Colombian roads layer definition. This is a WMS layer.
var colombiaRoads = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gis:COL_roads' }
    }),
    visible: false //This layer will not be initially visible, but still will be added to the map!
});
map.addLayer(colombiaRoads);

//The Colombian rivers layer definition. This is a WMS layer.
var colombiaRivers = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gis:COL_rivers' }
    }),
    minResolution: 1000, //Conditional rendering. It shows only when zoomed in, and disappears when zoomed out.
    maxResolution: 5000
});
map.addLayer(colombiaRivers);