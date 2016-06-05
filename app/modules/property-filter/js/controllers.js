'use strict';

angular.module('spotippos.propertyFilter.controllers',[])
    .controller('propertyFilterController',[ '$scope', '$state', '$stateParams', '$filter',
        function($scope, $state, $stateParams, $filter){
        
        angular.extend($scope, { filters : $filter('compactObj')($stateParams) } );
        
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
        
    }]);