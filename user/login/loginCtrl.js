'use strict';
mimicTrade.controller('loginCtrl', ['$scope', '$state', 'RestSvr', '$rootScope', '$log','$timeout',
	function($scope, $state, RestSvr, $rootScope, $log, $timeout){
		
		$scope.login = function (isValid) {
			if( !isValid ){
				return;
			}
			
		};
	}
]);