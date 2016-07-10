'use strict';

//tests for app/modules/results/controllers.js
describe('[spotippos.results.controllers]', function() {
    beforeEach(module('spotippos.results.controllers'));
    beforeEach(module('spotippos.results.services'));
    beforeEach(module('spotippos.results.filters'));
    beforeEach(module('spotippos.propertyFilter.services'));
    beforeEach(module('spotippos.filters'));
    beforeEach(module('spotippos.config'));
    beforeEach(module('ui.router'));

    describe('ResultsController', function() {
        var $httpBackend,
            propertiesFixture;

        beforeEach(inject(function(_$httpBackend_, PROPERTIES_URL) {
            $httpBackend = _$httpBackend_;

            fixture.setBase('/');

            propertiesFixture = fixture.load(PROPERTIES_URL.replace(/^\//,''));
            $httpBackend.expectGET(new RegExp('^' + PROPERTIES_URL)).respond(propertiesFixture);
        }));

        var $scope;
        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            $controller('ResultsController',
                { $scope: $scope }
            );

            $httpBackend.flush();
        }));

        it('Should retrieve the first page of results', inject(function(ITEMS_PER_PAGE) {
            expect($scope.results).not.toBe(undefined);
            expect($scope.results.properties).not.toBe(undefined);
            expect($scope.results.properties.length).toBe(ITEMS_PER_PAGE);
            expect($scope.results.filteredProperties).not.toBe(undefined);
            expect($scope.results.filteredProperties.length).toBe(propertiesFixture.properties.length);
            expect($scope.results.allProperties).not.toBe(undefined);
            expect($scope.results.allProperties.length).toBe(propertiesFixture.properties.length);
        }));

        it('Should retrieve the next page of results', inject(function(ITEMS_PER_PAGE) {
            $scope.results.nextPage();

            expect($scope.results.properties).not.toBe(undefined);
            expect($scope.results.properties.length).toBe(ITEMS_PER_PAGE*2);
            expect($scope.results.offset).toBe(ITEMS_PER_PAGE*2);
        }));

        it('Should listen for $stateChangeSuccess and retrieve a list of filtered results', inject(function($rootScope) {
            $rootScope.$broadcast('$stateChangeSuccess',
                { name : 'results.filtered' }, { baths: "4" }
            );

            $rootScope.$apply();

            expect($scope.results.properties).not.toBe(undefined);
            expect($scope.results.properties.length).not.toBe(0);
            expect($scope.results.properties[0].baths).toBe("4");
            expect($scope.results.properties[$scope.results.properties.length-1].baths).toBe("4");
            expect($scope.results.filteredProperties).not.toBe(undefined);
        }));

        it('Should reach the end of the results', inject(function($rootScope) {
            $rootScope.$broadcast('$stateChangeSuccess',
                { name : 'results.filtered' }, { id: "5994" }
            );

            $rootScope.$apply();

            expect($scope.results.properties).not.toBe(undefined);
            expect($scope.results.properties.length).toBe(1);
            expect($scope.results.properties[0].id).toBe("5994");
            expect($scope.results.filteredProperties).not.toBe(undefined);
            expect($scope.results.properties.length >= $scope.results.filteredProperties.length).toBeTruthy();
        }));

    });

});
