/**
 * Created by Terios on 11/13/13.
 */
myMapModule.controller('sideprincipalController', function ($rootScope, $scope, localisation, maptype, triecategorie, Restangular, urls) {

    $rootScope.listville = [];
    $scope.sideVille;
    $scope.sideRayon = 5;
    $scope.sideMotCle = "";
    $scope.checkModel = {
        cafe: triecategorie['cafe'],
        hotel: triecategorie['hotel'],
        resto: triecategorie['restaurent'],
        club: triecategorie['club'],
        transport: triecategorie['gare'],
        shop: triecategorie['shop'],
        hopital: triecategorie['hopital'],
        mosque: triecategorie['mosque']
    };

    $scope.init = function () {
        $.ajax({ // fonction permettant de faire de l'ajax
            type: "GET", // methode de transmission des données au fichier php
            url: urls["villeList"], // url du fichier php
            dataType: 'json',
            success: function (data) { // si l'appel a bien fonctionnés
                for (var i = 0; i < data['objects'].length; i++) {
                    tmp = [];
                    tmp['nom'] = data['objects'][i]['name'];
                    tmp['lat'] = data['objects'][i]['latitude'];
                    tmp['long'] = data['objects'][i]['longitude'];
                    $rootScope.listville.push(tmp);
                }

            },
            error: function () {
                alert('erreur');
            }
        });

        $scope.villeList = $rootScope.listville;
    }


    $scope.refreshMap = function () {
        maptype['mystyle'] = $scope.sideMapStyle;
        $rootScope.maptype = $scope.sideMapStyle;
    }
    $scope.sideForm = function () {
        console.debug($scope.sideVille);

        localisation['mapcenter'] = localisation['map'].getCenter();
        localisation['lat'] = localisation['mapcenter'].nb;
        localisation['lon'] = localisation['mapcenter'].ob;


        if ($scope.sideVille.length < 3) {
            var data = {'city': '', 'lat': localisation['lat'], 'lon': localisation['lon'], 'tags': $scope.sideMotCle, 'rayon': $scope.sideRayon};
        } else {
            var data = {'city': $scope.sideVille, 'lat': localisation['lat'], 'lon': localisation['lon'], 'tags': $scope.sideMotCle, 'rayon': $scope.sideRayon};
            for (i = 0; i < $rootScope.listville.length; i++) {
                if ($scope.sideVille === $rootScope.listville[i]['nom']) {
                    localisation['lat'] = $rootScope.listville[i]['lat'];
                    localisation['lon'] = $rootScope.listville[i]['long'];
                    console.debug(localisation['lat'] + "  --  " + localisation['lon']);
                    break;
                }
            }
        }

        $.ajax({ // fonction permettant de faire de l'ajax
            type: "POST", // methode de transmission des données au fichier php
            url: urls['lieuList'], // url du fichier php
            data: data,
            dataType: 'json',
            success: function (data) { // si l'appel a bien fonctionnés
                var tmp = ajoutPing(data);
            },
            error: function () {
                alert('erreur rencontrer');
            }
        });

        latlon = new google.maps.LatLng(localisation['lat'], localisation['lon']);
        localisation['map'].panTo(latlon);

    }
    function actualise() {
        console.debug('actualisation des donnes du map');
    }

    /**
     * ajout ping
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

    $scope.refreshTrieCafe = function () {
        if (triecategorie['cafe'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Cafe') {
                    $rootScope.markerlist[i].setVisible(false);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['cafe'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Cafe') {
                    $rootScope.markerlist[i].setMap($rootScope.map);
                    $rootScope.markerlist[i].setVisible(true);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['cafe'] = true;
        }

    }
    $scope.refreshTrieHotel = function () {
        if (triecategorie['hotel'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Hotel') {
                    $rootScope.markerlist[i].setVisible(false);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['hotel'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Hotel') {
                    $rootScope.markerlist[i].setVisible(true);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['hotel'] = true;
        }
    }
    $scope.refreshTrieResto = function () {
        if (triecategorie['restaurent'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Restaurant') {
                    $rootScope.markerlist[i].setVisible(false);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['restaurent'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Restaurant') {
                    $rootScope.markerlist[i].setVisible(true);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['restaurent'] = true;
        }
    }
    $scope.refreshTrieClub = function () {
        if (triecategorie['club'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Divers') {
                    $rootScope.markerlist[i].setVisible(false);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['club'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Divers') {
                    $rootScope.markerlist[i].setVisible(true);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['club'] = true;
        }
    }
    $scope.refreshTrieTransport = function () {
        if (triecategorie['gare'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Transport') {
                    $rootScope.markerlist[i].setVisible(false);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['gare'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Transport') {
                    $rootScope.markerlist[i].setVisible(true);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['gare'] = true;
        }
    }
    $scope.refreshTrieMosque = function () {
        if (triecategorie['mosque'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Centre spirituel') {
                    $rootScope.markerlist[i].setVisible(false);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['mosque'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Centre spirituel') {
                    $rootScope.markerlist[i].setVisible(true);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['mosque'] = true;
        }
    }
    $scope.refreshTrieHopital = function () {
        if (triecategorie['hopital'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Hopital') {
                    $rootScope.markerlist[i].setVisible(false);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['hopital'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Hopital') {
                    $rootScope.markerlist[i].setVisible(true);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['hopital'] = true;
        }
    }
    $scope.refreshTrieShop = function () {
        if (triecategorie['shop'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Boutique & Shopping') {
                    $rootScope.markerlist[i].setVisible(false);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['shop'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'Boutique & Shopping') {
                    $rootScope.markerlist[i].setVisible(true);
                    $rootScope.markerCluster.repaint();
                }
            }
            triecategorie['shop'] = true;
        }
    }

});