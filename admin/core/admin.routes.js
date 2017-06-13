'use strict';

/* Application routes */
mimicTrading.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('login',{
		url: '/',
		controller: 'loginCtrl',
		templateUrl: '/admin/login/views/login.html',
		authenticate: false,
		data: {pageTitle: 'Login'},
		resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'mimicTrading',
		            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
		            files: [
		                '/assets/css/admin-style.css'
		            ] 
		        });
		    }]
		},
	})
	.state('dashboard',{
		url: '/dashboard',
		controller: 'dashboardCtrl',
		templateUrl: '/admin/dashboard/views/dashboard.html',
		data: {pageTitle: 'Admin Dashboard Template'},
		resolve: {
		    deps: ['$ocLazyLoad', function($ocLazyLoad) {
		        return $ocLazyLoad.load({
		            name: 'mimicTrading',
		            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
		            files: [
		                '/assets/global/plugins/morris/morris.css',                            
		                '/assets/global/plugins/morris/morris.min.js',
		                '/assets/global/plugins/morris/raphael-min.js',                            
		                '/assets/global/plugins/jquery.sparkline.min.js',

		                '/assets/pages/scripts/dashboard.min.js',
		                '/admin/dashboard/dashboardCtrl.js',
		            ] 
		        });
		    }]
		},
		authenticate: true
	});
}]);