'use strict';

angular.module('spotippos.results.controllers', [])
    .controller('ResultsController', ['$rootScope', '$scope', '$state', 'ResultsService', 'PropertyService', 'compactObjFilter',
        function($rootScope, $scope, $state, ResultsService, PropertyService, compactObjFilter) {

            $scope.results = ResultsService;

            angular.extend($scope, {
                filters: compactObjFilter($state.params)
            });

            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
                if (error.invalidOrBlankFilters) {
                    $state.go("results");
                }
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                if (toState.name === 'results' || toState.name === 'results.filtered') {
                    ResultsService.filterProperties(toParams).then(function() {
                        ResultsService.nextPage();
                    });
                }
            });

            (function() {
                PropertyService.getPropertiesInBounds().then(function(data) {
                    ResultsService.allProperties = data;
                    ResultsService.filterProperties($scope.filters).then(function() {
                        ResultsService.nextPage();
                    });
                });
            }());

        }
    ]);
