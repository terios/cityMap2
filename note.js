/**
 * Created by Terios on 12/30/13.
 */
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
