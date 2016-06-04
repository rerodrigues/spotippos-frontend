'use strict';

angular.module('spotippos.directives',[])
    .directive('delegateEvent', function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attributes) {            
                var params = attributes.delegateEvent.split(/\s*,\s*/g);
                
                if(params.length === 3) {
                    var handler = params[2].split('.').reduce(function ($scope, param) { return $scope[param]; }, $scope); 
                    element.on(params[0], params[1], function (evt) {
                        if (typeof handler === "function") { handler(evt); }
                    });
                }
            }
        };
    });