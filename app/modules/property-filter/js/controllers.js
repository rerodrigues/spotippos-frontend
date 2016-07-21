'use strict';

angular.module('spotippos.propertyFilter.controllers',[])
    .controller('PropertyFilterController', ['$scope', '$state', '$filter', function ($scope, $state, $filter) {
        $scope.updateFilters = function(evt){

            var filters = $scope.results.filters,
                newFilters = $filter('omitNull')({
                id : filters.id,
                squareMeters : filters.squareMeters,
                beds : filters.beds,
                baths : filters.baths,
                minPrice : $filter('currencyToInteger')(filters.minPrice),
                maxPrice : $filter('currencyToInteger')(filters.maxPrice)
            });

            $state.go('results.filtered', newFilters);
        };
    }]);
