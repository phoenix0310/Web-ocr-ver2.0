(function () {
  'use strict';

  angular.module('App')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider'];
  function RoutesConfig($stateProvider) {



    // *** Set up UI states ***
    $stateProvider

      .state('client', {
        abstract: true,
        templateUrl: 'routes/client.html',
      })

 // View pdf
 .state('pdf', {
  url: '/pdf',
  templateUrl:'routes/pdf.html',
  controller: 'pdfController',
  controllerAs:'$ctrl'

})

     


  }

})();
