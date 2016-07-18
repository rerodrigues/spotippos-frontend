'use strict';

angular.module('spotippos.propertyDetails.directives',[])
    .directive('propertyMap', function() {
        return {
            restrict: 'AE',
            replace: true,
            scope : {},
            templateUrl: 'modules/property-details/views/_map.html',
            link : function(scope, elem, attrs){
                var propertyLocation = attrs['propertyLocation'] && JSON.parse(attrs['propertyLocation']);
                if(propertyLocation) { scope.location = propertyLocation; }
            }
        };
    })
    .directive('propertyNavigation', function() {
        return {
            restrict: 'AE',
            scope: {
                'hasNext' : "=",
                'hasPrevious' : '=',
                'navigateTo' : '&navAction'
            },
            templateUrl: 'modules/property-details/views/_navigation.html'
        };
    });
