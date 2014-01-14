/**
 * Created by Terios on 1/12/14.
 */
myMapModule.controller('contributionController', function ($scope, localisation) {

    $scope.lat;
    $scope.lon;

    $scope.init = function () {
        var tmp = getlocation();
    }


    function getlocation() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(createMap, displayError);
        } else {
            alert("no geolocation supported");
        }
    }

    function createMap(position) {
        // Set static latitude, longitude value

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var latlng = new google.maps.LatLng(latitude, longitude);
        // Set map options
        var myOptions = {
            zoom: 14,
            center: latlng,
            panControl: true,
            zoomControl: true,
            scaleControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        // Create map object with options
        map = new google.maps.Map(document.getElementById("map_contribution"), myOptions);
        // Create and set the marker
        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            position: latlng
        });

        google.maps.event.addListener(map, 'click', function (event) {
            marker.setPosition(event.latLng);
            var point = marker.getPosition();
            map.panTo(point);
            $scope.lat = point.lat();
            $scope.lon = point.lng();
            document.getElementById('lat').value = point.lat();
            document.getElementById('lon').value = point.lng();
        });
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
})