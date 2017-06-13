'use strict';
mimicTrading.controller('loginCtrl', ['$scope', '$state', 'RestSvr', 'loginSrv', '$rootScope', '$log','$timeout',
	function($scope, $state, RestSvr, loginSrv, $rootScope, $log, $timeout){

		$scope.login = function (isValid) {
			if( !isValid ){
				return;
			}
			$scope.isLoading = true;
			RestSvr.login('/admin/login', $scope.user)
			.then(function (response) {
				$scope.isLoading = false;
				if( response.errors ) {
					$scope.message = response.message;
				} else {
					loginSrv.initAdminSession(response.user, response.token);
					$state.go('dashboard');	
				}
			});
		};
	}
]);