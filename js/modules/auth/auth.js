/**
 * Created by Terios on 11/29/13.
 */
myMapModule.controller('authController', function ($rootScope, $scope, $location) {
    /**
     * parametre form auth
     * @type {string}
     */
    $scope.authlogin = '';
    $scope.authpassword = '';
    $scope.authErreurLogin = false;
    $scope.authErreurPassword = false;

    /**
     * parametre form sign
     * @type {boolean}
     */
    $scope.signlogin = '';
    $scope.signemail = '';
    $scope.signpassword = '';
    $scope.sideVille = '';
    $scope.signErreurLogin = false;
    $scope.signErreurPassword = false;
    $scope.signErreurEmail = false;


    $scope.afficheAuth = true;
    $scope.indication = 'Inscription';

    $scope.submitAuthentification = function () {

        if ($scope.authlogin.length < 6) {
            $scope.authErreurLogin = true;
        } else {
            $scope.authErreurLogin = false;
        }
        if ($scope.authpassword.length < 6) {
            $scope.authErreurPassword = true;
        } else {
            $scope.authErreurPassword = false;
        }
        // alert('auth : ' + $scope.authlogin + ' - ' + $scope.authpassword);
    }

    $scope.submitSign = function () {

        if ($scope.signlogin.length < 6) {
            $scope.signErreurLogin = true;
        } else {
            $scope.signErreurLogin = false;
        }

        if ($scope.signpassword.length < 6) {
            $scope.signErreurPassword = true;
        } else {
            $scope.signErreurPassword = false;
        }

        if ($scope.signemail.length < 6) {
            $scope.signErreurEmail = true;
        } else {
            $scope.signErreurEmail = false;
        }
    }

    $scope.changeAuthSign = function () {
        $scope.afficheAuth = !$scope.afficheAuth;
        if ($scope.afficheAuth == true) {
            $scope.indication = 'Inscription';
        }
        else {
            $scope.indication = 'Authentification';

        }
    }


})
;