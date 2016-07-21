'use strict';

angular.module('spotippos.propertyFilter.directives',[])
    .directive('propertyFilters', function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'modules/property-filter/views/_filters.html',
            controller : 'PropertyFilterController'
        };
    });
