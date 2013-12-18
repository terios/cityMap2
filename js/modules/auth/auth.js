/**
 * Created by Terios on 11/29/13.
 */
myMapModule.controller('authController', function ($rootScope, $scope, $location, Restangular) {
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

    $scope.token;
    $scope.init = function () {

        $.ajax({ // fonction permettant de faire de l'ajax
            type: "GET", // methode de transmission des données au fichier php
            url: "http://192.168.68.109:8000/get_token", // url du fichier php
            dataType: 'json',
            success: function (data) { // si l'appel a bien fonctionnés
                $scope.token = data['token'];
                console.debug(data['token']);
            },
            error: function () {
                alert('erreur rencontrer');
            }
        });
    }

    $scope.submitAuthentification = function () {
        var erreur = 1;
        if ($scope.authlogin.length < 3) {
            $scope.authErreurLogin = true;
            erreur = 0;
        } else {
            $scope.authErreurLogin = false;
        }
        if ($scope.authpassword.length < 3) {
            $scope.authErreurPassword = true;
            erreur = 0;
        } else {
            $scope.authErreurPassword = false;
        }

        if (erreur == 1) {
            data = {
                username: $scope.authlogin, password: $scope.authpassword
            }


            $.ajax({ // fonction permettant de faire de l'ajax
                type: "POSt", // methode de transmission des données au fichier php
                url: "http://192.168.68.109:8000/login_user", // url du fichier php
                dataType: 'json',
                data: data,
                crossDomain: true,
                beforeSend: function (xhr, settings) {
                    console.debug($scope.token);
                    xhr.setRequestHeader("X-CSRFToken", $scope.token);
                },
                success: function (data) { // si l'appel a bien fonctionnés
                    alert('succes');
                },
                error: function () {
                    alert('erreur rencontrer');
                }
            });

        }


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