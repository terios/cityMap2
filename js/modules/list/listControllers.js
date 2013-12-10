myMapModule.controller('listController',function ($scope){
	$scope.articles=[
	{
		'title':'Café Miramar',
		'image':'img%20icon/coffee.png',
		'desc':'Here we declared a controller called PhoneListCtrl and registered it in an AngularJS module, phonecatApp. Notice that our ng-app directive (on the <html> tag) now specifies the phonecatApp module name as the module to load when bootstrapping the Angular application.',
		'city':'Bouki',
		'category':'Café & Restaurant',
		'comments-count':'12',
		'like-counts':'76',
		'rate':'6'		
	}];
});