(function(){/*
 OverlappingMarkerSpiderfier
https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
Copyright (c) 2011 - 2012 George MacKerron
Released under the MIT licence: http://opensource.org/licenses/mit-license
Note: The Leaflet maps API must be included *before* this code
*/
(function(){var q={}.hasOwnProperty,r=[].slice;null!=this.L&&(this.OverlappingMarkerSpiderfier=function(){function n(c,b){var a,e,g,f,d=this;this.map=c;null==b&&(b={});for(a in b)q.call(b,a)&&(e=b[a],this[a]=e);this.initMarkerArrays();this.listeners={};f=["click","zoomend"];e=0;for(g=f.length;e<g;e++)a=f[e],this.map.addEventListener(a,function(){return d.unspiderfy()})}var d,k;d=n.prototype;d.VERSION="0.2.6";k=2*Math.PI;d.keepSpiderfied=!1;d.nearbyDistance=20;d.circleSpiralSwitchover=9;d.circleFootSeparation=
25;d.circleStartAngle=k/12;d.spiralFootSeparation=28;d.spiralLengthStart=11;d.spiralLengthFactor=5;d.legWeight=1.5;d.legColors={usual:"#222",highlighted:"#f00"};d.initMarkerArrays=function(){this.markers=[];return this.markerListeners=[]};d.addMarker=function(c){var b,a=this;if(null!=c._oms)return this;c._oms=!0;b=function(){return a.spiderListener(c)};c.addEventListener("click",b);this.markerListeners.push(b);this.markers.push(c);return this};d.getMarkers=function(){return this.markers.slice(0)};
d.removeMarker=function(c){var b,a;null!=c._omsData&&this.unspiderfy();b=this.arrIndexOf(this.markers,c);if(0>b)return this;a=this.markerListeners.splice(b,1)[0];c.removeEventListener("click",a);delete c._oms;this.markers.splice(b,1);return this};d.clearMarkers=function(){var c,b,a,e,g;this.unspiderfy();g=this.markers;c=a=0;for(e=g.length;a<e;c=++a)b=g[c],c=this.markerListeners[c],b.removeEventListener("click",c),delete b._oms;this.initMarkerArrays();return this};d.addListener=function(c,b){var a,
e;(null!=(e=(a=this.listeners)[c])?e:a[c]=[]).push(b);return this};d.removeListener=function(c,b){var a;a=this.arrIndexOf(this.listeners[c],b);0>a||this.listeners[c].splice(a,1);return this};d.clearListeners=function(c){this.listeners[c]=[];return this};d.trigger=function(){var c,b,a,e,g,f;b=arguments[0];c=2<=arguments.length?r.call(arguments,1):[];b=null!=(a=this.listeners[b])?a:[];f=[];e=0;for(g=b.length;e<g;e++)a=b[e],f.push(a.apply(null,c));return f};d.generatePtsCircle=function(c,b){var a,e,
g,f,d;g=this.circleFootSeparation*(2+c)/k;e=k/c;d=[];for(a=f=0;0<=c?f<c:f>c;a=0<=c?++f:--f)a=this.circleStartAngle+a*e,d.push(new L.Point(b.x+g*Math.cos(a),b.y+g*Math.sin(a)));return d};d.generatePtsSpiral=function(c,b){var a,e,g,f,d;g=this.spiralLengthStart;a=0;d=[];for(e=f=0;0<=c?f<c:f>c;e=0<=c?++f:--f)a+=this.spiralFootSeparation/g+5E-4*e,e=new L.Point(b.x+g*Math.cos(a),b.y+g*Math.sin(a)),g+=k*this.spiralLengthFactor/a,d.push(e);return d};d.spiderListener=function(c){var b,a,e,g,f,d,h,k,l;(b=null!=
c._omsData)&&this.keepSpiderfied||this.unspiderfy();if(b)return this.trigger("click",c);g=[];f=[];d=this.nearbyDistance*this.nearbyDistance;e=this.map.latLngToLayerPoint(c.getLatLng());l=this.markers;h=0;for(k=l.length;h<k;h++)b=l[h],this.map.hasLayer(b)&&(a=this.map.latLngToLayerPoint(b.getLatLng()),this.ptDistanceSq(a,e)<d?g.push({marker:b,markerPt:a}):f.push(b));return 1===g.length?this.trigger("click",c):this.spiderfy(g,f)};d.makeHighlightListeners=function(c){var b=this;return{highlight:function(){return c._omsData.leg.setStyle({color:b.legColors.highlighted})},
unhighlight:function(){return c._omsData.leg.setStyle({color:b.legColors.usual})}}};d.spiderfy=function(c,b){var a,e,g,d,p,h,k,l,n,m;this.spiderfying=!0;m=c.length;a=this.ptAverage(function(){var a,b,e;e=[];a=0;for(b=c.length;a<b;a++)k=c[a],e.push(k.markerPt);return e}());d=m>=this.circleSpiralSwitchover?this.generatePtsSpiral(m,a).reverse():this.generatePtsCircle(m,a);a=function(){var a,b,k,m=this;k=[];a=0;for(b=d.length;a<b;a++)g=d[a],e=this.map.layerPointToLatLng(g),n=this.minExtract(c,function(a){return m.ptDistanceSq(a.markerPt,
g)}),h=n.marker,p=new L.Polyline([h.getLatLng(),e],{color:this.legColors.usual,weight:this.legWeight,clickable:!1}),this.map.addLayer(p),h._omsData={usualPosition:h.getLatLng(),leg:p},this.legColors.highlighted!==this.legColors.usual&&(l=this.makeHighlightListeners(h),h._omsData.highlightListeners=l,h.addEventListener("mouseover",l.highlight),h.addEventListener("mouseout",l.unhighlight)),h.setLatLng(e),h.setZIndexOffset(1E6),k.push(h);return k}.call(this);delete this.spiderfying;this.spiderfied=!0;
return this.trigger("spiderfy",a,b)};d.unspiderfy=function(c){var b,a,e,d,f,k,h;null==c&&(c=null);if(null==this.spiderfied)return this;this.unspiderfying=!0;d=[];e=[];h=this.markers;f=0;for(k=h.length;f<k;f++)b=h[f],null!=b._omsData?(this.map.removeLayer(b._omsData.leg),b!==c&&b.setLatLng(b._omsData.usualPosition),b.setZIndexOffset(0),a=b._omsData.highlightListeners,null!=a&&(b.removeEventListener("mouseover",a.highlight),b.removeEventListener("mouseout",a.unhighlight)),delete b._omsData,d.push(b)):
e.push(b);delete this.unspiderfying;delete this.spiderfied;this.trigger("unspiderfy",d,e);return this};d.ptDistanceSq=function(c,b){var a,e;a=c.x-b.x;e=c.y-b.y;return a*a+e*e};d.ptAverage=function(c){var b,a,e,d,f;d=a=e=0;for(f=c.length;d<f;d++)b=c[d],a+=b.x,e+=b.y;c=c.length;return new L.Point(a/c,e/c)};d.minExtract=function(c,b){var a,d,g,f,k,h;g=k=0;for(h=c.length;k<h;g=++k)if(f=c[g],f=b(f),"undefined"===typeof a||null===a||f<d)d=f,a=g;return c.splice(a,1)[0]};d.arrIndexOf=function(c,b){var a,
d,g,f;if(null!=c.indexOf)return c.indexOf(b);a=g=0;for(f=c.length;g<f;a=++g)if(d=c[a],d===b)return a;return-1};return n}())}).call(this);}).call(this);
/* Mon 14 Oct 2013 10:54:59 BST */

// init foundation elements
$(document).foundation();

// init Slick slideshow element
var $slideshow = $('#slideshow-content').slick({
  appendArrows: '#slideshow',
  autoplay: false,
  //dots: true,
  //appendDots: '#slideshow',
  infinite: false,
  adaptiveHeight: true
}).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
  //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
  var i = (currentSlide ? currentSlide : 0) + 1;
  $('#slideshow-counter').text(i + '/' + slick.slideCount);  
});

// workaround for redraw slick slideshow after modal window appears (before that there is no height attribute)
$(document).on('opened.fndtn.reveal', function () {
  $slideshow.slick("slickGoTo", 0, true);
});

// add a map, currently form MapBox account registered with online.communications@undp.org email
var map = L.map('map').setView([0, 0], 3);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: '© <a href="https://www.mapbox.com/map-feedback/" target="_blank">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a> | The boundaries and names shown and the designations used on this map do not imply official endorsement or acceptance by the United Nations.',
  maxZoom: 10,
  id: 'undporg.cig9rbehw004tuekrnt5bf253',
  accessToken: 'pk.eyJ1IjoidW5kcG9yZyIsImEiOiJjaWc5cmJmcWwwMDRxdjJrcjgxbnczaThvIn0.J-5uk4LED0EgvK1raqCJmg'
}).addTo(map);

// init Spiderfiers
var oms = new OverlappingMarkerSpiderfier(map, {
  keepSpiderfied: true,
  nearbyDistance: 8,
  legColors: {
    usual: 'transparent',
    highlighted: 'transparent'
  }
});
var popup = new L.Popup({
  maxHeight: 400
});
oms.addListener('click', function(marker) {
  popup.setContent(marker.desc);
  popup.setLatLng(marker.getLatLng());
  map.openPopup(popup);
}).addListener('spiderfy', function(markers) {
  map.closePopup();
});

// create Star icon
var starIcon = L.icon({
  iconUrl: 'img/star_16.png',
  iconRetinaUrl: 'img/star_16@2.png',
  iconSize: [16, 16],
  iconAnchor: [8,0]
});

var centroids = {};
// load countries
$.getJSON('centroids.json').done(function (data) {

  var widthMax = data.reduce(function (max, arr) {
    return max >= arr[1] ? max : arr[1];
  }, -Infinity);
  var widthMin = data.reduce(function (min, arr) {
    return arr[1] < min ? arr[1] : min;
  }, Infinity);

  var radius = 0,
    markers = [];
  //Marker radius should fall between 5 and 50 pixels
  var radius = Math.ceil(widthMax / 50);
  for (var i = 0; i < data.length; i++) {
    // populate centroids reference array
    centroids[data[i][0]] = [data[i][2], data[i][3]];
    // add circle markers
    markers.push(
      new L.circleMarker(centroids[data[i][0]], {
        weight: 2,
        color: '#006600',
        data: data[i]
      })
      .setRadius(Math.round(data[i][1] / radius) + 5)
      .on('click', showmodal)
    );
  }
  L.layerGroup(markers).addTo(map);

  // load winners, do it only after centroids are loaded
  $.getJSON('winners.json').done(function (winners) {
    for (var i=0; i<winners.length; i++) {
      var winner = new L.Marker(centroids[winners[i][2]], {
        icon: starIcon,
        riseOnHover: true,
        title: 'Winner!'
      });
      winner.desc = '<div class="winner-popup"><div class="winner-popup-title"><h5>' + winners[i][0] + ', ' + winners[i][2] + '</h5><b><a href="http://www.equatorinitiative.org/index.php?option=com_content&view=article&id=924&Itemid=1173&lang=en" target="_blank">2015 Equator Prize winner</a></b></div><blockquote>' + winners[i][4] + '</blockquote></div>';
      map.addLayer(winner);
      oms.addMarker(winner);
    }
  });
});

// display modal window with slideshow of quotes. Quotes located in Fusion table and cached locally for better performance
var loaded = {};
function showmodal(e) {
  var country = e.target.options.data[0];
  map.closePopup();
  // get quotes if not cached already
  if (typeof loaded[country] == 'undefined') {
    var apiUrl = 'https://www.googleapis.com/fusiontables/v2/query'; // Google Fusion Table API endpoint
    var datasource = '1MR__Aal85XmQchYSpakuA3Ol3tyO4Py4BMoHkkWh'; // ID of the Fusion Table we are pulling data from
    var sql = 'SELECT answer, organization FROM ' + datasource + ' WHERE country = \'' + country + '\' AND answer NOT EQUAL TO \'\'';
    var key = 'AIzaSyCu3LqZDIDAj5f7uWzIJaI0BESvOxuAuUg'; // Google API key used for requests attribution
    $.getJSON(apiUrl, {
      sql: sql,
      key: key
    }).done(function (data) {
      shuffle(data.rows);
      loaded[country] = data.rows;
      showSlides(country);
    });
  } else {
    showSlides(country);
  }
}

// populate slideshow
function showSlides(country) {
  for (var i = 0; i < loaded[country].length; i++) {
    $slideshow.slick('slickAdd', '<div data-country="' + country + '"><blockquote>' + loaded[country][i][0] + '</blockquote><em>' + loaded[country][i][1] + '</em></div>');
  }
  $('#slideshow-title').text('Voices of ' + country);
  $slideshow.slick('slickFilter', '[data-country="' + country + '"]');
  $('#slideshow').foundation('reveal', 'open');
}

//Randomize array - from http://stackoverflow.com/a/2450976/537584
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}