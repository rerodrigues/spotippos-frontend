'use strict';

angular.module('spotippos.results.controllers',[])
    .controller('resultsController',['$scope','propertyService', function($scope, propertyService){
        $scope.properties = [];
        $scope.totalProperties = 0;
        
        var bounds = {
            ax : 0,
            ay : 0,
            bx : 1000,
            by : 1400
        };
        
        propertyService.getPropertiesInBounds(bounds).then(
            function(data){
                $scope.properties = data.properties;
                $scope.totalProperties = data.foundProperties;
            },
            function(err) {
                console.warn('[Error occured]');
                console.error(err);
            }
        );
    }]);