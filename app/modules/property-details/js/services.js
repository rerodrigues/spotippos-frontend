'use strict';

angular.module('spotippos.propertyDetails.services', [])
    .factory('propertyDetailsService',['$http','$q', 'PROPERTY_DETAILS_URL', function($http, $q, PROPERTY_DETAILS_URL){
        
        return {
            getPropertyById : function(id) {
                if(typeof id !== "number") {
                    $q.reject({ message: 'No ID suppplied' });
                }
                
                return $http({
                    method  : 'GET',
                    url     : [PROPERTY_DETAILS_URL, id].join('')
                }).then(function(response){
                    var property = response.data;
                    
                    //Normalize some attributes in the properties
                    
                    //Converts the price to number, so it can be used in orderBy filter;
                    property.price = Number(property.price);
                    
                    //Retrieves random pictures of homes from Flickr and appends it to the property
                    property.picture = 'http://loremflickr.com/298/224/home,living,room/all/?' + property.id;
                    
                    return $q.resolve(property);
                    
                }, function(error){
                    return $q.reject(error.data);
                });
                
            }
        };
        
    }]);
