'use strict';

angular.module('spotippos.directives',[])
    .directive('delegateEvent', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var params = attrs.delegateEvent.split(/\s*,\s*/g);

                /* istanbul ignore else */
                if(params.length === 3) {
                    var handler = params[2].split('.').reduce(function (scope, param) { return scope[param]; }, scope);
                    elem.on(params[0], params[1], function (evt) {
                        /* istanbul ignore else */
                        if (typeof handler === "function") { handler(evt); }
                    });
                }
            }
        };
    });
