myMapModule.controller('listController',function ($scope,search){

        //init
        $scope.init=function(){
            //Scope Objects
            $scope.tags={};
            $scope.tags.category={
                'hotel':0,
                'cafe':0,
                'restaurant':0
/*                'divers':0,
                'transport':0,
                'shop':0,
                'relig':0,
                'sante':0
*/
            };
            $scope.tags.city="";
            $scope.tags.tags="";
            $scope.tags.page="1";


            //search for keywords factory
            if(!search['key']===""){
            $scope.tags.tags=search['key'];
            }

            //Send Ajax Request with tags parameter
            $scope.sendRequest();
        }

        $scope.search=function(){
            $scope.sendRequest();
        }

        $scope.gotoPage=function(index){
            $scope.tags.page=index;
            $scope.sendRequest();
        }

        $scope.reponse=function(data) {
            $scope.articles=[];

            //Articles
            for (var i = data.objects.length-1; i >=0 ; i--) {


                var article={
                    'title':data.objects[i].name,
                    'link':'/detail/87654',
                    'picture':'http://placehold.it/200x200',
                    'address':data.objects[i].city,
                    'category':data.objects[i].category,
                    'date':data.objects[i].date_created,
                    'rate':'4.7',
                    'usersCount':'14368',
                    'rateInt':Math.floor(4.7)
                };
                $scope.articles.push(article);
            };

            //Pages Count
            $scope.pagesCount=[];
            for(j=1;j<=data.meta.page_count;j++) $scope.pagesCount.push(j);
            //Current Page
            $scope.currentPage=data.meta.page;

            //Next and previous
            $scope.hasnext=data.meta.next;
            $scope.hasprev=data.meta.back;

            //Total Count
            $scope.total=data.meta.total_count;

            $scope.$apply();
        }

        $scope.sendRequest=function(){
            //AJAX JQUERY
            console.log($scope.tags);

            $.ajax({
                type: "GET",
                url: "http://192.168.174.107:8000/api/v1/article/search",
                data:$scope.tags,
                dataType: 'json',
                success: function (data) {
                    $scope.reponse(data);
                }, error: function () {
                    alert('ERREUR');
                }
            });
        }


/*
    //TEST
    //Pages Count
    $scope.pagesCount=[];
    for(j=1;j<=8;j++) $scope.pagesCount.push(j);
    //Current Page
    $scope.currentPage=5;
    $scope.hasnext=true;
    $scope.hasprev=false;

    $scope.articles=[];
    //data.objects

    for (var i = 2; i >= 0; i--) {

        var article={
            'title':'Café Noumidia',
            'link':'/detail/87654',
            'picture':'http://placehold.it/200x200',
            'address':'Boukidan, Al Hoceima',
            'category':'Cafés',
            'date':'June 02, 1988',
            'rate':'4.7',
            'rateInt':Math.floor(4.7)
        };
        $scope.articles.push(article);
        $scope.$apply();
    };

*/
});