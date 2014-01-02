/**
 * Created by Terios on 11/29/13.
 */
/**
 * Created by Terios on 11/29/13.
 */
myMapModule.controller('navDisconnecterController', function ($scope, $location) {

    $scope.afficheRechDetail = false;

    $scope.isCollapsed = false;
    $scope.openAuth = function () {
        $location.path("/auth");
    }


    $scope.submitRechercheDetailler = function () {
        $scope.afficheRechDetail = false;
    }

})
;