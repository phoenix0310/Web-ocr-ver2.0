(function () {
    'use strict';

    angular.module('App')
    .controller('pdfController',  pdfController);


    pdfController.$inject = ['$http','$stateParams'];
    function pdfController($http,$stateParams) {
        var $ctrl = this;
        
        console.log($stateParams.path)
        console.log($stateParams)
      

    // this.$onInit=function(){
       
       $ctrl.pdfUrl =$stateParams.path
      //  $scope.pdfPassword = 'test';
      //  $scope.scroll = 0;
      //  $scope.loading = 'loading';
       
    // }
     
      //  $scope.getNavStyle = function(scroll) {
      //    if(scroll > 100) return 'pdf-controls fixed';
      //    else return 'pdf-controls';
      //  }
     
      //  $scope.onError = function(error) {
      //    console.log(error);
      //  }
     
      //  $scope.onLoad = function() {
      //    $scope.loading = '';
      //  }
     
      //  $scope.onProgress = function (progressData) {
        
      //  };
     
      //  $scope.onPassword = function (updatePasswordFn, passwordResponse) {
      //    if (passwordResponse === PDFJS.PasswordResponses.NEED_PASSWORD) {
      //        updatePasswordFn($scope.pdfPassword);
      //    } else if (passwordResponse === PDFJS.PasswordResponses.INCORRECT_PASSWORD) {
      //        console.log('Incorrect password')
      //    }
      //  };

    
      //  $ctrl.convert=function(){
      //   var img = document.getElementById("capturedImage");
        
      // };
    
      
      $ctrl.advanceApi;
      $ctrl.cancel = cancel;
      $ctrl.download = download;
      $ctrl.downloadFull = downloadFull;
      $ctrl.imageApi;
      $ctrl.isOpenScreenshot = false;
      $ctrl.openScreenshot = openScreenshot;
      $ctrl.sendImage = sendImage;
      $ctrl.target1Options = {
         filename: 'target1.png',
         downloadText: 'Download me',
         cancelText: 'Close it!'
      };
  
      function cancel() {
         if ($ctrl.advanceApi) $ctrl.advanceApi.cancel();
      }
  
  
      function download() {
         if ($ctrl.advanceApi) $ctrl.advanceApi.download();
      }
  
      function downloadFull() {
         if ($ctrl.fullScreenApi) $ctrl.fullScreenApi.downloadFull();
      }
  
      function openScreenshot() {
         $ctrl.isOpenScreenshot = !$ctrl.isOpenScreenshot;
      }
  
      function sendImage() {
  
         if ($ctrl.imageApi) {
            $ctrl.imageApi.toPng(function (dataUrl) {

                Tesseract.recognize(dataUrl,{
                    lang: 'jpn'
                    // lang:'eng'
                })
               .progress(function (p) { console.log('progress', p);})
               .then(function (result) {
                 console.log('result', result);
                //  var div = document.getElementById('display');
                //  div.innerHTML += result.html;
                 $scope.captureText=result.text;
                 $scope.$apply();
               });
              
            });

    


         }
      }
   
 




    }
})();
