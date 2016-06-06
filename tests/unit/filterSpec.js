'use strict';

//tests for app/assets/js/filters.js
describe('[spotippos.filters]', function() {
    beforeEach(module('spotippos.filters'));

    var testObj = {
        k1 : null, k2 : undefined,
        k3 : 'string', k4 : 1000,
        k5 : 0, k6 : false, k7 : NaN,
        k8 : [1, 2], k9 : { a: 1, b : 2 },
        k10 : function(){ return true; }
    };
    
    describe('currencyToInteger', function() {
        var string1 = 'R$ 1.000.000,00',
            string2 = '1.000.000',
            string3 = '1,0..¥0£0..0,0';
        
        it('Should convert a currency formatted string to a Number object', inject(function(currencyToIntegerFilter) {
            
            expect(typeof currencyToIntegerFilter(string1)).toBe("number");
            expect(typeof currencyToIntegerFilter(string2)).toBe("number");
            expect(typeof currencyToIntegerFilter(string3)).toBe("number");
        }));
        
    });
    
    describe('compactObj', function() {
        
        it('Should remove all the undefined and null values from an object', inject(function(compactObjFilter) {
            var resultObj = compactObjFilter(testObj);
            
            expect(Object.keys(resultObj).length).toBe(8);
            expect(typeof resultObj.k1).toBe("undefined");
            expect(typeof resultObj.k2).toBe("undefined");
            expect(resultObj.k8[0]).toBe(1);
            expect(resultObj.k9.a).toBe(1);
            expect(resultObj.k10()).toBeTruthy();
        }));
        
    });
    
    describe('omitNull', function() {
        
        it('Should remove all null values from an object', inject(function(omitNullFilter) {
            var resultObj = omitNullFilter(testObj);
            
            expect(Object.keys(resultObj).length).toBe(10);
            expect(typeof resultObj.k1).toBe("undefined");
            expect(typeof resultObj.k2).toBe("undefined");
            expect(resultObj.k8[0]).toBe(1);
            expect(resultObj.k9.a).toBe(1);
            expect(resultObj.k10()).toBeTruthy();
        }));
        
    });
    
});

//tests for app/modules/results/js/filters.js
describe('[spotippos.results.filters]', function() {
    beforeEach(module('spotippos.results.filters'));
    beforeEach(module('spotippos.config'));
    
    describe('matchCriteria', function() {
        var propertiesFixture;
        
        beforeEach(inject(function(PROPERTIES_URL) {
            fixture.setBase('/');
            propertiesFixture = fixture.load(PROPERTIES_URL.replace(/^\//,''));
        }));
        
        it('Should return only one property which matches all criteria', inject(function(matchCriteriaFilter) {
            var criteria = { id : 1825, squareMeters: 50, beds: 2, baths: 1, minPrice: 537000, maxPrice: 537000 },
                filtered = matchCriteriaFilter(propertiesFixture.properties, criteria);
            
            expect(filtered.length).toBe(1);
            expect(filtered[0]['lat']).toBe("50");
            expect(filtered[0]['long']).toBe("48");
            expect(filtered[0]['id']).toBe("1825");
            expect(filtered[0]['squareMeters']).toBe("50");
            expect(filtered[0]['beds']).toBe("2");
            expect(filtered[0]['baths']).toBe("1");
            expect(filtered[0]['price']).toBe("537000");
            
        }));
        
        it('Should return only properties with id 2546', inject(function(matchCriteriaFilter) {
            var criteria = { id: 2546 },
                filtered = matchCriteriaFilter(propertiesFixture.properties, criteria);
            
            expect(filtered.length).toBe(1);
            expect(filtered[0]['id']).toBe("2546");
            
        }));
        
        it('Should return only properties with 62 square meters', inject(function(matchCriteriaFilter) {
            var criteria = { squareMeters: 62 },
                filtered = matchCriteriaFilter(propertiesFixture.properties, criteria);
            
            expect(filtered.length).toBe(1);
            expect(filtered[0]['squareMeters']).toBe("62");
            
        }));
        
        it('Should return only properties with 3 beds', inject(function(matchCriteriaFilter) {
            var criteria = { beds: 3 },
                filtered = matchCriteriaFilter(propertiesFixture.properties, criteria);
                
            expect(filtered.length).toBe(4);
            expect(filtered[0]['beds']).toBe("3");
            expect(filtered[filtered.length-1]['beds']).toBe("3");
            
        }));
        
        it('Should return only properties with a minimum price of 1500000', inject(function(matchCriteriaFilter) {
            var criteria = { minPrice : 1500000 },
                filtered = matchCriteriaFilter(propertiesFixture.properties, criteria);
                
            expect(filtered.length).toBe(3);
            expect(Number(filtered[0]['price'])).toBeGreaterThan(1500000);
            expect(Number(filtered[filtered.length-1]['price'])).toBeGreaterThan(1500000);
            
        }));
        
        it('Should return only properties with a maximum price of 700000', inject(function(matchCriteriaFilter) {
            var criteria = { maxPrice : 700000 },
                filtered = matchCriteriaFilter(propertiesFixture.properties, criteria);
                
            expect(filtered.length).toBe(4);
            expect(Number(filtered[0]['price'])).toBeLessThan(700000);
            expect(Number(filtered[filtered.length-1]['price'])).toBeLessThan(700000);
            
        }));
        
        it('Should return only properties with the exact price of 607000', inject(function(matchCriteriaFilter) {
            var criteria = { minPrice: 607000, maxPrice: 607000 },
                filtered = matchCriteriaFilter(propertiesFixture.properties, criteria);
                
            expect(filtered.length).toBe(1);
            expect(filtered[0]['id']).toBe("2546");
            expect(filtered[0]['price']).toBe("607000");
            
        }));
        
    });
    
});