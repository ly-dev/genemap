'use strict';

angular.module('genemapApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
    }]);
