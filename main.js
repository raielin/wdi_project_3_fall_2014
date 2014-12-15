var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var infoWindow;

function initialize() {

  var styles = [
    {
      "featureType": "landscape.man_made",
      "stylers": [
        { "saturation": 17 },
        { "lightness": 47 },
        { "hue": "#f600ff" }
      ]
    },{
      "featureType": "landscape.natural.landcover",
      "stylers": [
        { "saturation": 29 },
        { "lightness": 30 },
        { "color": "#e6f0f0" }
      ]
    },{
      "featureType": "landscape.natural.terrain",
      "stylers": [
        { "hue": "#ff0000" },
        { "saturation": 11 },
        { "lightness": -8 },
        { "color": "#80b280" }
      ]
    },{
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        { "saturation": -28 },
        { "color": "#dd8080" },
        { "lightness": 21 }
      ]
    },{
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
        { "color": "#8ccce0" },
        { "saturation": -20 },
        { "lightness": 24 }
      ]
    },{
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
        { "color": "#80b4ad" }
      ]
    },{
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#809dad" },
        { "saturation": 21 },
        { "lightness": 55 }
      ]
    }
  ]

  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  var boston = new google.maps.LatLng(42.358992, -71.061019);

  var mapOptions = {
    zoom: 15,
    center: boston,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  var rendererOptions = {
    draggable: true,
    map: map
  };

  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('steps'));

  // requestPlaces();
}

// function requestPlaces() {
//   var place = document.getElementById('place').value;
//   var request = {

//   }

//   infowindow = new google.maps.InfoWindow();
//   var service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, placesCallback);
// }

function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, directionsCallback);
  getBounds(start, end);
}

function directionsCallback(response, status) {
  if (status == google.maps.DirectionsStatus.OK) {
    directionsDisplay.setDirections(response);
  }
}

// function placesCallback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//     }
//   }
// }

function boundsCallback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    getGeo(results[0]);
  }
}

function getGeo(place) {
  debugger;
  return place.geometry.location;
}

function getBounds(start, end) {
  var startRequest = {
    key: "AIzaSyCswDZpj7fM9qjPhs4jG7pKYZrdxb5bp90",
    query: start
  };

  var endRequest = {
    key: "AIzaSyCswDZpj7fM9qjPhs4jG7pKYZrdxb5bp90",
    query: end
  };

  var startService = new google.maps.places.PlacesService(map);
  var endService = new google.maps.places.PlacesService(map);
  var endPoints = [];
  endPoints.push(startService.textSearch(startRequest, boundsCallback))
  endPoints.push(endService.textSearch(endRequest, boundsCallback))
  debugger;
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
