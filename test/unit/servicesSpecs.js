'use strict';

//tests for app/assets/js/app.js
describe('[APP Config]', function() {
    beforeEach(module('spotippos.config'));
    
    describe('Default bounds', function() {
        it('should return Spotippos full area bounds (0,0,1400,100)', inject(function(SPOTIPPOS_BOUNDS) {
            expect(SPOTIPPOS_BOUNDS).not.toBe(undefined);
            expect(typeof SPOTIPPOS_BOUNDS).toEqual("object");
            expect(SPOTIPPOS_BOUNDS.ax).toBe(0);
            expect(SPOTIPPOS_BOUNDS.ay).toBe(0);
            expect(SPOTIPPOS_BOUNDS.bx).toBe(1000);
            expect(SPOTIPPOS_BOUNDS.by).toBe(1400);
        }));
    });
    
    describe('Endpoint URLs', function() {
        it('should return properties endpoint', inject(function(PROPERTIES_URL) {
            expect(PROPERTIES_URL).not.toBe(undefined);
            expect(PROPERTIES_URL).not.toBe(null);
        }));
        
        it('should return property details endpoint', inject(function(PROPERTY_DETAILS_URL) {
            expect(PROPERTY_DETAILS_URL).not.toBe(undefined);
            expect(PROPERTY_DETAILS_URL).not.toBe(null);
        }));
    });
    
    describe('Items per page', function() {
        it('should return items per page constant', inject(function(ITEMS_PER_PAGE) {
            expect(ITEMS_PER_PAGE).not.toBe(undefined);
            expect(ITEMS_PER_PAGE).not.toBe(null);
            expect(typeof ITEMS_PER_PAGE).toBe("number");
        }));
    });
});

//tests for app/modules/results/js/services.js
describe('[spotippos.results.services]', function() {
    beforeEach(module('spotippos.results.services'));
    beforeEach(module('spotippos.config'));
    
    describe('getPropertiesInBounds', function() {
        var $httpBackend,
            propertiesObj;
            
        beforeEach(inject(function(_$httpBackend_, PROPERTIES_URL) {
            $httpBackend = _$httpBackend_;
            
            fixture.setBase('/');
            
            var propertiesFixture = fixture.load(PROPERTIES_URL.replace(/^\//,''));
            $httpBackend.expectGET(new RegExp('^' + PROPERTIES_URL)).respond(propertiesFixture);
        }));
        
        it('should return all the properties in the given bounds', inject(function(resultsService, SPOTIPPOS_BOUNDS) {
            
            resultsService.getPropertiesInBounds(SPOTIPPOS_BOUNDS).then(function(response) {
                propertiesObj = response;
            });
            
            $httpBackend.flush();
            
            expect(propertiesObj).not.toBe(undefined);
            expect(propertiesObj.length).toBe(21);
            expect(propertiesObj[0].id).not.toBe(undefined);
            expect(propertiesObj[0].picture).not.toBe(undefined);
            expect(typeof propertiesObj[0].price).toBe("number");
            expect(propertiesObj[0].price).toBeLessThan(propertiesObj[propertiesObj.length-1].price);
        }));
    });
});