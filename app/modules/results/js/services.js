'use strict';

angular.module('spotippos.results.services', [])
    .factory('resultsService',['$http','$q', 'PROPERTIES_URL', function($http, $q, PROPERTIES_URL){
        
        return {
            filterPropertiesInBounds : function(bounds, limit, filters) {
                
                return $http({
                    method  : 'GET',
                    url     : PROPERTIES_URL,
                    params  : bounds
                }).then(function(response){
                    var properties = response.data.properties;
                    
                    if(filters) {
                        properties = properties.filter(function(property){
                            return  (!filters.id || property.id == filters.id) &&
                                    (!filters.squareMeters || property.squareMeters == filters.squareMeters) &&
                                    (!filters.beds || property.beds == filters.beds) &&
                                    (!filters.baths || property.baths == filters.baths)&&
                                    (!filters.minPrice || property.price >= filters.minPrice) &&
                                    (!filters.maxPrice || property.price <= filters.maxPrice);
                        });
                    }
                    
                    properties = properties.slice(0,limit);
                    
                    //Normalize some attributes in the properties
                    properties.map(function(property){
                        
                        //Converts the price to number, so it can be used in orderBy filter;
                        property.price = Number(property.price);
                        
                        //Retrieves random pictures of homes from Flickr and appends it to the property
                        property.picture = 'http://loremflickr.com/298/224/home,living,room/all/?' + property.id;
                        return property;
                    });
                    
                    return $q.resolve(properties);
                
                }, function(error){
                    return $q.reject(error.data);
                });
                
            }
        };
        
    }]);