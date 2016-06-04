'use strict';

angular.module('spotippos.propertyFilter.controllers',[])
    .controller('propertyFilterController',['$scope', '$rootScope', function($scope, $rootScope){
    
        $scope.updateFilters = function(evt){
            
            var filters = {
                id : $scope.id,
                squareMeters : $scope.squareMeters,
                beds : $scope.beds,
                baths : $scope.baths,
                minPrice : $scope.minPrice,
                maxPrice : $scope.maxPrice
            };
            
            $rootScope.$broadcast('filtersChanged', filters);
        };
        
    }]);