describe("ngSuperScroller", function(){
  var $scope, element, $window, $timeout;

  var scrolled = false;

  beforeEach(
    function() {
      module('app');
     
      inject(
        function($compile, $rootScope, _$window_, _$timeout_) {
          //Assign Global vars.
          $timeout = _$timeout_;
          $scope = $rootScope;
          $window = angular.element($window);

          //Create element.
          element = angular.element('<div style="overflow:auto; height:20000px; width:20000px;"><div id="tester" ng-super-scroller bottom-trigger="test()" top-trigger="test()" scroll-distance="5"></div></div>');
          $compile(element)($rootScope);

          //Test Trigger function to flip flag
          $scope.test = function() {
            scrolled = true;
          };

          //Run digest.
          $scope.$digest();
        }
      );
    }
  );


  it('should expect Scroll Distance as 5', function() {
    expect(element.find('#tester').attr('scroll-distance')).toBe('5');
  });

  it('should call trigger function when passing scroll threshold', function() {
    scrolled = false;

    $window.scrollTop(20000);
    $window.triggerHandler('scroll');
    
    $timeout.flush();

    expect(scrolled).toBe(true);
  });
});
