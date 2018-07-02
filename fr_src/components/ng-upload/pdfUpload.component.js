(function () {
    'use strict';

    angular.module('App')
        .component('pdfUpload', {
            templateUrl: 'components/ng-upload/pdfUpload.html',
            bindings: {
                pdfUrl: '<',
                outUrl:'='
            },
            controller: pdfUpload
        });

        pdfUpload.$inject = ['$http','Upload','$window','$state'];
  function pdfUpload($http,Upload,$window,$state) {
    var $ctrl= this;

    console.log("pdfUpload component OK!");

    $ctrl.submit = function(){ //function to call on form submit
            console.log($ctrl.file);
            if ($ctrl.file) { //check if from is valid
                $ctrl.upload($ctrl.file); //call upload function
            }
        }

    $ctrl.upload = function (file) {
        console.log('in Upload');
     
        Upload.upload({
            url: '/api/pdf/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                console.log(resp);
                $ctrl.outUrl = resp.data.msg.replace('./fr_src','.');
                console.log($ctrl.outUrl);
                $state.go('client.pdf',{path:$ctrl.outUrl})
                // $scope.$apply();
            } else {
                $window.alert('an error occured');
            }
     
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $ctrl.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
};











};

})();
