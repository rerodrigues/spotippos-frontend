'use strict';

angular.module('spotippos.filters',[])
    .filter('currencyToInteger', function(){
        return function(input) {
            return input !== undefined && input !== null ? Number(input.toString().replace(/[.,]\d{2}$|[.,]|([^\d])/g,"")) : undefined;
        };
    }).
    filter('compactObj', function(){
        return function(obj) {
            var compactObj = {};
            
            Object.keys(obj).forEach(function(key) {
                if(obj[key] !== undefined && obj[key] !== null) {
                    compactObj[key] = obj[key];
                }
            });
            
            return compactObj;
        };
    })
    .filter('omitNull', function(){
        return function(obj) {
            var compactObj = {};
            
            Object.keys(obj).forEach(function(key) {
                compactObj[key] = obj[key] !== null ? obj[key] : undefined;
            });
            
            return compactObj;
        };
    })
    .filter('slug', function(){
        return function(str){
            str = str || "";
            return str.replace(/[^0-9a-zA-Z\s]/g,'').replace(/\s/g,'_').toLowerCase();
        };
    });
