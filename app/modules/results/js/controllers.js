'use strict';

angular.module('spotippos.results.controllers',[])
    .controller('resultsController',['$rootScope', '$scope', '$q', '$stateParams', '$filter', 'resultsService', 'ITEMS_PER_PAGE',
        function($rootScope, $scope, $q, $stateParams, $filter, resultsService, ITEMS_PER_PAGE){
        
        $scope.properties = [];
        
        angular.extend($scope, { filters : $filter('compactObj')($stateParams) } );
        
        var allProperties = [],
            filteredProperties = [],
            offset = 0,
            itemsPerPage = ITEMS_PER_PAGE;
            
        
        var filterProperties = function(filters) {
            return $q.resolve(filteredProperties =  $filter('matchCriteria')(allProperties, filters));
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
        
        (function () {
            resultsService.getPropertiesInBounds().then(function(data){
                allProperties = data;
                filterProperties($scope.filters).then(function(){
                    $scope.getResults();
                });
            });
        }());
        
    }]);