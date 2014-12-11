var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

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
    map: map
  }

  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
  directionsDisplay.setMap(map);
}

function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}



google.maps.event.addDomListener(window, 'load', initialize);
