'use strict';

angular.module('spotippos.results.services', [])
    .service('ResultsService', ['$q', 'ITEMS_PER_PAGE', 'matchCriteriaFilter',
        function($q, ITEMS_PER_PAGE, matchCriteriaFilter) {

            return {
                offset: 0,
                properties: [],
                allProperties: [],
                filteredProperties: [],
                itemsPerPage: ITEMS_PER_PAGE,

                filterProperties: function(filters) {
                    this.properties = [];
                    this.offset = 0;
                    return $q.resolve(this.filteredProperties = matchCriteriaFilter(this.allProperties, filters));
                },
                nextPage: function() {
                    var properties = this.filteredProperties.slice(this.offset, (this.offset + this.itemsPerPage));
                    this.properties = this.properties.concat(properties);
                    this.offset += properties.length;
                }
            };
        }
    ]);
