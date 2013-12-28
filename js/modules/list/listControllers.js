myMapModule.controller('listController',function ($rootScope,$scope,search){

    var opts = {
        lines: 13, // The number of lines to draw
        length: 19, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#fff', // #rgb or #rrggbb or array of colors
        speed: 1.1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: '', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '100%', // Top position relative to parent in px
        left: '250%' // Left position relative to parent in px
    };
    $scope.spinner = new Spinner(opts);

    //Scope Objects
    $scope.tags={};
    $scope.tags.category=[];
    $scope.tags.city="";
    $scope.tags.tags="";

    $scope.tags.page="1";
    $scope.total=0;
    //init
        $scope.init=function(){
            //search for keywords factory
            if(search.length>0){
                $scope.tags=search;
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
            for (var i = 0; i <data.objects.length ; i++) {


                var article={
                    'title':data.objects[i].name,
                    'link':'/detail/87654',
                    'picture':'http://placehold.it/150x150',
                    'address':data.objects[i].city,
                    'category':data.objects[i].category,
                    'date':data.objects[i].date_created,
                    'rate':data.objects[i].rating,
                    'usersCount':data.objects[i].votes_count,
                    'rateInt':Math.floor(data.objects[i].rating)
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
            $("#maincontent").show();
        }

        $scope.sendRequest=function(){

            $('html, body').animate({scrollTop:0}, 'fast');
            $("#maincontent").hide();
            $scope.target = document.getElementById("content");
            $scope.spinner.spin($scope.target);

            var tagstoSend=jQuery.extend(true, {}, $scope.tags);
            var category={}
            for(i=0;i<tagstoSend.category.length;i++){
                if(tagstoSend.category[i]==="hotel") category.hotel=1;
                else if(tagstoSend.category[i]==="cafe") category.cafe=1;
                else if(tagstoSend.category[i]==="restaurant") category.restaurant=1;
            }
            tagstoSend.category=category;
            tagstoSend.category=JSON.stringify(tagstoSend.category);
            console.debug(tagstoSend);

            //AJAX JQUERY
            $.ajax({
                type: "GET",
                url: "http://192.168.174.109:8000/api/v1/article/search",
                data:tagstoSend,
                dataType: 'json',
                success: function (data) {
                    $scope.reponse(data);
                    $scope.spinner.stop();
                }, error: function () {
                    alert('ERREUR');
                    $scope.spinner.stop();
                }
            });
        }

});


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