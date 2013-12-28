myMapModule.controller('detailController', function ($rootScope, $scope,$stateParams) {

    //Scope Objects
    $scope.article = {};
    $scope.user = null;
    $scope.rate=2;
    $scope.init = function () {
        $scope.article.articleId = $stateParams.articleId;
        $scope.user=localStorage.getItem("login");
        if($scope.user==null){
            $("#checkin").hide();
        }
        $scope.sendRequest();
    }

    $scope.sendRequest = function () {
        //AJAX JQUERY
        $.ajax({
            type: "GET",
            url: "http://192.168.174.109:8000/api/v1/article/"+$scope.article.articleId,
            dataType: 'json',
            success: function (data) {
                $scope.detailReponse(data);
            }, error: function () {
                alert('ERREUR');
            }
        });
    }

    $scope.detailReponse = function (data) {
        $scope.article.title = data.name;
        $scope.article.link = '/detail/87654';
        $scope.article.picture = 'http://placehold.it/150x150';
        $scope.article.address = data.city;
        $scope.article.category = data.category;
        $scope.article.date = data.date_created;
        $scope.article.rate = data.rating;
        $scope.article.usersCount = data.votes_count;
        $scope.$apply();
    }

    $scope.vote=function(){
/*        $.ajax({
            type: "POST",
            url: "http://192.168.174.109:8000/api/v1/article/"+$scope.article.articleId,
            dataType: 'json'
        });
*/
        $scope.$apply();
    }

    $scope.search = function () {

    }

    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / 5);
    };

});