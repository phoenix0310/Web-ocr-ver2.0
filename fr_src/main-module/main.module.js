(function () {
    'use strict';
    angular.module('App', ["ui.router","ngMaterial"])
    .config(config)
    .run(run);

    config.$inject = ['$urlRouterProvider', '$locationProvider', '$mdThemingProvider', '$provide'];
    function config($urlRouterProvider, $locationProvider, $mdThemingProvider, $provide) {
        //angular material theme config 
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();

        $urlRouterProvider.otherwise('/');
    }


    run.$inject = ['$http'];
    function run($http) {


    }


})();