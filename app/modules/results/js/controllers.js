'use strict';

angular.module('spotippos.results.controllers',[])
    .controller('resultsController',['$rootScope', '$scope', '$q', '$stateParams', 'resultsService', '$filter',
        function($rootScope, $scope, $q, $stateParams, resultsService, $filter){
        
        $scope.properties = [];
        
        angular.extend($scope, { filters : $filter('compactObj')($stateParams) } );
        
        var allProperties = [],
            filteredProperties = [],
            offset = 0,
            itemsPerPage = 2;
            
        
        var filterProperties = function(filters) {
            return $q.resolve(filteredProperties =  $filter('matchCriteria')(allProperties, filters));
        };
        
        var fetchAllProperties = function(bounds) {
            resultsService.getPropertiesInBounds(bounds).then(function(data){
                allProperties = data;
                filterProperties($scope.filters).then(function(){
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
        
        $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams){
            if(toState.name === 'results.filtered') {
                $scope.properties = [];
                offset = 0;
                filterProperties(toParams).then(function(){
                    $scope.getResults();
                });
            }
        });
        
        fetchAllProperties();
        
    }]);