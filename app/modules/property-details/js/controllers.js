'use strict';

angular.module('spotippos.propertyDetails.controllers',[])
    .controller('PropertyDetailsController',['$scope', '$rootScope', '$state', '$stateParams', '$filter', 'hotkeys', 'propertyDetailsService', 'ResultsService', 'SPOTIPPOS_BOUNDS',
        function($scope, $rootScope, $state, $stateParams, $filter, hotkeys, propertyDetailsService, ResultsService, SPOTIPPOS_BOUNDS) {

        var currentIndex = $stateParams.index,
            filteredProperties = ResultsService.filteredProperties;

        $scope.hasNext = (currentIndex >= 0 && currentIndex < filteredProperties.length-1);
        $scope.hasPrevious = (currentIndex > 0 && filteredProperties.length > 0);
        $scope.navigateTo = function(action) {
            var propertyIndex;

            if(action=='next'&& $scope.hasNext) {
                propertyIndex = currentIndex+1;
            } else if(action=='previous' && $scope.hasPrevious) {
                propertyIndex = currentIndex-1;
            }

            if(propertyIndex !== undefined) {
                var property = filteredProperties[propertyIndex];
                $state.go('property.slug', { id: property.id, slug: $filter('slug')(property.title), index: propertyIndex });
            } else if(action=='results') {
                if(ResultsService.filters) {
                    $state.go('results.filtered', ResultsService.filters);
                } else {
                    $state.go('results');
                }
            }

        };

        var navKeys = [
            [['j', 'right'], 'Próxima propriedade', 'next'],
            [['k', 'left'], 'Propriedade anterior', 'previous'],
            [['u', 'backspace'], 'Voltar aos resultados', 'results']
        ];

        navKeys.forEach(function(navKey){
            hotkeys.bindTo($scope).add({
                combo: navKey[0],
                description: navKey[1],
                callback: function(event, hotkey) {
                    event.preventDefault();
                    $scope.navigateTo(navKey[2]);
                }
            });
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            /* istanbul ignore else */
            if(error.noPropertyId) {
                $state.go("results");
            }
        });

        (function () {
            propertyDetailsService.getPropertyById($stateParams.id).then(function(data){
                $scope.property = data;
                var posX = parseFloat(($scope.property.lat / SPOTIPPOS_BOUNDS.by) * 100).toFixed(2),
                    posY = parseFloat(($scope.property.long / SPOTIPPOS_BOUNDS.bx) * 100).toFixed(2);

                $scope.property.location = { x: posX + '%', y: posY + '%'};
            });
        }());

    }]);
