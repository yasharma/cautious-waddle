'use strict';

/* Application routes */
mimicTrade.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('home',{
		url: '/',
		controller: 'homeCtrl',
		templateUrl: '/user/home/views/home.html',
		authenticate: false,
		data: {pageTitle: 'Home'},
		resolve: {
		    // deps: ['$ocLazyLoad', function($ocLazyLoad) {
		    //     return $ocLazyLoad.load({
		    //         name: 'mimicTrade',
		    //         insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
		    //         files: [
		    //             '/assets/css/admin-style.css'
		    //         ] 
		    //     });
		    // }]
		},
	})
	.state('login',{
		url: '/login',
		controller: 'loginCtrl',
		templateUrl: '/user/login/views/login.html',
		authenticate: false,
		data: {pageTitle: 'Login'}
	})
	.state('signup',{
		url: '/signup',
		controller: 'signupCtrl',
		templateUrl: '/user/signup/views/signup.html',
		authenticate: false,
		data: {pageTitle: 'Signup'}
	});
}]);