
var app = angular.module('employeeApp', ['ngRoute','tc.chartjs']);

app.config(function ($routeProvider) {
    $routeProvider
	.when('/', {
	    controller: 'customersController',
        templateUrl: '/partials/main.html'
    })
	.when('/edit', {
	    controller: 'newController',
        templateUrl: '/partials/edit.html'
    })
		.when('/confirm', {
			controller: 'confirmController',
			templateUrl: '/partials/confirm.html'
		})

	.when('/back', {
	    controller: 'customersController',
        templateUrl: '/partials/main.html'
    });

});

app.directive('myTable', function(){
	return {
		restrict: 'EA',
		templateUrl: 'templates/mytabletemplate.html'
	};
});

app.factory('Data', function() {
    return { "employees":[
	{
	  "name":"Raj",
	   "age": 31,
	   "class":"JQuery, AngularJS",
	   "address":"1234 Stevens street, San Jose, CA"
	}
	,
	{
	  "name":"Mr Kumar",
	   "age": 23,
	   "class":"JAVA, SQL",
	   "address":"21212 london street, San Jose, CA"
	}
	,
	{
	  "name":"Mike Smith",
	   "age": 28,
	   "class":"C++, AngularJS, HTML5, CSS3",
	   "address":"22 will wood street, Santa Clara, CA"
	}
		]
   }
});

app.factory('shareDataService',function(){
	return {};
});

app.controller('customersController', function($scope, $location, Data, shareDataService) {
		$scope.employees = Data.employees;

			$scope.editUser = function(name){
				var n = name;
				$location.path("/edit/");
				for(var i=0;i < $scope.employees.length; i++){
					if ($scope.employees[i].name == n){
						alert("Yay! employee found");
					}
				}
			}
});

app.controller('newController', function($scope, $location, Data, shareDataService) {
    $scope.employees = Data.employees;

	$scope.newName = shareDataService.name;
	$scope.newSkill = shareDataService.skill;

	$scope.addUser = function(){
    // 	 $scope.newEmp = {
	//		"name": $scope.newName,
	//		"class": $scope.newSkill
	 //     };

	  //$scope.employees.push($scope.newEmp);


		$location.path("/");

	}

	$scope.confirmButton = function(){

		shareDataService.name = $scope.newName;
		shareDataService.skill = $scope.newSkill;

		$location.path("/confirm");
	}
});

app.controller('confirmController', function($scope, $location, Data, shareDataService){

	$scope.name = shareDataService.name;
	$scope.skill = shareDataService.skill;

	$scope.employees = Data.employees;

	$scope.confirmClick = function(){
		$scope.newEmp = {
			"name": $scope.name,
			"class": $scope.skill
		};

		$scope.employees.push($scope.newEmp);

		$location.path("/");

	}

	$scope.cancel = function(){

		//alert(shareDataService.name);
		//alert(shareDataService.skill);

		$location.path("/edit");
	}

});

/*
function customersController($scope,$http) {
    $http.get('dummy_data.json')
    .success(function(response) {$scope.employees = response.employees;});
}
*/
