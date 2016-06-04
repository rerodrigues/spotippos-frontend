'use strict';

angular.module('spotippos.filters',[])
    .filter('currencyToInteger', function(){
        return function(input) {
            return input !== undefined ? Number(input.toString().replace(/[.,]\d{2}$|[.,]|([^\d])/g,"")) : undefined;
        };
    });