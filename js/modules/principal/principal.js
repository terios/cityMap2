/**
 * Created by Terios on 11/13/13.
 */
myMapModule.controller('principalController', function ($rootScope, $scope, localisation, maptype) {
    $rootScope.map;
    // $rootScope.lat = 0;
    $scope.lat;
    $scope.listMarker = [];
    $scope.afficheloader = false;
    $scope.centreCoordinate = 1;
    $scope.sideMapStyle = "paper"
    $rootScope.maptype;
    $rootScope.markerlist = [];
    $rootScope.afficheRechDetail;

    /**
     * une fois la page principal ouverte execution de la function init()
     */
    $scope.init = function () {
        /*    $.ajax({ // fonction permettant de faire de l'ajax
         type: "GET", // methode de transmission des données au fichier php
         url: "http://192.168.68.102:8080/api/v1/article/search/?format=json&dist=5&lon=-3.8647105&lat=35.1713733", // url du fichier php
         dataType: 'json',
         success: function (data) { // si l'appel a bien fonctionnés

         showPosition(data.objects);
         $scope.$apply();
         },
         error: function () {
         alert('erreur rencontrer');
         }
         });
         showPosition("");
         */
        $scope.loadmap = getlocation();
        $scope.afficheloader = true;
    }

    /**
     * localiser l'eutilisateur
     */
    function getlocation() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(createMap, displayError);
        } else {
            alert("no geolocation supported");
        }
    }

    /**
     * function qui prend en paramettre la position de l'utilisateur et dessine la map
     * @param position
     */
    function createMap(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        localisation['lat'] = position.coords.latitude;
        localisation['lon'] = position.coords.longitude;

        latlon = new google.maps.LatLng(latitude, longitude);
        localisation['latlon'] = latlon;
        mapholder = document.getElementById('map');
        $rootScope.maptype = maptype['mystyle'];
        //  console.debug('createMap() style ' + $rootScope.maptype);
        var mapOptions = {
            center: latlon,
            zoom: 12,
            mapTypeControl: true,
            styles: maptype[$rootScope.maptype],
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $rootScope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        google.maps.event.addListener($rootScope.map, "center_changed", function () {

                //           $rootScope.lat = $rootScope.map.center.ob;
                //           $rootScope.$apply();
                localisation[latitude] = $rootScope.map.center.ob;
                localisation[longitude] = $rootScope.map.center.pb;

                $scope.lat = localisation[longitude];
                $scope.$apply();
            }
        )
        ;

        localisation['map'] = $rootScope.map;


        data = {
            lat: position.coords.latitude, lon: position.coords.longitude, city: '', limit: false
        }

        $.ajax({ // fonction permettant de faire de l'ajax
            type: "POST", // methode de transmission des données au fichier php
            url: "http://192.168.68.109:8000/api/v1/article/search/", // url du fichier php
            dataType: 'json',
            data: data,
            success: function (data) { // si l'appel a bien fonctionnés

                console.debug(data);
                var tmp = ajoutPing(data);
                $("spinner-wrapper").remove();
                $scope.$apply();
            },
            error: function () {
                alert('erreur rencontrer');
            }
        });
    }

    /* //listner sur latitude
     $scope.$watch('lat', alertMe);
     function alertMe() {

     //    console.debug('new watch event lat');
     }
     */
    /**
     * watcher permet de changer le style de la map une fois changer par l'utilisateur
     */

    /*$rootScope.$watch('maptype', refreshstyle);*/
    function refreshstyle() {
        $scope.loadmap = getlocation();
        console.debug(maptype['mystyle']);
    }

    /**
     * prend en parametre un tableau json recu depuis le serveur qomptenant les information des markers
     * @param json
     */
    function ajoutPing(json) {
        localisation['mapcenter'] = localisation['map'].getCenter();
        i = 0;

        /*
         marker[0] = json['objects'][counter]['id'];
         marker[1] = json['objects'][counter]['name'];
         marker[2] = json['objects'][counter]['category'];
         marker[3] = json['objects'][counter]['city'];
         marker[4] = json['objects'][counter]['rating'];
         marker[5] = json['objects'][counter]['latitude'];
         marker[3] = json['objects'][counter]['longitude'];
         marker[3] = json['objects'][counter]['vote_count'];
         locations.push();
         ['Bondi Beach', localisation['mapcenter'].pb, localisation['mapcenter'].qb, 4, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ", "coffe", 'style/img/img%20icon/Map-Marker-coffe.png'],

         */
        var infowindow = new google.maps.InfoWindow();
        for (tmp in json['objects']) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(json['objects'][i]['latitude'], json['objects'][i]['longitude']),
                map: localisation['map'],
                draggable: false,
                animation: google.maps.Animation.DROP,
                icon: 'style/img/img%20icon/Map-Marker-coffe.png',
                category: "hotel"
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent('<div class="span4 animated fadeIn" style="background-color: darkgray">' +
                        '<div class="row">' +
                        '<div class="span4">' +
                        '<div class="row">' +
                        '<div class="span1">' +
                        '<a class="thumbnail">' +
                        '<img src="style/img/img%20icon/hotel_bg_32.png" alt=""></a>' +
                        '</div>' +
                        '<div class="span3">' +
                        '<h4>' + json['objects'][i]['name'] + '</h4>' +
                        '<p>' +
                        '<strong>' + json['objects'][i]['category'] + '</strong>' +
                        '</p>' +
                        '<div class="row-fluid">' +
                        '<span class=" badge badge-info">vote :' + json['objects'][i]['votes_count'] + '</span>' +
                        '<span class=" badge badge-inverse">note :' + json['objects'][i]['rating'] + '</span>' +
                        '<span class="badge badge-success" style="margin-left: 10px;"><a href="#" style="color: #ffffff;">plus de detaille</a></span>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    )
                    ;
                    infowindow.open(localisation['map'], marker);
                    //localisation['map'].setZoom(8);
                    //localisation['map'].setCenter(marker.getPosition());
                }
            })(marker, i));
            $rootScope.markerlist.push(marker);
            i++;
        }
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
        /*google.maps.event.addListener(marker, "click", function () {
         infoWindow.open(map);
         });*/
        $scope.listMarker.push(marker);

    }

    /**
     * calcule la distance entre deux point donnee
     * @param startCoord
     * @param finishCoord
     * @returns {number}
     */
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

    /**
     * affiche les erreure relatuve a la geolocatisation
     * @param error
     */
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

    /**
     * refresh actualise la carte et demande les markers les plus pres du nouveau centre
     */
    $scope.refresh = function () {

        localisation['mapcenter'] = localisation['map'].getCenter();
        //   console.debug('latitude :' + localisation['mapcenter'].pb + '  longitude : ' + localisation['mapcenter'].qb);
        $scope.latitude = localisation['mapcenter'].nb;
        $scope.longitude = localisation['mapcenter'].ob;


        latlon = new google.maps.LatLng($scope.latitude, $scope.longitude);
        mapholder = document.getElementById('map');
        $rootScope.maptype = maptype['mystyle'];
        var mapOptions = {
            center: latlon,
            zoom: 14,
            mapTypeControl: true,
            styles: maptype[$rootScope.maptype],
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $rootScope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        localisation['map'] = $rootScope.map;


        data = {
            lat: $scope.latitude, lon: $scope.longitude, city: '', limit: false
        }

        $.ajax({ // fonction permettant de faire de l'ajax
            type: "POST", // methode de transmission des données au fichier php
            url: "http://192.168.68.109:8000/api/v1/article/search/", // url du fichier php
            dataType: 'json',
            data: data,
            success: function (data) { // si l'appel a bien fonctionnés

                var tmp = ajoutPing(data);
                $("spinner-wrapper").remove();
                $scope.$apply();
            },
            error: function () {
                alert('erreur rencontrer');
            }
        });


    }


});