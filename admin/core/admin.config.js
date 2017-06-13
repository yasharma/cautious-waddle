'use strict';

/* Application config */
/*Angular interceptors are service factories that are registered with the $httpProvider */
mimicTrading.config(['$httpProvider', function($httpProvider){
	var interceptor = ['$q', '$rootScope', function ($q, $rootScope) {
        return {
        	request: function (config) {
	           	return config;
	       	},

            requestError: function (rejection) {
                return $q.reject(rejection);
            },

            response: function (response) {
                return response || $q.when(response);
            },

            // Revoke client authentication if 400 is received
            responseError: function (rejection) {
                if(rejection.status <= 0) {
                    $rootScope.$broadcast('server_error',{message:'ERR_CONNECTION_REFUSED'});
                    return;
                }
                return $q.reject(rejection);
            }
        };
    }];

	$httpProvider.interceptors.push(interceptor);
}])
.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}])
.config(['laddaProvider', function (laddaProvider) {
    laddaProvider.setOption({
        style: 'zoom-in',
    });
}])
.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}])
.run(['$location','$rootScope','loginSrv','$state','localStorageService','$timeout',
	function($location, $rootScope, loginSrv, $state,localStorageService, $timeout){

		$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            $rootScope.isPageLoading = true; 
            if (toState.authenticate && !loginSrv.isLogged && !localStorageService.get('admin')){
                loginSrv.isLogged = false;
                $state.go("login");
                event.preventDefault(); 
            }else {
                var token = localStorageService.get('token');
                if($location.path() === '/' && token ){
                    $location.path('/dashboard');
                }
            }
		});

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.isPageLoading = false;
        });

        /* This will logout the admin from the application */
        $rootScope.clearToken = function () {
            localStorageService.remove('token');
            localStorageService.remove('admin');
            delete $rootScope.admin;
            loginSrv.isLogged = false;
            $state.go("login");
        };

        // Set the admin for entire application
        $rootScope.admin = localStorageService.get('admin');

        // If any global error occured
        $rootScope.$on('server_error', function (event, res) {
            $rootScope.server_error_message = res.message;
        });
    }
]);