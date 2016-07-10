'use strict';

angular.module('spotippos.propertyFilter.services', [])
    .service('PropertyService', ['$http', '$q', 'SPOTIPPOS_BOUNDS', 'PROPERTIES_URL',
        function($http, $q, SPOTIPPOS_BOUNDS, PROPERTIES_URL) {

            return {
                getPropertiesInBounds: function(bounds) {
                    bounds = bounds || SPOTIPPOS_BOUNDS;

                    return $http({
                        method: 'GET',
                        url: PROPERTIES_URL,
                        params: bounds
                    }).then(function success(response) {
                        var properties = response.data.properties;

                        //Normalize some attributes in the properties
                        properties.map(function(property) {

                            //Converts the price to number, so it can be used in orderBy filter;
                            property.price = Number(property.price);

                            //Retrieves random pictures of homes from Flickr and appends it to the property
                            property.picture = 'http://loremflickr.com/298/224/home,living,room/all/?' + property.id;
                            return property;
                        });

                        properties.sort(function(a, b) {
                            return a.price - b.price;
                        });

                        return $q.resolve(properties);

                    }, function error(err) {
                        return $q.reject(err.data);
                    });

                }
            };
        }
    ]);
