'use strict';

angular.module('spotippos.propertyDetails.controllers',[])
    .controller('PropertyDetailsController',['$scope', '$rootScope', '$state', '$stateParams', '$filter', 'hotkeys', 'propertyDetailsService', 'ResultsService', 'SPOTIPPOS_BOUNDS',
        function($scope, $rootScope, $state, $stateParams, $filter, hotkeys, propertyDetailsService, ResultsService, SPOTIPPOS_BOUNDS) {

        var navKeys = [
            [['j', 'right'], 'Próxima propriedade', 'next'],
            [['k', 'left'], 'Propriedade anterior', 'previous'],
            [['u', 'backspace'], 'Voltar aos resultados', 'results']
        ];

        navKeys.forEach(function(navKey){
            hotkeys.bindTo($scope).add({
                combo: navKey[0],
                description: navKey[1],
                callback: function(event, hotkey) { $scope.navigateTo(event, navKey[2]); }
            });
        });

        $scope.navigateTo = function(event, action) {
            event.preventDefault();

            var currentIndex = $stateParams.index,
                filteredProperties = ResultsService.filteredProperties,
                propertyIndex;

            if(action=='next'&& (currentIndex >= 0 && currentIndex < filteredProperties.length-1)) {
                propertyIndex = currentIndex+1;
            } else if(action=='previous' && (currentIndex > 0 && filteredProperties.length)) {
                propertyIndex = currentIndex-1;
            }

            if(propertyIndex !== undefined) {
                var property = filteredProperties[propertyIndex];
                $state.go('property.slug', { id: property.id, slug: $filter('slug')(property.title), index: propertyIndex });
            } else if(action=='results') {
                $state.go('results'); //todo: keep filters
            }

        };

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
