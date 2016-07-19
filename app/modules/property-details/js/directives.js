'use strict';

angular.module('spotippos.propertyDetails.directives',[])
    .directive('propertyMap', function() {
        return {
            restrict: 'AE',
            replace: true,
            scope : {
                location : '=propertyLocation'
            },
            templateUrl: 'modules/property-details/views/_map.html'
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
