/**
 * Created by Terios on 11/13/13.
 */
myMapModule.controller('principalController', function ($rootScope, $scope, localisation, maptype, urls) {
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
            }
        )
        ;

        localisation['map'] = $rootScope.map;
        /**
         * just pour test
         * @type {*}
         */
        localisation['mapcenter'] = localisation['map'].getCenter();


        data = {
            lat: position.coords.latitude, lon: position.coords.longitude, city: ''
        }

        $.ajax({ // fonction permettant de faire de l'ajax
            type: "POST", // methode de transmission des données au fichier php
            url: urls["lieuList"], // url du fichier php
            dataType: 'json',
            data: data,
            success: function (data) { // si l'appel a bien fonctionnés

                var tmp = ajoutPing(data);
                $("spinner-wrapper").remove();
                $scope.$apply();
            },
            error: function () {
                alert('erreur');
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
        i = 0;
        $rootScope.markerlist = [];
        for (tmp in json['objects']) {
            switch (json['objects'][i]['category']) {
                case 'Hotel':
                    json['objects'][i]['description'] = "style/img/img%20icon/marker_hotel.png";
                    break;
                case 'Restaurant':
                    json['objects'][i]['description'] = "style/img/img%20icon/marker_restaurent.png";
                    break;
                case 'Cafe':
                    json['objects'][i]['description'] = "style/img/img%20icon/marker_cafe.png";
                    break;
                case 'Hopital':
                    json['objects'][i]['description'] = "style/img/img%20icon/marker_hopital.png";
                    break;
                case 'Boutique & Shopping':
                    json['objects'][i]['description'] = "style/img/img%20icon/marker_shopping.png";
                    break;
                case 'Divers':
                    json['objects'][i]['description'] = "style/img/img%20icon/marker_diver.png";
                    break;
                case 'Centre spirituel':
                    json['objects'][i]['description'] = "style/img/img%20icon/marker_mosque.png";
                    break;
                case 'Transport':
                    json['objects'][i]['description'] = "style/img/img%20icon/marker_transport.png";
                    break;
                case 'contribution':
                    json['objects'][i]['description'] = "style/img/img%20icon/marker_contribution.png";
                    break;
            }
            console.debug(json['objects'][i]['category']);
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(json['objects'][i]['latitude'], json['objects'][i]['longitude']),
                map: localisation['map'],
                draggable: false,
                animation: google.maps.Animation.DROP,
                icon: json['objects'][i]['description'],
                category: json['objects'][i]['category']
            });

            $rootScope.markerlist.push(marker);

            if (json['objects'][i]['gallery'].length == 0) {
                var image = "style/img/img%20icon/imagenon.png"
            } else {
                image = urls['base'] + json['objects'][i]['gallery'][0];
            }
            var boxText = document.createElement("div");
            boxText.innerHTML = '<div class="animated fadeIn">' +
                '<div class="span3" style="border: 2px solid #0480be; margin-top: 0px; background:#ffffff; color:#FFF; font-family:Arial; font-size:12px; border-radius:6px; -webkit-border-radius:6px; -moz-border-radius:6px;">' +
                '<div class="row">' +
                '<div class="row-fluid">' +
                '<div class="span1" style="margin-left: 40px;margin-top: 5px">' +
                '<img src="style/img/img%20icon/hotel_bg_32.png" alt="">' +
                '</div>' +
                '<div class="span8"><h5 style="color: #000000;margin-left: 15px">' + json['objects'][i]['name'] + '</h5>' +
                '</div>' +
                '</div>' +
                '<div class="span2 thumbnail" style="margin-left: 40px"><img src="' + image + '" width="100px"> </div>' +
                '<div class="span3">' +
                '<div class="row-fluid" style="margin-top: 5px;margin-bottom: 5px;margin-left: 10px;">' +
                '<span style="margin-right: 5px;" class=" badge badge-info">vote : ' + json['objects'][i]['votes_count'] + '</span>' +
                '<span style="margin-right: 5px;" class=" badge badge-primary">note : ' + json['objects'][i]['rating'] + '</span>' +
                '<span style="margin-right: 5px;" class="badge badge-success"><a href="#/compte" style="color: #ffffff;">plus de detaille</a></span>' +
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
                    opacity: 1,
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
            i++;
        }
        $rootScope.markerCluster = new MarkerClusterer(localisation['map'], $rootScope.markerlist, { ignoreHidden: true });
    }


    /**
     * calcule la distance entre deux point donnee
     * @param startCoord
     * @param finishCoord
     * @returns {number}
     */

    function computeDistance(startCoord, finishCoord) {
        console.debug(startCoord);
        console.debug(finishCoord);
        var startLatRads = degreesToRadians(startCoord.position.nb);
        var startLongRads = degreesToRadians(startCoord.position.ob);
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
        $scope.latitude = localisation['mapcenter'].b;
        $scope.longitude = localisation['mapcenter'].d;
        var zoom = localisation['map'].getZoom();

        latlon = new google.maps.LatLng($scope.latitude, $scope.longitude);
        mapholder = document.getElementById('map');
        $rootScope.maptype = maptype['mystyle'];
        var mapOptions = {
            center: latlon,
            zoom: zoom,
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
            lat: $scope.latitude, lon: $scope.longitude, city: ''
        }

        $.ajax({ // fonction permettant de faire de l'ajax
            type: "POST", // methode de transmission des données au fichier php
            url: urls["lieuList"], // url du fichier php
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