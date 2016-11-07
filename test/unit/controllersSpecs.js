'use strict';

//tests for app/modules/results/js/controllers.js
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

        it('should retrieve the first page of results', inject(function(ITEMS_PER_PAGE) {
            expect($scope.results).toBeDefined();
            expect($scope.results.properties).toBeDefined();
            expect($scope.results.properties.length).toBe(ITEMS_PER_PAGE);
            expect($scope.results.filteredProperties).toBeDefined();
            expect($scope.results.filteredProperties.length).toBe(propertiesFixture.properties.length);
            expect($scope.results.allProperties).toBeDefined();
            expect($scope.results.allProperties.length).toBe(propertiesFixture.properties.length);
            expect($scope.results.offset).toBe(ITEMS_PER_PAGE);
        }));

        it('should retrieve the next page of results', inject(function(ITEMS_PER_PAGE) {
            $scope.results.nextPage();

            expect($scope.results.offset).toBeDefined();
            expect($scope.results.offset).toBe(ITEMS_PER_PAGE*2);
            expect($scope.results.properties).toBeDefined();
            expect($scope.results.properties.length).toBe($scope.results.offset);
        }));

        it('should listen for $stateChangeSuccess and retrieve a list of filtered results', inject(function($rootScope) {
            $rootScope.$broadcast('$stateChangeSuccess',
                { name : 'results.filtered' }, { baths: "4" }
            );

            $rootScope.$apply();

            expect($scope.results.properties).toBeDefined();
            expect($scope.results.properties.length).not.toBe(0);
            expect($scope.results.properties[0].baths).toBe("4");
            expect($scope.results.properties[$scope.results.properties.length-1].baths).toBe("4");
            expect($scope.results.filteredProperties).toBeDefined();
        }));

        it('should listen for $stateChangeSuccess and ignore an unknown state name', inject(function($rootScope) {
            spyOn($scope.results, 'filterProperties');

            $rootScope.$broadcast('$stateChangeSuccess',
                { name : 'unknownFakeMockedState' }
            );

            $rootScope.$apply();

            expect($scope.results.filterProperties).not.toHaveBeenCalled();
        }));

        it('should listen for $stateChangeError and redirect to "results" state', inject(function($rootScope, $state, ITEMS_PER_PAGE) {
            spyOn($state, 'go');

            $rootScope.$broadcast('$stateChangeError',
                { name : 'results.filtered' },{},{},{},{ invalidOrBlankFilters: true }
            );

            $rootScope.$apply();

            expect($scope.results).toBeDefined();
            expect($scope.results.properties).toBeDefined();
            expect($scope.results.properties.length).toBe(ITEMS_PER_PAGE);
            expect($scope.results.filteredProperties).toBeDefined();
            expect($scope.results.filteredProperties.length).toBe(propertiesFixture.properties.length);
            expect($scope.results.allProperties).toBeDefined();
            expect($scope.results.allProperties.length).toBe(propertiesFixture.properties.length);
            expect($state.go).toHaveBeenCalledWith('results');
        }));

        it('should listen for $stateChangeError and ignore an unknown error', inject(function($rootScope, $state, ITEMS_PER_PAGE) {
            spyOn($state, 'go');

            $rootScope.$broadcast('$stateChangeError',
                { name : 'results.filtered' },{},{},{},{ unknowFakeMockedError: true }
            );

            $rootScope.$apply();

            expect($state.go).not.toHaveBeenCalled();
        }));

        it('should reach the end of the results', inject(function($rootScope) {
            $rootScope.$broadcast('$stateChangeSuccess',
                { name : 'results.filtered' }, { id: "5994" }
            );

            $rootScope.$apply();

            expect($scope.results).toBeDefined();
            expect($scope.results.properties).toBeDefined();
            expect($scope.results.properties.length).toBe(1);
            expect($scope.results.properties[0].id).toBe("5994");
            expect($scope.results.filteredProperties).toBeDefined();
            expect($scope.results.filteredProperties.length).toBe(1);
            expect($scope.results.properties.length >= $scope.results.filteredProperties.length).toBeTruthy();
        }));

    });

});

//tests for app/modules/property-filter/js/controllers.js
describe('[spotippos.propertyFilter.controllers]', function() {
    beforeEach(module('spotippos.propertyFilter.controllers'));
    beforeEach(module('spotippos.filters'));
    beforeEach(module('ui.router'));

    describe('PropertyFilterController', function() {
        var $scope;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            $controller('PropertyFilterController',
                { $scope: $scope }
            );

            $scope.results = {
                filters : {}
            };

            $scope.$apply();
        }));

        it('should listen for $stateChangeError and redirect to "results" state', inject(function($state) {
            spyOn($state, 'go');

            $scope.updateFilters();

            expect($state.go).toHaveBeenCalled();
        }));

    });

});

//tests for app/modules/results/js/controllers.js
describe('[spotippos.propertyDetails.controllers]', function() {
    beforeEach(module('spotippos.propertyDetails.controllers'));
    beforeEach(module('spotippos.propertyDetails.services'));
    beforeEach(module('spotippos.results.services'));
    beforeEach(module('spotippos.results.filters'));
    beforeEach(module('spotippos.config'));
    beforeEach(module('ui.router'));
    beforeEach(module('cfp.hotkeys'));

    describe('PropertyDetailsController', function() {
        var $httpBackend,
            propertyFixture;

        beforeEach(inject(function(_$httpBackend_, PROPERTY_DETAILS_URL) {
            $httpBackend = _$httpBackend_;

            fixture.setBase('/');

            propertyFixture = fixture.load(PROPERTY_DETAILS_URL.replace(/^\/+/,'') + '1.json');
            $httpBackend.expectGET(new RegExp('^' + PROPERTY_DETAILS_URL)).respond(propertyFixture);
        }));

        var $scope;
        beforeEach(inject(function($rootScope, $controller, $stateParams) {
            $scope = $rootScope.$new();
            $stateParams.id = 1;
            $stateParams.index = 2;

            $controller('PropertyDetailsController',
                { $scope: $scope },
                { $stateParams: $stateParams}
            );

            $httpBackend.flush();
        }));

        it('should display property information without pagination', function() {
            expect($scope.hasNext).toBeFalsy();
            expect($scope.hasPrevious).toBeFalsy();
        });

        it('should navigate to next via hotkey', inject(function() {
            spyOn($scope, 'navigateTo').and.callThrough();
            KeyEvent.simulate('j'.charCodeAt(0), 90);
            expect($scope.navigateTo).toHaveBeenCalledWith('next');
        }));

        it('should navigate to previous via hotkey', inject(function() {
            spyOn($scope, 'navigateTo').and.callThrough();
            KeyEvent.simulate('k'.charCodeAt(0), 90);
            expect($scope.navigateTo).toHaveBeenCalledWith('previous');
        }));

        it('should navigate back to results via hotkey', inject(function($state) {
            spyOn($state, 'go');
            spyOn($scope, 'navigateTo').and.callThrough();

            KeyEvent.simulate('u'.charCodeAt(0), 90);
            expect($scope.navigateTo).toHaveBeenCalledWith('results');
            expect($state.go).toHaveBeenCalledWith('results');
        }));

        it('should listen for $stateChangeError and redirect to "results" state', inject(function($rootScope, $state) {
            spyOn($state, 'go');

            $rootScope.$broadcast('$stateChangeError',
                { name : 'property' },{},{},{},{ noPropertyId: true }
            );

            $rootScope.$apply();

            expect($state.go).toHaveBeenCalledWith('results');
        }));

    });

});
