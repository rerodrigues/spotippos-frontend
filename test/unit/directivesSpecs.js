'use strict';

//tests for app/assets/js/directives.js
describe('[spotippos.directives]', function() {
    
    beforeEach(module('spotippos.directives'));

    describe('delegateEvent', function() {
        var $scope, element, elAttributes={};
      
        beforeEach(inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();
            
            $scope.setAttributes = function(evt) {
                var el = evt.target;
                
                elAttributes = {
                    text : el.innerHTML, href : el.href, id : el.id
                };
            };
            
            var el = '<ul delegate-event="click,a,setAttributes"><li><a id="a1" href="#1">Link 1</a></li><li><a id="a2" href="#2">Link 2</a></li></ul>';
            element = $compile(el)($scope);
            
            $scope.$apply();
        }));
        
        it('Should click the first link and call the event handler', inject(function() {
            angular.element(element).find('#a1').trigger('click');
            
            expect(Object.keys(elAttributes).length).not.toBe(0);
            expect(elAttributes.text).toBe('Link 1');
            expect(elAttributes.id).toBe('a1');
            expect(elAttributes.href).toMatch(/#1$/);
        }));
        
        it('Should click the second link and call the event handler', inject(function() {
            angular.element(element).find('#a2').trigger('click');
            
            expect(Object.keys(elAttributes).length).not.toBe(0);
            expect(elAttributes.text).toBe('Link 2');
            expect(elAttributes.id).toBe('a2');
            expect(elAttributes.href).toMatch(/#2$/);
        }));
        
    });
    
});
