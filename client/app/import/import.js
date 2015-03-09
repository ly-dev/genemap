'use strict';

angular.module('genemapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('import', {
        url: '/import',
        templateUrl: 'app/import/import.html',
        controller: 'ImportCtrl'
      });
  });
