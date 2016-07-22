'use strict';

//tests for app/assets/js/app.js
describe('[spotippos.config]', function() {
    beforeEach(module('spotippos.config'));

    describe('Version', function() {
        it('should return the app version', inject(function(version) {
            expect(version).toBeDefined();
        }));
    });

    describe('Default bounds', function() {
        it('should return Spotippos full area bounds (0,0,1400,100)', inject(function(SPOTIPPOS_BOUNDS) {
            expect(SPOTIPPOS_BOUNDS).toBeDefined();
            expect(typeof SPOTIPPOS_BOUNDS).toBe("object");
            expect(SPOTIPPOS_BOUNDS.ax).toBe(0);
            expect(SPOTIPPOS_BOUNDS.ay).toBe(0);
            expect(SPOTIPPOS_BOUNDS.bx).toBe(1000);
            expect(SPOTIPPOS_BOUNDS.by).toBe(1400);
        }));
    });

    describe('Items per page', function() {
        it('should return items per page constant', inject(function(ITEMS_PER_PAGE) {
            expect(ITEMS_PER_PAGE).toBeDefined();
            expect(ITEMS_PER_PAGE).not.toBeNull();
            expect(typeof ITEMS_PER_PAGE).toBe("number");
        }));
    });

    describe('Endpoint URLs', function() {
        it('should return properties endpoint', inject(function(PROPERTIES_URL) {
            expect(PROPERTIES_URL).toBeDefined();
            expect(PROPERTIES_URL).not.toBeNull();
        }));

        it('should return property details endpoint', inject(function(PROPERTY_DETAILS_URL) {
            expect(PROPERTY_DETAILS_URL).toBeDefined();
            expect(PROPERTY_DETAILS_URL).not.toBeNull();
        }));
    });

    describe('$HTTP cache enabled', function() {
        it('should return the app version', inject(function(HTTP_CACHE_ENABLED) {
            expect(HTTP_CACHE_ENABLED).toBeDefined();
        }));
    });

});

//tests for app/assets/js/app.js
describe('[APP Config blocks]', function () {

    beforeEach(module('spotippos'));

    describe('[$http]', function () {
        var _httpProvider;

        beforeEach(function () {
            module(function ($httpProvider) {
                _httpProvider = $httpProvider;
            });
            inject();
        });

        it('should have defaults.cache configured', inject(function (HTTP_CACHE_ENABLED) {
            expect(_httpProvider.defaults.cache).toBe(HTTP_CACHE_ENABLED);
        }));
    });

    describe('[ngAnimate]', function () {
        var _animateProvider;

        beforeEach(function () {
            module(function ($animateProvider) {
                _animateProvider = $animateProvider;
            });
            inject();
        });

        it('should have classNameFilter configured', inject(function (HTTP_CACHE_ENABLED) {
            expect(_animateProvider.classNameFilter).toBeDefined();
        }));
    });

    describe('[cfp.hotkeys]', function () {
        var _hotkeysProvider;

        beforeEach(function () {
            module(function (hotkeysProvider) {
                _hotkeysProvider = hotkeysProvider;
            });
            inject();
        });

        it('should be configured', inject(function (HTTP_CACHE_ENABLED) {
            expect(_hotkeysProvider.includeCheatSheet).toBeDefined();
            expect(_hotkeysProvider.templateTitle).toBeDefined();
            expect(_hotkeysProvider.cheatSheetDescription).toBeDefined();
        }));
    });

    describe('[ui.router]', function () {
        var locationProvider, stateProvider;

        beforeEach(function () {
            module(function ($locationProvider, $stateProvider) {
                locationProvider = $locationProvider;
                stateProvider = $stateProvider;
            });
            inject();
        });

        it('should test if html5Mode is disabled', function () {
            expect(locationProvider.html5Mode().enabled).toBe(false);
        });
    });

});
