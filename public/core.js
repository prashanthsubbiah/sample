var usersapp = angular.module('usersapp', []);
var indexApp = angular.module('indexApp', []);

usersapp.controller('usrController',function($scope,$http){
//Page load, get all reminders to display
	$http.get('/api/users')
		.success(function(data) {
			$scope.users = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
});

indexApp.controller('indexController',function($scope,$http){
$scope.joinChat = function() {
//	alert("Clicked - "+$scope.formData.name);
	$http.post('/chat', $scope.formData)
	.success(function(data) {
		window.location = data;
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});
};
});