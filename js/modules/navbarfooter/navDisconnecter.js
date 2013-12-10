/**
 * Created by Terios on 11/29/13.
 */
/**
 * Created by Terios on 11/29/13.
 */
myMapModule.controller('navDisconnecterController', function ($scope, $location) {

    $scope.openAuth = function () {
        $location.path("/auth");
    }
})
;