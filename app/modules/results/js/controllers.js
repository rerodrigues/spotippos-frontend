'use strict';

angular.module('spotippos.results.controllers',[])
    .controller('resultsController',['$scope','resultsService', function($scope, resultsService){
        $scope.properties = [];
        $scope.totalProperties = 0;
        
        function filterResults(filters) {
            var limit = 10,
                bounds = {
                    ax : 0,
                    ay : 0,
                    bx : 1000,
                    by : 1400
                };
                
            filters = filters || {};
            
            resultsService.filterPropertiesInBounds(bounds, limit, filters).then(
                function(data){
                    $scope.properties = data;
                    $scope.totalProperties = data.length;
                },
                function(err) {
                    console.warn('[Error occured]');
                    console.error(err);
                }
            );
        }
        
        $scope.$on('filtersChanged', function(evt, filters){
            filterResults(filters);
        });
        
        filterResults({});
        
    }]);