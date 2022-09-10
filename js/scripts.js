/*!
* Start Bootstrap - Bare v5.0.7 (https://startbootstrap.com/template/bare)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
 // 1. create the map object and the base layer.
 <>/*!
* Start Bootstrap - Bare v5.0.7 (https://startbootstrap.com/template/bare)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
    // This file is intentionally blank
    // Use this file to add JavaScript to your project
    // 1. create the map object and the base layer.
    <script src="https://unpkg.com/leaflet@1.7.0/dist/leaflet.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-ajax/2.1.0/leaflet.ajax.min.js"></script><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/chroma-js/1.3.4/chroma.min.js"></script></>

 var map = L.map('map').setView([35.65132238123676, -79.3470969750162], 7.4); //latlong coordinates centered over US
 L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(map);

 // classes in legend
 var grades = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];


 // color ramp
 var colors = chroma.scale('RdYlBu').colors(grades.length);

// get the color based on the class of the input value
function getColor(d) {
       for (var i = 0; i < grades.length - 1; i++) {
       if ( d >= grades[i] && d <= grades[i+1] ) return colors[i];
       }
       if (d >= grades[grades.length - 1]) return colors[grades.length];
 }


//assign radio button symbology
//current work happening here  


// current symbology
 function style(feature) {
 return {
       weight: 2,
       opacity: 1,
       color: 'grey',
       dashArray: '3',
       fillOpacity: 0.7,
       fillColor: getColor(feature.properties.worried)
 };
 }

//add gejson
 var geojson = null;

 var info = L.control();
 info.onAdd = function (map) {
     this._div = L.DomUtil.create('div', 'info'); 
     this.update();
     return this._div;
 };

 // update as tooltip
 info.update = function (props) {
       this._div.innerHTML = '<h4>US Percentage of People Worried about Climate Change </h4>' +  (props ?
       '<b>' + props.CO_NAME + '</b><br />' + props.worried + '%'
       : 'Hover over a County');
 };

 info.addTo(map);





 //highlight a feature when the mouse hovers on it.

 function highlightFeature(e) {
 // e = current event
             var layer = e.target;
             //the target captures the object that the event associates with
             layer.setStyle({
             weight: 2,
             opacity: 0.8,
             color: 'Red',
             fillColor: 'red',
             fillOpacity: 0.5
             });
             layer.bringToFront();

             // select the update class, and update the contet with the input value.
             // 
             info.update(layer.feature.properties);
             }
             
//reset the hightlighted feature when the mouse is out of its region.

function resetHighlight(e) {
             geojson.resetStyle(e.target);
             info.update();  //this line will be called later
             }


// zoom to the highlighted feature when the mouse clicks it.

function zoomToFeature(e) {
             map.fitBounds(e.target.getBounds());
             }


function onEachFeature(feature, layer) {
             layer.on({
             mouseover: highlightFeature,
             click: zoomToFeature,
             mouseout: resetHighlight
             });
             }
             
             
//Add the counties GeoJSON layer to the map
 geojson = L.geoJson.ajax("assets/final.geojson", {
     style: style,
     onEachFeature: onEachFeature
 }).addTo(map);

// create the legend

 var labels = [];

 for (var i = 0; i < grades.length - 1; i++) {
     labels.push('<i style="background:' + colors[i] + '"></i> ' + grades[i] + ' - ' + grades[i + 1]);
 }

 labels.push('<i style="background:' + colors[grades.length - 1] + '"></i> ' + grades[grades.length - 1] + ' +');
 $(".legend").html(labels.join('<br>'));

 // 5. create the credits

 map.attributionControl.addAttribution('NC Opinion data &copy; <a href="https://climatecommunication.yale.edu/visualizations-data/ycom-us/">Yale Climate Opinion Data</a> | This map is made by Eliza Merritt');


