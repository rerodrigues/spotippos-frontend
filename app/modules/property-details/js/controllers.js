'use strict';

angular.module('spotippos.propertyDetails.controllers',[])
    .controller('propertyDetailsController',['$rootScope', '$scope', '$state', '$stateParams', '$filter', 'propertyDetailsService', 'SPOTIPPOS_BOUNDS',
		function($rootScope, $scope, $state, $stateParams, $filter, propertyDetailsService, SPOTIPPOS_BOUNDS) {
		
		$scope.goBack = function() {
			$state.go("results");
		};
		
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            if(error.noPropertyId) {
                $state.go("results");
            }
        });
		
        (function () {
            propertyDetailsService.getPropertyById($stateParams.id).then(function(data){
                $scope.property = data;
                
                var map = { width: 298, height: 213 }; //todo
                
                var proportion = SPOTIPPOS_BOUNDS.by / map.width;
                
                $scope.posX = Math.ceil($scope.property.lat / proportion) + 'px';
                $scope.posY = Math.ceil($scope.property.long / proportion) + 'px';
            });
        }());
        
    }]);