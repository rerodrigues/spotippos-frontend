'use strict';

angular.module('spotippos.propertyFilter.controllers',[])
    .controller('propertyFilterController',['$scope', '$rootScope', 'currencyToIntegerFilter', function($scope, $rootScope, currencyToIntegerFilter){
    
        $scope.updateFilters = function(evt){
            
            var filters = {
                id : $scope.id,
                squareMeters : $scope.squareMeters,
                beds : $scope.beds,
                baths : $scope.baths,
                minPrice : currencyToIntegerFilter($scope.minPrice),
                maxPrice : currencyToIntegerFilter($scope.maxPrice)
            };
            
            $rootScope.$broadcast('filtersChanged', filters);
        };
        
    }]);