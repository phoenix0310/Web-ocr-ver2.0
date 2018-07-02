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
 .state('client.pdf', {
  url: '/pdf/{path}',
  templateUrl:'routes/pdf.html',
  controller: 'pdfController',
  controllerAs:'$ctrl'

})

 // View pdf
 .state('client.upload', {
  url: '/home',
  templateUrl:'routes/pdfUpload.html',
  controller: 'pdfUploadController',
  controllerAs:'$ctrl'

})

     


  }

})();
