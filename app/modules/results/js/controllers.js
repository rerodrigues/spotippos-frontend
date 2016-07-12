'use strict';

angular.module('spotippos.results.controllers', [])
    .controller('ResultsController', ['$rootScope', '$scope', '$state', 'ResultsService', 'PropertyService', 'compactObjFilter',
        function($rootScope, $scope, $state, ResultsService, PropertyService, compactObjFilter) {

            $scope.results = ResultsService;

            angular.extend($scope.results, {
                filters: compactObjFilter($state.params)
            });

            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
                if (error.invalidOrBlankFilters) {
                    $state.go("results");
                }
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                if (toState.name === 'results' || toState.name === 'results.filtered') {
                    $scope.results.filterProperties(toParams).then(function() {
                        $scope.results.nextPage();
                    });
                }
            });

            (function() {
                PropertyService.getPropertiesInBounds().then(function(data) {
                    $scope.results.allProperties = data;
                    $scope.results.filterProperties($scope.results.filters).then(function() {
                        $scope.results.nextPage();
                    });
                });
            }());

        }
    ]);
