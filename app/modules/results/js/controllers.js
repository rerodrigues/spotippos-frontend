'use strict';

angular.module('spotippos.results.controllers',[])
    .controller('resultsController',['$scope','$q', 'resultsService', 'matchCriteriaFilter', function($scope, $q, resultsService, matchCriteriaFilter){
        $scope.properties = [];
        
        var allProperties = [],
            filteredProperties = [],
            offset = 0,
            itemsPerPage = 2;
            
        
        var filterProperties = function(filters) {
            return $q.resolve(filteredProperties = matchCriteriaFilter(allProperties, filters));
        };
        
        var fetchAllProperties = function(bounds) {
            resultsService.getPropertiesInBounds(bounds).then(function(data){
                allProperties = data;
                filterProperties({}).then(function(){
                    $scope.getResults();
                });
            });
        };
        
        $scope.getResults = function() {
            var results = filteredProperties.slice(offset, (offset + itemsPerPage));
            $scope.properties = $scope.properties.concat(results);
            offset += results.length;
            $scope.endReached = offset >= filteredProperties.length;
        };
        
        $scope.$on('filtersChanged', function(evt, filters){     
            $scope.properties = [];
            offset = 0;
            filterProperties(filters).then(function(){
                $scope.getResults();
            });
        });
        
        fetchAllProperties();
        
    }]);