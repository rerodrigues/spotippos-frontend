'use strict';

angular.module('spotippos.results.filters',[])
    .filter('matchCriteria', function() {
        return function(properties, filters) {
            filters = filters || {};
            
            return properties.filter(function(property){
                return  (!filters.id || property.id == filters.id) &&
                        (!filters.squareMeters || property.squareMeters == filters.squareMeters) &&
                        (!filters.beds || property.beds == filters.beds) &&
                        (!filters.baths || property.baths == filters.baths)&&
                        (!filters.minPrice || property.price >= filters.minPrice) &&
                        (!filters.maxPrice || property.price <= filters.maxPrice);
            });
        };
    });
