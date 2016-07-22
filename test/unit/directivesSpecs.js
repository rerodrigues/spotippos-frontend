'use strict';

var findElem = function(elem, selector) { return angular.element(elem).find(selector); };

//tests for app/assets/js/directives.js
describe('[spotippos.directives]', function() {
    beforeEach(module('spotippos.directives'));

    describe('delegateEvent', function() {
        var $scope, element, attributes={};

        beforeEach(inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();

            $scope.setAttributes = function(evt) {
                var target = evt.target;

                attributes = {
                    text : target.innerHTML, href : target.href, id : target.id
                };
            };

            var markup = '<ul delegate-event="click,a,setAttributes"><li><a id="a1" href="#1">Link 1</a></li><li><a id="a2" href="#2">Link 2</a></li></ul>';
            element = $compile(markup)($scope);

            $scope.$apply();
        }));

        it('should click the first link and call the event handler', function() {
            findElem(element, '#a1').trigger('click');

            expect(Object.keys(attributes).length).not.toBe(0);
            expect(attributes.text).toBe('Link 1');
            expect(attributes.id).toBe('a1');
            expect(attributes.href).toMatch(/#1$/);
        });

        it('should click the second link and call the event handler', function() {
            findElem(element, '#a2').trigger('click');

            expect(Object.keys(attributes).length).not.toBe(0);
            expect(attributes.text).toBe('Link 2');
            expect(attributes.id).toBe('a2');
            expect(attributes.href).toMatch(/#2$/);
        });

    });

});

//tests for app/modules/property-filter/js/directives.js
describe('[spotippos.propertyFilter.directives]', function() {
    beforeEach(module('spotippos.propertyFilter.controllers'));
    beforeEach(module('spotippos.propertyFilter.directives'));
    beforeEach(module('ui.router'));
    beforeEach(module('app.templates'));

    describe('propertyFilters', function() {
        var $scope, element;

        beforeEach(inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();

            var markup = '<property-filters></property-filters>';
            element = $compile(markup)($scope);

            $scope.$apply();
        }));

        it('should render the filters form', function() {
             expect(findElem(element,'[name=id]').length).toBe(1);
             expect(findElem(element,'[name=square-meters]').length).toBe(1);
             expect(findElem(element,'[name=beds]').length).toBe(1);
             expect(findElem(element,'[name=baths]').length).toBe(1);
             expect(findElem(element,'[name=min-price]').length).toBe(1);
             expect(findElem(element,'[name=max-price]').length).toBe(1);
             expect(findElem(element,'input').length).toBe(6);
        });

    });

});

//tests for app/modules/property-details/js/directives.js
describe('[spotippos.propertyDetails.directives]', function() {
    beforeEach(module('spotippos.propertyDetails.directives'));
    beforeEach(module('app.templates'));

    describe('propertyMap', function() {
        var $scope,
            element,
            location = {x: '55%', y: '45%'};

        beforeEach(inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();

            var markup = '<property-map property-location="{x: \''+location.x+'\', y: \''+location.y+'\'}"></property-map>';
            element = $compile(markup)($scope);

            $scope.$apply();
        }));

        it('should render the property location in map', function() {
            expect(element.is('.property-map')).toBeTruthy();
            expect(findElem(element,'img').length).toBe(1);
            expect(findElem(element,'svg').length).toBe(2);
            expect(findElem(element,'div[style]').length).toBe(1);
            expect(findElem(element,'div[style]')[0].style.left).toBe(location.x);
            expect(findElem(element,'div[style]')[0].style.top).toBe(location.y);
        });

    });

    describe('propertyNavigation', function() {
        var $scope, element;

        beforeEach(inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();

            $scope.hasNext = true;
            $scope.hasPrevious = false;
            $scope.navAction = function(){};

            //spyOn($scope, 'navAction');

            var markup = '<property-navigation has-previous="hasPrevious" has-next="hasNext" nav-action="navAction(where)"></property-navigation>';
            element = $compile(markup)($scope);

            $scope.$apply();
        }));

        it('should render the property navigation buttons', function() {
            expect(findElem(element,'.navbuttons').length).toBe(1);
            expect(findElem(element,'.prev-next').length).toBe(1);
            expect(findElem(element,'a svg').length).toBe(2);
            expect(findElem(element,'a:not(.ng-hide)').length).toBe(2);
        });

    });

});
