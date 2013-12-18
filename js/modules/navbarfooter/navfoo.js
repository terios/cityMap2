/**
 * Created by Terios on 11/18/13.
 */
myMapModule.controller('navfooController', function ($rootScope, $scope, $location, localisation, maptype) {

    $rootScope.afficheRechDetail = false;


    $scope.submitRechercheDetailler = function () {/*
     localisation['motcle'] = $scope.recherchDetailler
     alert('donner envoyer a larakai')*/
        //console.debug(localisation['motcle']);
        /*$location.path("/list");
         $scope.$apply();*/

        /*        console.debug('factory' + maptype['mystyle']);
         console.debug('rootscope' + $rootScope.maptype);
         */
        $rootScope.afficheRechDetail = !$rootScope.afficheRechDetail;
    }


})
;