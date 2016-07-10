'use strict';

angular.module('spotippos.propertyDetails.controllers',[])
    .controller('PropertyDetailsController',['$rootScope', '$scope', '$state', '$stateParams', '$filter', 'propertyDetailsService', 'SPOTIPPOS_BOUNDS',
        function($rootScope, $scope, $state, $stateParams, $filter, propertyDetailsService, SPOTIPPOS_BOUNDS) {

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            if(error.noPropertyId) {
                $state.go("results");
            }
        });

        (function () {
            propertyDetailsService.getPropertyById($stateParams.id).then(function(data){
                $scope.property = data;
                var posX = parseFloat(($scope.property.lat / SPOTIPPOS_BOUNDS.by) * 100).toFixed(2),
                    posY = parseFloat(($scope.property.long / SPOTIPPOS_BOUNDS.bx) * 100).toFixed(2);

                $scope.location = { x: posX + '%', y: posY + '%'};
            });
        }());

    }]);
