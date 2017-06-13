'use strict';

mimicTrade.factory('loginSrv', ['localStorageService', '$rootScope', function (localStorageService, $rootScope) {
    return {
    	isLogged: false,
    	initAdminSession: function (user, token) {
    		this.isLogged = true;
    		localStorageService.set('token', token);
    		localStorageService.set('user', user);
    		$rootScope.user = localStorageService.get('user');
    	}
    };
}]);