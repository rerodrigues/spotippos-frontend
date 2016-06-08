'use strict';

//tests for app/modules/property-filter/controllers.js
describe('[spotippos.propertyFilter.controllers]', function() {
    beforeEach(module('spotippos.propertyFilter.controllers'));
    beforeEach(module('spotippos.filters'));
    beforeEach(module('ui.router'));
    
    describe('propertyFilterController', function() {
        var stateParams;
        
        beforeEach(inject(function($rootScope, $controller, $state, $filter) {
            
            spyOn($state, 'go').and.callFake(function(state, params) {
                stateParams = params;
            });
            
            var $scope = $rootScope.$new();
            $scope.filters = { baths : "4" };
            
            $controller('propertyFilterController', {
                $scope: $scope, $state: $state, $filter: $filter
            });
            
            $scope.updateFilters();
        }));
        
        it('Should udpate scope filters and redirect to state properties.filtered', inject(function($state) {
            expect($state.go).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('results.filtered', stateParams);
            expect(stateParams).not.toBe(null);
            expect(stateParams.baths).toBe("4");
        }));
        
    });
    
});

//tests for app/modules/results/controllers.js
describe('[spotippos.results.controllers]', function() {
    beforeEach(module('spotippos.results.controllers'));
    beforeEach(module('spotippos.results.services'));
    beforeEach(module('spotippos.results.filters'));
    beforeEach(module('spotippos.config'));
    beforeEach(module('spotippos.filters'));
    beforeEach(module('ui.router'));
    
    describe('resultsController', function() {
        var $httpBackend,
            propertiesFixture,
            ITEMS_PER_PAGE = 2;
            
        beforeEach(inject(function(_$httpBackend_, PROPERTIES_URL) {
            $httpBackend = _$httpBackend_;
            
            fixture.setBase('/');
            
            propertiesFixture = fixture.load(PROPERTIES_URL.replace(/^\//,''));
            $httpBackend.expectGET(new RegExp('^' + PROPERTIES_URL)).respond(propertiesFixture);
        }));
            
        var $scope;
        beforeEach(inject(function($rootScope, $controller, $q, $stateParams, $filter, resultsService) {
            $scope = $rootScope.$new();
            
            $controller('resultsController', {
                $scope: $scope, $q: $q, $stateParams: $stateParams, $filter: $filter,
                resultsService: resultsService, ITEMS_PER_PAGE : ITEMS_PER_PAGE
            });
            
            $httpBackend.flush();
        }));
        
        it('Should retrieve the first page of results', function() {
            expect($scope.properties).not.toBe(undefined);
            expect($scope.properties.length).toBe(ITEMS_PER_PAGE);
            expect($scope.filteredProperties).not.toBe(undefined);
            expect($scope.filteredProperties.length).toBe(propertiesFixture.properties.length);
        });
        
        it('Should retrieve the next page of results', function() {
            $scope.getResults();
            
            expect($scope.properties).not.toBe(undefined);
            expect($scope.properties.length).toBe(ITEMS_PER_PAGE*2);
        });
        
        it('Should listen for $stateChangeSuccess and retrieve a list of filtered results', inject(function($rootScope) {
            $rootScope.$broadcast('$stateChangeSuccess',
                { name : 'results.filtered' }, { beds: "2" }
            );
            
            $rootScope.$apply();
            
            expect($scope.properties).not.toBe(undefined);
            expect($scope.properties.length).toBe(ITEMS_PER_PAGE);
            expect($scope.properties[0].beds).toBe("2");
            expect($scope.properties[$scope.properties.length-1].beds).toBe("2");
            expect($scope.filteredProperties).not.toBe(undefined);
        }));
        
        it('Should reach the end of the results', inject(function($rootScope) {
            $rootScope.$broadcast('$stateChangeSuccess',
                { name : 'results.filtered' }, { id: "5994" }
            );
            
            $rootScope.$apply();
            
            expect($scope.properties).not.toBe(undefined);
            expect($scope.properties.length).toBe(1);
            expect($scope.properties[0].id).toBe("5994");
            expect($scope.filteredProperties).not.toBe(undefined);
            expect($scope.properties.length >= $scope.filteredProperties.length).toBeTruthy();
        }));
        
    });
    
});