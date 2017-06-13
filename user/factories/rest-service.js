'use strict';

mimicTrade.factory('RestSvr', ['$http', '$window', '$httpParamSerializerJQLike',function ($http, $window, $httpParamSerializerJQLike) {
	function baseUrl(apiUrl) {
		var baseUrl = $window.location.protocol + '//' + '100.100.7.76:8010';
		return 	baseUrl + apiUrl;
	}
	
	return{
		search: function (apiUrl, data, queryString) {
			var q = !angular.isUndefined(queryString) ? '?' + queryString : '';
			return $http.post((apiUrl + q), data).then(function(response){
				return (response.data.errors) ? 
				{ errors: response.data.errors }:
				{ records: response.data.data.records, paging: response.data.data.paging };
			}, function(response){
				return {
					errors: response.data.errors
				};
			});
		},
		login: function(apiUrl, data){
			var req = {
				method: 'POST',
				url: baseUrl(apiUrl),
			 	headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
			 	data: $httpParamSerializerJQLike(data)
			};
			return $http(req).then(function(response){
				return {
					result: response.data.message, 
					user: response.data.user,
					token: response.data.token
				};
			}, function(response){
				return {
					errors: true,
					message: response.data.message
				};
			});
		},
		paginate: function(apiUrl, params, queryString, config){
			var p = !angular.isUndefined(params) ? params : '';
			var q = !angular.isUndefined(queryString) ? '?' + queryString : '';
			return $http.get((apiUrl + p + q), config).then(function(response){
				return (response.data.errors) ? 
				{ errors: response.data.errors }:
				{
					records: response.data.data.records,
					paging: response.data.data.paging,
					group: response.data.data.group,
				};
			});
		},
		get: function(apiUrl, params){
			var p = !angular.isUndefined(params) ? params : null;
			return $http.get(apiUrl, p).then(function(response){
				return {
					record: response.data.data.record
				};
			});
		},
		getById: function(apiUrl, id){
			return $http.get(apiUrl + id).then(function(response){
				return {
					record: response.data
				};
			});	
		},
		post: function(apiUrl, data){
			var req = {
				method: 'POST',
				url: baseUrl(apiUrl),
			 	headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
			 	data: $httpParamSerializerJQLike(data)
			};
			return $http(req).then(function(response){
				return {
					result: response.data.success, 
					data: response.data.message,
					message: response.data.message, 
				};
			}, function(response){
				return {
					errors: true,
					message: response.data.message
				};
			});
		},
		put: function(apiUrl, id, data, config){
			var c = !angular.isUndefined(config) ? config : null;
			return $http.put((apiUrl + id), data, c).then(function(response){
				return (response.data.errors) ? 
				{ errors: response.data.errors }:
				{
					result: response.data.data.success, 
					message: response.data.data.message, 
					data: response.data.data.record
				};
			}, function(response){
				return {
					errors: response.data.errors
				};
			});
		},
		delete: function(apiUrl, id){
			return $http.delete(apiUrl + id).then(function(response){
				return (response.data.errors) ? 
				{ errors: response.data.errors }:
				{
					message: response.data.data.message,
					result: response.data.data.success
				};
			}, function(response){
				return {
					errors: response.data.errors
				};
			});	
		}
	};
}]);