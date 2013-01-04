define([
    'text!partials/main.html',
    'text!partials/config.html',
    'js/services',
    'js/controllers',
    'js/filters',
    'js/directives'],
    function(
        mainTpl,
        configTpl) {

'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'bootstrap.directives',
    'myApp.controllers',
    'myApp.filters',
    'myApp.services',
    'myApp.directives'
])
.config([
    '$routeProvider',
    '$httpProvider',
    function($routeProvider, $httpProvider) {
        $routeProvider.when('/main', {template: mainTpl, controller: 'MainController'});
        $routeProvider.when('/config', {template: configTpl, controller: 'ConfigController'});
        $routeProvider.otherwise({redirectTo: '/main'});

        function DataInterceptor($q, $log) {
            function success(response) {
                if (response.data && typeof(response.data) === "object") {
                    if (response.data.success) {
                        response.data = response.data.response;
                    }
                    else {
                        return $q.reject(response);
                    }
                }
                return response;
            }
            function error(response) {
                return response;
            }

            return function(promise) {
                return promise.then(success, error);
            };
        }

        $httpProvider.responseInterceptors.push(DataInterceptor);
}]);

});