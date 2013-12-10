





window.onload = getlocation();

function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("no geolocation supported");
    }
}

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    showPosition(position);

}
var map;
function showPosition(position) {

    latlon = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    mapholder = document.getElementById('map');


    var mapOptions = {
        center: latlon, zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL}
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var title = "ana terios";
    var content = "You are here: " + position.coords.latitude + ", " + position.coords.longitude;
    addMarker(map, latlon, title, content);

}

function addMarker(map, latlong, title, content) {

    var markerOptions = {
        position: latlong,
        map: map,
        title: title,
        clickable: true
    };

    var marker = new google.maps.Marker(markerOptions);

    var infoWindowOptions = {
        content: content,
        position: latlong
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker, "click", function () {
        infoWindow.open(map);
    });
}

function computeDistance(startCoord, finishCoord) {
    var startLatRads = degreesToRadians(startCoord.latitude);
    var startLongRads = degreesToRadians(startCoord.longitude);
    var destLatRads = degreesToRadians(finishCoord.latitude);
    var destLongRads = degreesToRadians(finishCoord.longitude);
    var Radius = 6371; // radius of the Earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
            Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}
