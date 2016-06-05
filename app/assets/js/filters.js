'use strict';

angular.module('spotippos.filters',[])
    .filter('currencyToInteger', function(){
        return function(input) {
            return input !== undefined && input !== null ? Number(input.toString().replace(/[.,]\d{2}$|[.,]|([^\d])/g,"")) : null;
        };
    });