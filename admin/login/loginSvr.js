'use strict';

mimicTrading.factory('loginSrv', ['localStorageService', '$rootScope', function (localStorageService, $rootScope) {
    return {
    	isLogged: false,
    	initAdminSession: function (admin, token) {
    		this.isLogged = true;
    		localStorageService.set('token', token);
    		localStorageService.set('admin', admin);
    		$rootScope.admin = localStorageService.get('admin');
    	}
    };
}]);