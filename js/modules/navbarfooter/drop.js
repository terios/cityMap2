var ModalAuth = function ($scope, $modal, $log) {


    $scope.openAuth = function () {

        var modalInstance = $modal.open({
            templateUrl: 'myModalAuth.html',
            controller: ModalAuthCtrl
        });
    };

    $scope.openSign = function () {

        var modalInstance2 = $modal.open({
            templateUrl: 'myModalSign.html',
            controller: ModalSignCtrl,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });


    };
};

var ModalAuthCtrl = function ($scope, $modalInstance) {


    $scope.authErreurLogin = true;
    $scope.authErreurPassword = true;
    $scope.input = {};
    $scope.submitAuthentification = function () {
        //localStorage.setItem("login", "logged");
        //$modalInstance.close();
        alert("login :" + $scope.input.password);
    };

    $scope.cancelAuth = function () {
        $modalInstance.dismiss('cancel');
    };
};

/**
 * inscription
 * */


var ModalSignCtrl = function ($scope, $modalInstance, items) {


    $scope.signErreurLogin = true;
    $scope.signErreurPassword = true;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancelSign = function () {
        $modalInstance.dismiss('cancel');
    };
};


