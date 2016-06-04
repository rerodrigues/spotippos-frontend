'use strict';

angular.module('spotippos',[ 'ui.router', 'ngCookies',
    'spotippos.config', 'spotippos.controllers','spotippos.directives','spotippos.filters','spotippos.services',
    'spotippos.results', 'spotippos.propertyFilter'
]);


angular.module('spotippos.config',[])
    .constant('version','1.0')
    
    /* BUILD:LOCAL */ .constant('PROPERTIES_URL', '/_mock/properties_4.json')
    /* BUILD:LOCAL */ .constant('HTTP_CACHE_ENABLED', false);
    
    /* BUILD:ALL .constant('PROPERTIES_URL', 'http://spotippos.vivareal.com/properties') */
    /* BUILD:ALL .constant('HTTP_CACHE_ENABLED', true); */
    
angular.module('spotippos')
    .config([
        '$httpProvider', 'HTTP_CACHE_ENABLED',
        function($httpProvider, HTTP_CACHE_ENABLED){
            $httpProvider.defaults.cache = HTTP_CACHE_ENABLED;
    }]);
    
    /*
    .config([
        '$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider){
            $stateProvider
            .state('index', {
                url: "/",
            })
            .state('results', {
                url: "/results",
                controller:'resultsController',
                templateUrl:'modules/results/views/results.html',
            });
            
            $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode(false);
    }])
    .config(['$cookiesProvider', function($cookiesProvider){
        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        $cookiesProvider.defaults.expires = expirationDate;
    }]);
    */