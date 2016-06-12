'use strict';

angular.module('spotippos.propertyFilter.directives',[])
    .directive('propertyFilters', function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'modules/property-filter/views/_filters.html',
            controller : ['$scope', '$state', '$filter', function ($scope, $state, $filter) {
                
                $scope.updateFilters = function(evt){
                    
                    var newFilters = $filter('omitNull')({
                        id : $scope.filters.id,
                        squareMeters : $scope.filters.squareMeters,
                        beds : $scope.filters.beds,
                        baths : $scope.filters.baths,
                        minPrice : $filter('currencyToInteger')($scope.filters.minPrice),
                        maxPrice : $filter('currencyToInteger')($scope.filters.maxPrice)
                    });
                    
                    $state.go('results.filtered', newFilters);
                };
                
            }]
        };
    });
