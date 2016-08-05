'use strict';

angular.module('spotippos', ['ngAnimate', 'ui.router', 'infinite-scroll', 'cfp.hotkeys', 'duScroll',
    'spotippos.config', 'spotippos.controllers', 'spotippos.directives', 'spotippos.filters', 'spotippos.services',
    'spotippos.results', 'spotippos.propertyFilter', 'spotippos.propertyDetails'
]);


angular.module('spotippos.config', [])
    .constant('version', '1.1.0')
    .constant('SPOTIPPOS_BOUNDS', { ax: 0, ay: 0, bx: 1000, by: 1400})

    /* BUILD:LOCAL */.constant('ITEMS_PER_PAGE', 4)
    /* BUILD:LOCAL */.constant('PROPERTIES_URL', '/test/_mock-data/properties.json')
    /* BUILD:LOCAL */.constant('PROPERTY_DETAILS_URL', '/test/_mock-data/property.json?')
    /* BUILD:LOCAL */.constant('HTTP_CACHE_ENABLED', false);

    /* BUILD:ALL .constant('ITEMS_PER_PAGE', 6) */
    /* BUILD:ALL .constant('PROPERTIES_URL', 'http://spotippos.vivareal.com/properties') */
    /* BUILD:ALL .constant('PROPERTY_DETAILS_URL', 'http://spotippos.vivareal.com/properties/') */
    /* BUILD:ALL .constant('HTTP_CACHE_ENABLED', true); */

angular.module('spotippos')
    .config(['$httpProvider', 'HTTP_CACHE_ENABLED', function($httpProvider, HTTP_CACHE_ENABLED) {
        $httpProvider.defaults.cache = HTTP_CACHE_ENABLED;
    }])
    .config(['$animateProvider', function($animateProvider) {
        $animateProvider.classNameFilter(/^((?!(ng-animate-disabled)).)*$/);
    }])
    .config(['hotkeysProvider', function(hotkeysProvider) {
        hotkeysProvider.includeCheatSheet = true;
        hotkeysProvider.templateTitle = 'Atalhos de teclado';
        hotkeysProvider.cheatSheetDescription = 'Exibe / oculta esta tela de ajuda';
    }])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('results', {
                    url: '/results',
                    controller: 'ResultsController',
                    templateUrl: 'modules/results/views/_results.html'
                })
                .state('results.filtered', {
                    url: "/filters?{id:int}&{squareMeters:int}&{beds:int}&{baths:int}&{minPrice:int}&{maxPrice:int}",
                    resolve: {
                        filters: ['$stateParams', '$q', 'compactObjFilter', function($stateParams, $q, compactObjFilter) {
                            var filters = compactObjFilter($stateParams);

                            return Object.keys(filters).length > 0 ? filters :
                                $q.reject({ invalidOrBlankFilters: true });
                        }]
                    }
                })
                .state('property', {
                    url: '/property/:id',
                    controller: 'PropertyDetailsController',
                    templateUrl: 'modules/property-details/views/_details.html',
                    params: {
                        index: { value: -1 }
                    },
                    resolve: {
                        validPropertyId: ['$stateParams', '$q', function($stateParams, $q) {
                            return !isNaN(parseInt($stateParams.id, 10)) ? true :
                                $q.reject({ noPropertyId: true });
                        }]
                    }
                })
                .state('property.slug', {
                    url: "/:slug",
                    resolve: {
                        slug: ['$stateParams', '$state', 'validPropertyId', function($stateParams, $state, validPropertyId) {
                            var slug = $stateParams.slug,
                                validSlug = typeof slug === "string" && slug.replace(/\s/g, '').length > 0;

                            return validSlug || $state.go('property', { id: $stateParams.id }, { location: 'replace' });
                        }]
                    }
                });

            $urlRouterProvider.otherwise('/results');
            $locationProvider.html5Mode(false);
        }
    ]);
