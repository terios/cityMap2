/**
 * Created by Terios on 11/13/13.
 */
myMapModule.controller('sideprincipalController', function ($rootScope, $scope, localisation, maptype, triecategorie, Restangular) {


    $scope.sideVille = "";
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
    $scope.refreshMap = function () {

        maptype['mystyle'] = $scope.sideMapStyle;
        $rootScope.maptype = $scope.sideMapStyle;
    }
    $scope.sideForm = function () {
        localisation['mapcenter'] = localisation['map'].getCenter();
        localisation['lat'] = localisation['mapcenter'].nb;
        localisation['lon'] = localisation['mapcenter'].ob;

        var data = {'city': $scope.sideVille, 'category': {'cafe': $scope.checkModel.cafe, 'resto': $scope.checkModel.resto, 'hotel': $scope.checkModel.hotel, 'club': $scope.checkModel.club, 'mosque': $scope.checkModel.mosque, 'transport': $scope.checkModel.transport}, 'lat': localisation['lat'], 'lon': localisation['lon'], 'tags': $scope.sideMotCle, 'rayon': $scope.sideRayon};


        $.ajax({ // fonction permettant de faire de l'ajax
            type: "POST", // methode de transmission des données au fichier php
            url: "http://192.168.68.109:8000/api/v1/article/search/", // url du fichier php
            data: data,
            dataType: 'json',
            success: function (data) { // si l'appel a bien fonctionnés
                console.debug(data);
            },
            error: function () {
                alert('erreur rencontrer');
            }
        });


        console.debug(data);
    }
    function actualise() {
        console.debug('actualisation des donnes du map');
    }

    $scope.refreshTrieCafe = function () {
        if (triecategorie['cafe'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'coffe') {
                    $rootScope.markerlist[i].setMap(null);
                }
            }
            triecategorie['cafe'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'coffe') {
                    $rootScope.markerlist[i].setMap($rootScope.map);
                }
            }
            triecategorie['cafe'] = true;
        }
    }
    $scope.refreshTrieHotel = function () {
        if (triecategorie['hotel'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'hotel') {
                    $rootScope.markerlist[i].setMap(null);
                }
            }
            triecategorie['hotel'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'hotel') {
                    $rootScope.markerlist[i].setMap($rootScope.map);
                }
            }
            triecategorie['hotel'] = true;
        }
    }
    $scope.refreshTrieResto = function () {
        if (triecategorie['restaurent'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'restaurent') {
                    $rootScope.markerlist[i].setMap(null);
                }
            }
            triecategorie['restaurent'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'restaurent') {
                    $rootScope.markerlist[i].setMap($rootScope.map);
                }
            }
            triecategorie['restaurent'] = true;
        }
    }
    $scope.refreshTrieClub = function () {
        if (triecategorie['club'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'club') {
                    $rootScope.markerlist[i].setMap(null);
                }
            }
            triecategorie['club'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'club') {
                    $rootScope.markerlist[i].setMap($rootScope.map);
                }
            }
            triecategorie['club'] = true;
        }
    }
    $scope.refreshTrieTransport = function () {
        if (triecategorie['gare'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'gare') {
                    $rootScope.markerlist[i].setMap(null);
                }
            }
            triecategorie['gare'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'gare') {
                    $rootScope.markerlist[i].setMap($rootScope.map);
                }
            }
            triecategorie['gare'] = true;
        }
    }
    $scope.refreshTrieMosque = function () {
        if (triecategorie['mosque'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'mosque') {
                    $rootScope.markerlist[i].setMap(null);
                }
            }
            triecategorie['mosque'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'mosque') {
                    $rootScope.markerlist[i].setMap($rootScope.map);
                }
            }
            triecategorie['mosque'] = true;
        }
    }
    $scope.refreshTrieHopital = function () {
        if (triecategorie['hopital'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'hopital') {
                    $rootScope.markerlist[i].setMap(null);
                }
            }
            triecategorie['hopital'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'hopital') {
                    $rootScope.markerlist[i].setMap($rootScope.map);
                }
            }
            triecategorie['hopital'] = true;
        }
    }
    $scope.refreshTrieShop = function () {
        if (triecategorie['shop'] == true) {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'shop') {
                    $rootScope.markerlist[i].setMap(null);
                }
            }
            triecategorie['shop'] = false;
        } else {
            for (i = 0; i < $rootScope.markerlist.length; i++) {
                if ($rootScope.markerlist[i].category === 'shop') {
                    $rootScope.markerlist[i].setMap($rootScope.map);
                }
            }
            triecategorie['shop'] = true;
        }
    }

});