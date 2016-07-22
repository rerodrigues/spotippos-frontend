'use strict';

//tests for app/modules/property-filter/js/services.js
describe('[spotippos.propertyFilter.services]', function() {
    beforeEach(module('spotippos.propertyFilter.services'));
    beforeEach(module('spotippos.config'));

    describe('getPropertiesInBounds', function() {
        var $httpBackend,
            propertiesObj,
            propertiesFixture;

        beforeEach(inject(function(_$httpBackend_, PROPERTIES_URL) {
            $httpBackend = _$httpBackend_;
            propertiesObj = undefined;

            fixture.setBase('/');
            propertiesFixture = fixture.load(PROPERTIES_URL.replace(/^\//,''));
        }));

        it('should return all the properties in the given bounds', inject(function(PropertyService, PROPERTIES_URL, SPOTIPPOS_BOUNDS) {
            $httpBackend.expectGET(new RegExp('^' + PROPERTIES_URL)).respond(propertiesFixture);

            PropertyService.getPropertiesInBounds(SPOTIPPOS_BOUNDS).then(function(response) {
                propertiesObj = response;
            });

            $httpBackend.flush();

            expect(propertiesObj).toBeDefined();
            expect(propertiesObj.length).toBe(21);
            expect(propertiesObj[0].id).toBeDefined();
            expect(propertiesObj[0].picture).toBeDefined();
            expect(typeof propertiesObj[0].price).toBe("number");
            expect(propertiesObj[0].price).toBeLessThan(propertiesObj[propertiesObj.length-1].price);
        }));

        it('should try to get the properties in the bounds and return an HTTP error', inject(function(PropertyService, PROPERTIES_URL, SPOTIPPOS_BOUNDS) {
            $httpBackend.expectGET(new RegExp('^' + PROPERTIES_URL)).respond(400, {"error" : { "type": "fake", "message": "Mocked error"}});

            PropertyService.getPropertiesInBounds(SPOTIPPOS_BOUNDS).catch(function(response) {
                propertiesObj = response;
            });

            $httpBackend.flush();

            expect(propertiesObj).toBeDefined();
            expect(propertiesObj.error).toBeDefined();
            expect(propertiesObj.error.type).toBe('fake');
        }));
    });
});

//tests for app/modules/property-details/js/services.js
describe('[spotippos.propertyDetails.services]', function() {
    beforeEach(module('spotippos.propertyDetails.services'));
    beforeEach(module('spotippos.config'));

    describe('getPropertyById', function() {
        var $httpBackend,
            property,
            propertyFixture,
            propertyId = 1;

        beforeEach(inject(function(_$httpBackend_, PROPERTY_DETAILS_URL) {
            $httpBackend = _$httpBackend_;
            property = undefined;

            fixture.setBase('/');
            propertyFixture = fixture.load(PROPERTY_DETAILS_URL.replace(/^\//,'').replace(/\?$/,''));
        }));

        it('should return the property with the given id', inject(function(propertyDetailsService, PROPERTY_DETAILS_URL) {
            $httpBackend.expectGET(new RegExp('^' + PROPERTY_DETAILS_URL)).respond(propertyFixture);

            propertyDetailsService.getPropertyById(propertyId).then(function(response) {
                property = response;
            });

            $httpBackend.flush();

            expect(property).toBeDefined();
            expect(property.id).toBe('1');
            expect(property.picture).toBeDefined();
            expect(typeof property.price).toBe("number");
        }));

        it('should try to get a property by id and return an HTTP error', inject(function(propertyDetailsService, PROPERTY_DETAILS_URL) {
            $httpBackend.expectGET(new RegExp('^' + PROPERTY_DETAILS_URL)).respond(400, {"error" : { "type": "fake", "message": "Mocked error"}});

            propertyDetailsService.getPropertyById(propertyId).catch(function(response) {
                property = response;
            });

            $httpBackend.flush();

            expect(property).toBeDefined();
            expect(property.error).toBeDefined();
            expect(property.error.type).toBe('fake');
        }));


        it('should try to get a property with an invalid id and return an error', inject(function($rootScope, propertyDetailsService, PROPERTY_DETAILS_URL) {
            propertyDetailsService.getPropertyById('').catch(function(response) {
                property = response;
            });

            $rootScope.$apply();

            expect(property).toBeDefined();
            expect(property.error).toBeDefined();
            expect(property.error.message).toBe('No ID suppplied');
        }));

    });

});
