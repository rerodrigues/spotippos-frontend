'use strict';

angular.module('spotippos.results.services', [])
    .factory('propertyService',['$http','$q', 'PROPERTIES_URL', function($http, $q, PROPERTIES_URL){
        
        return {
            getPropertiesInBounds : function(bounds) {
                
                return $http({
                    method  : 'GET',
                    url     : PROPERTIES_URL,
                    params    : bounds,
                }).then(function(response){
                    
                    //Normalize some attributes in the properties
                    response.data.properties.map(function(property){
                        
                        //Converts the price to number, so it can be used in orderBy filter;
                        property.price = Number(property.price);
                        
                        //Retrieves random pictures of homes from Flickr and appends it to the property
                        property.picture = 'http://loremflickr.com/298/224/home,living,room/all/?' + property.id;
                        return property;
                    });
                    
                    return $q.resolve(response.data);
                
                }, function(error){
                    return $q.reject(error.data);
                });
                
            }
        };
        
    }]);