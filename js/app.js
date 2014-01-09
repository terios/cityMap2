/**
 * Created by Terios on 11/6/13.
 */

var myMapModule = angular.module('mymap', ['ui.bootstrap', 'kendo.directives', 'ui.router', 'ui.compat', 'ngAnimate', 'restangular']);


myMapModule.factory('localisation', function () {
    var localisation = [];
    localisation['lat'] = "zero";
    localisation['lon'] = "zero";
    localisation['ville'] = "casablanca";
    localisation['motcle'] = "";
    localisation['map'];
    localisation['mapcenter'];
    localisation['latlon'];
    return localisation;
});

myMapModule.factory('urls', function () {
    var urls = [];
    var base = "http://192.168.12.109/";
    urls['lieuList'] = base + "api/v1/article/search/";
    urls['categorieList'] = base + "api/v1/categories";
    urls['villeList'] = base + "api/v1/cities";
    urls['base'] = base;
    return urls;
});


myMapModule.factory('triecategorie', function () {
    var triecategorie = [];
    triecategorie['cafe'] = true;
    triecategorie['hotel'] = true;
    triecategorie['restaurent'] = true;
    triecategorie['mosque'] = true;
    triecategorie['club'] = true;
    triecategorie['gare'] = true;
    triecategorie['hopital'] = true;
    triecategorie['shop'] = true;
    return triecategorie;
});

myMapModule.factory('search', function () {
    var search = {};
    return search;
});


myMapModule.factory('maptype', function () {

    var maptype = [];
    maptype['mystyle'] = "MapBox";
    maptype['MapBox'] = [
        {"featureType": "water", "stylers": [
            {"saturation": 43},
            {"lightness": -11},
            {"hue": "#0088ff"}
        ]},
        {"featureType": "road", "elementType": "geometry.fill", "stylers": [
            {"hue": "#ff0000"},
            {"saturation": -100},
            {"lightness": 99}
        ]},
        {"featureType": "road", "elementType": "geometry.stroke", "stylers": [
            {"color": "#808080"},
            {"lightness": 54}
        ]},
        {"featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [
            {"color": "#ece2d9"}
        ]},
        {"featureType": "poi.park", "elementType": "geometry.fill", "stylers": [
            {"color": "#ccdca1"}
        ]},
        {"featureType": "road", "elementType": "labels.text.fill", "stylers": [
            {"color": "#767676"}
        ]},
        {"featureType": "road", "elementType": "labels.text.stroke", "stylers": [
            {"color": "#ffffff"}
        ]},
        {"featureType": "poi", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [
            {"visibility": "on"},
            {"color": "#b8cb93"}
        ]},
        {"featureType": "poi.park", "stylers": [
            {"visibility": "on"}
        ]},
        {"featureType": "poi.sports_complex", "stylers": [
            {"visibility": "on"}
        ]},
        {"featureType": "poi.medical", "stylers": [
            {"visibility": "on"}
        ]},
        {"featureType": "poi.business", "stylers": [
            {"visibility": "simplified"}
        ]}
    ];
    maptype['Gowalla'] = [
        {"featureType": "road", "elementType": "labels", "stylers": [
            {"visibility": "simplified"},
            {"lightness": 20}
        ]},
        {"featureType": "administrative.land_parcel", "elementType": "all", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "landscape.man_made", "elementType": "all", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "transit", "elementType": "all", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "road.local", "elementType": "labels", "stylers": [
            {"visibility": "simplified"}
        ]},
        {"featureType": "road.local", "elementType": "geometry", "stylers": [
            {"visibility": "simplified"}
        ]},
        {"featureType": "road.highway", "elementType": "labels", "stylers": [
            {"visibility": "simplified"}
        ]},
        {"featureType": "poi", "elementType": "labels", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "road.arterial", "elementType": "labels", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "water", "elementType": "all", "stylers": [
            {"hue": "#a1cdfc"},
            {"saturation": 30},
            {"lightness": 49}
        ]},
        {"featureType": "road.highway", "elementType": "geometry", "stylers": [
            {"hue": "#f49935"}
        ]},
        {"featureType": "road.arterial", "elementType": "geometry", "stylers": [
            {"hue": "#fad959"}
        ]}
    ];
    maptype['Pale'] = [
        {"featureType": "water", "stylers": [
            {"visibility": "on"},
            {"color": "#acbcc9"}
        ]},
        {"featureType": "landscape", "stylers": [
            {"color": "#f2e5d4"}
        ]},
        {"featureType": "road.highway", "elementType": "geometry", "stylers": [
            {"color": "#c5c6c6"}
        ]},
        {"featureType": "road.arterial", "elementType": "geometry", "stylers": [
            {"color": "#e4d7c6"}
        ]},
        {"featureType": "road.local", "elementType": "geometry", "stylers": [
            {"color": "#fbfaf7"}
        ]},
        {"featureType": "poi.park", "elementType": "geometry", "stylers": [
            {"color": "#c5dac6"}
        ]},
        {"featureType": "administrative", "stylers": [
            {"visibility": "on"},
            {"lightness": 33}
        ]},
        {"featureType": "road"},
        {"featureType": "poi.park", "elementType": "labels", "stylers": [
            {"visibility": "on"},
            {"lightness": 20}
        ]},
        {},
        {"featureType": "road", "stylers": [
            {"lightness": 20}
        ]}
    ];
    maptype['Apple'] = [
        {"featureType": "water", "elementType": "geometry", "stylers": [
            {"color": "#a2daf2"}
        ]},
        {"featureType": "landscape.man_made", "elementType": "geometry", "stylers": [
            {"color": "#f7f1df"}
        ]},
        {"featureType": "landscape.natural", "elementType": "geometry", "stylers": [
            {"color": "#d0e3b4"}
        ]},
        {"featureType": "landscape.natural.terrain", "elementType": "geometry", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "poi.park", "elementType": "geometry", "stylers": [
            {"color": "#bde6ab"}
        ]},
        {"featureType": "poi", "elementType": "labels", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "poi.medical", "elementType": "geometry", "stylers": [
            {"color": "#fbd3da"}
        ]},
        {"featureType": "poi.business", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "road", "elementType": "geometry.stroke", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "road", "elementType": "labels", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [
            {"color": "#ffe15f"}
        ]},
        {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [
            {"color": "#efd151"}
        ]},
        {"featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [
            {"color": "#ffffff"}
        ]},
        {"featureType": "road.local", "elementType": "geometry.fill", "stylers": [
            {"color": "black"}
        ]},
        {"featureType": "transit.station.airport", "elementType": "geometry.fill", "stylers": [
            {"color": "#cfb2db"}
        ]}
    ];
    maptype['Paper'] = [
        {"featureType": "administrative", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "poi", "stylers": [
            {"visibility": "simplified"}
        ]},
        {"featureType": "road", "stylers": [
            {"visibility": "simplified"}
        ]},
        {"featureType": "water", "stylers": [
            {"visibility": "simplified"}
        ]},
        {"featureType": "transit", "stylers": [
            {"visibility": "simplified"}
        ]},
        {"featureType": "landscape", "stylers": [
            {"visibility": "simplified"}
        ]},
        {"featureType": "road.highway", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "road.local", "stylers": [
            {"visibility": "on"}
        ]},
        {"featureType": "road.highway", "elementType": "geometry", "stylers": [
            {"visibility": "on"}
        ]},
        {"featureType": "road.arterial", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "water", "stylers": [
            {"color": "#5f94ff"},
            {"lightness": 26},
            {"gamma": 5.86}
        ]},
        {},
        {"featureType": "road.highway", "stylers": [
            {"weight": 0.6},
            {"saturation": -85},
            {"lightness": 61}
        ]},
        {"featureType": "road"},
        {},
        {"featureType": "landscape", "stylers": [
            {"hue": "#0066ff"},
            {"saturation": 74},
            {"lightness": 100}
        ]}
    ]

    return maptype;
})