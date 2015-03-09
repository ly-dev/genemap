'use strict';

angular.module('genemapApp')
    .controller('NavbarCtrl', function ($scope, $location) {
        $scope.menu = [
            {
                'title': 'Home',
                'link': '/'
            },
            {
                'title': 'Import',
                'link': '/import'
            },
        ];

        $scope.isCollapsed = true;

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });
