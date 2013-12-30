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
        /**
         * just pour test
         * @type {*}
         */
        localisation['mapcenter'] = localisation['map'].getCenter();
        $scope.latitude = localisation['mapcenter'].nb;
        $scope.longitude = localisation['mapcenter'].ob;
        $rootScope.donneMarker = [
            {nom: 'Hotel atlas orient', description: 'description1', category: 'diver', icon: ''},
            {nom: 'McDonals', description: 'description2', category: 'restaurent', icon: ''},
            {nom: "Cafe l'exelance", description: 'description3', category: 'transport', icon: ''},
            {nom: "Cafe l'exelance", description: 'description3', category: 'mosque', icon: ''}

        ]

        for (var i = 0; i < $rootScope.donneMarker.length; i++) {


            /**
             * donne a chaque categorie son marker approprie
             */
            switch ($rootScope.donneMarker[i]['category']) {
                case 'hotel':
                    $rootScope.donneMarker[i]['icon'] = "style/img/img%20icon/marker_hotel.png";
                    break;
                case 'restaurent':
                    $rootScope.donneMarker[i]['icon'] = "style/img/img%20icon/marker_restaurent.png";
                    break;
                case 'coffe':
                    $rootScope.donneMarker[i]['icon'] = "style/img/img%20icon/marker_cafe.png";
                    break;
                case 'hopital':
                    $rootScope.donneMarker[i]['icon'] = "style/img/img%20icon/marker_hopital.png";
                    break;
                case 'shopping':
                    $rootScope.donneMarker[i]['icon'] = "style/img/img%20icon/marker_shopping.png";
                    break;
                case 'diver':
                    $rootScope.donneMarker[i]['icon'] = "style/img/img%20icon/marker_diver.png";
                    break;
                case 'mosque':
                    $rootScope.donneMarker[i]['icon'] = "style/img/img%20icon/marker_mosque.png";
                    break;
                case 'transport':
                    $rootScope.donneMarker[i]['icon'] = "style/img/img%20icon/marker_transport.png";
                    break;
                case 'contribution':
                    $rootScope.donneMarker[i]['icon'] = "style/img/img%20icon/marker_contribution.png";
                    break;
            }
            if (i > 0) {
                $scope.latitude = 34.677829069312956;
                $scope.longitude = -1.9403254240751266;
            }
            if (i > 1) {
                $scope.latitude = 34.627829069312956;
                $scope.longitude = -1.9403254240751266;
            }
            if (i > 2) {
                $scope.latitude = 34.637829069312956;
                $scope.longitude = -1.9403254240751266;
            }
            console.debug($rootScope.donneMarker[i]['icon']);
            marker = new google.maps.Marker({
                position: new google.maps.LatLng($scope.latitude, $scope.longitude),
                map: localisation['map'],
                draggable: false,
                animation: google.maps.Animation.DROP,
                icon: $rootScope.donneMarker[i]['icon'],
                category: $rootScope.donneMarker[i]['category']
            });
            $rootScope.markerlist.push(marker);

            var boxText = document.createElement("div");
            boxText.innerHTML = '<div class="animated fadeIn">' +
                '<div class="span3" style="border: 2px solid #0480be; margin-top: 0px; background:#333; color:#FFF; font-family:Arial; font-size:12px; border-radius:6px; -webkit-border-radius:6px; -moz-border-radius:6px;">' +
                '<div class="row">' +
                '<div class="row-fluid">' +
                '<div class="span8 offset2"><h4 style="color: #ffffff;margin-left: 15px">' + $rootScope.donneMarker[i]['nom'] +
                '</h4></div>' +
                '</div>' +
                '<div class="span3">' +
                '<div class="row-fluid" style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px;">' +
                '<span style="margin-right: 5px" class=" badge badge-info">vote : 20</span>' +
                '<span style="margin-right: 5px" class=" badge badge-primary">note : 4.2</span>' +
                '<span style="margin-right: 5px" class="badge badge-success"><a href="#/compte" style="color: #ffffff;">plus de detaille</a></span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            var myOptions = {
                content: boxText,
                disableAutoPan: false,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(-140, 0),
                zIndex: null,
                boxStyle: {
                    background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
                    opacity: 0.75,
                    width: "280px"
                },
                closeBoxMargin: "-22px 0px 0px 0px",
                closeBoxURL: "style/img/img%20icon/close_256.png",
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false};


            //Define the infobox
            $rootScope.markerlist[i].infobox = new InfoBox(myOptions);

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    $rootScope.markerlist[i].infobox.open(localisation['map'], this);
                }
            })(marker, i));
        }


        data = {
            lat: position.coords.latitude, lon: position.coords.longitude, city: '', limit: false
        }
        /*
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
         alert('erreur');
         }
         });*/
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
        i = 0;

        for (tmp in json['objects']) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(json['objects'][i]['latitude'], json['objects'][i]['longitude']),
                map: localisation['map'],
                draggable: false,
                animation: google.maps.Animation.DROP,
                icon: 'style/img/img%20icon/Map-Marker-coffe.png',
                category: "hotel"
            });
            $rootScope.markerlist.push(marker);

            var boxText = document.createElement("div");
            boxText.innerHTML = '<div class="animated fadeIn">' +
                '<div class="span3" style="border: 2px solid #0480be; margin-top: 0px; background:#333; color:#FFF; font-family:Arial; font-size:12px; border-radius:6px; -webkit-border-radius:6px; -moz-border-radius:6px;">' +
                '<div class="row">' +
                '<div class="row-fluid">' +
                '<div class="span1" style="margin-left: 40px;margin-top: 5px">' +
                '<img src="style/img/img%20icon/hotel_bg_32.png" alt="">' +
                '</div>' +
                '<div class="span2"><h4 style="color: #ffffff;margin-left: 15px">' + json['objects'][i]['name'] +
                '</h4></div>' +
                '</div>' +
                '<div class="span3">' +
                '<div class="row-fluid" style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px;">' +
                '<span class=" badge badge-info">vote : ' + json['objects'][i]['votes_count'] + '</span>' +
                '<span class=" badge badge-primary">note : ' + json['objects'][i]['rating'] + '</span>' +
                '<span class="badge badge-success"><a href="#/compte" style="color: #ffffff;">plus de detaille</a></span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            var myOptions = {
                content: boxText,
                disableAutoPan: false,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(-140, 0),
                zIndex: null,
                boxStyle: {
                    background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
                    opacity: 0.75,
                    width: "280px"
                },
                closeBoxMargin: "-22px 0px 0px 0px",
                closeBoxURL: "style/img/img%20icon/close_256.png",
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false};


            //Define the infobox
            $rootScope.markerlist[i].infobox = new InfoBox(myOptions);

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    $rootScope.markerlist[i].infobox.open(localisation['map'], this);
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