(function () {
    'use strict';

    angular.module('App')
        .component('example', {
            templateUrl: 'components/example.html',
            controller: exampleController
        });

    exampleController.$inject = [];
    function exampleController() {
        var $ctrl = this;
console.log("ahiihihih");
        $ctrl.text="adddddddddddddddddddddddddddddddddddddddddddddddhihi";

    }
})();
