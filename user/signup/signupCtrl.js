'use strict';
mimicTrade.controller('signupCtrl', ['$scope', '$state', 'RestSvr', '$rootScope', '$log','$timeout',
	function($scope, $state, RestSvr, $rootScope, $log, $timeout){
		
		$scope.signup = function (isValid) {
			if( !isValid ){
				return;
			}
			$scope.isLoading = true;
			RestSvr.post('/api/signup', $scope.user)
			.then(function (response) {
				$scope.isLoading = false;
				console.log(response);
				// if( response.errors ) {
				// 	$scope.message = response.message;
				// } else {
				// 	loginSrv.initAdminSession(response.user, response.token);
				// 	$state.go('dashboard');	
				// }
			});
		};
	}
]);