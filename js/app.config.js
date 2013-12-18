/**
 * Created by Terios on 11/6/13.
 */

myMapModule.config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
    $stateProvider
        .state('home', {
            url: '',
            views: {
                "navbar": {templateUrl: function () {
                    var key = localStorage.getItem("login");
                    //console.debug("-----> " + key);
                    if (key == "logged") {
                        return 'js/modules/navbarfooter/navbarConnecter.tpl.html';
                    }
                    return 'js/modules/navbarfooter/navbarDisconnecter.html';
                }},
                "menu": {
                    templateUrl: "js/modules/principalSideBar/principalSideBar.tpl.html"
                },
                "content": {
                    templateUrl: "js/modules/principal/principal.tpl.html"

                }
            }
        })
        .state('auth', {
            url: '/auth',
            views: {
                "navbar": {templateUrl: function () {
                    var key = localStorage.getItem("login");
                    //console.debug("-----> " + key);
                    if (key == "logged") {
                        return 'js/modules/navbarfooter/navbarConnecter.tpl.html';
                    }
                    return 'js/modules/navbarfooter/navbarDisconnecter.html';
                }},
                "content": {
                    templateUrl: "js/modules/auth/auth.tpl.html"

                }
            }
        })
        .state('compte', {
            url: '/compte',
            views: {
                "navbar": {templateUrl: function () {
                    var key = localStorage.getItem("login");
                    //console.debug("-----> " + key);
                    if (key == "logged") {
                        return 'js/modules/navbarfooter/navbarConnecter.tpl.html';
                    }
                    return 'js/modules/navbarfooter/navbarDisconnecter.html';
                }},
                "content": {
                    templateUrl: "js/modules/compte/compte.tpl.html"

                }
            }
        })
        .state('list', {
            url: '/list',
            views: {
                "navbar": {templateUrl: function () {
                    var key = localStorage.getItem("login");
                    //console.debug("-----> " + key);
                    if (key == "logged") {
                        return 'js/modules/navbarfooter/navbarConnecter.tpl.html';
                    }
                    return 'js/modules/navbarfooter/navbarDisconnecter.html';
                }},
                "content": {
                    templateUrl: "js/modules/list/list.tpl.html"
                }
            }
        })
        .state('list.item', {
            url: '/item',
            views: {
                "menu": {
                    templateUrl: "js/modules/principalSideBar/principalSideBar.tpl.html"
                },
                "content": {
                    templateUrl: "js/modules/principal/principal.tpl.html"
                }
            }
        })
        .state("otherwise", { url: '/otherwise', views: {
            "navbar": {templateUrl: function () {
                var key = localStorage.getItem("login");
                //console.debug("-----> " + key);
                if (key == "logged") {
                    return 'js/modules/navbarfooter/navbarConnecter.tpl.html';
                }
                return 'js/modules/navbarfooter/navbarDisconnecter.html';
            }},
            "menu": {
                templateUrl: "js/modules/principalSideBar/principalSideBar.tpl.html"
            },
            "content": {
                templateUrl: "js/modules/principal/principal.tpl.html"

            }
        }})
    ;
    $urlRouterProvider.otherwise('/otherwise');


    RestangularProvider.setBaseUrl('http://192.168.68.54/Symfony/web/app_dev.php/users/1?jsoncallback=user');


});




