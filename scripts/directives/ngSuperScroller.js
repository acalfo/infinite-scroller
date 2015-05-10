angular.module('app')
.directive('ngSuperScroller', [ '$window', '$timeout',
  function($window, $timeout) {
    var element = angular.element;
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        var window = element($window);
        
        //Place pre/post div on dom for other services to manipulate if needed.
        var preDiv = angular.element('<div class="ng-super-scroller-before"></div>');
        var postDiv = angular.element('<div class="ng-super-scroller-after"></div>');

        angular.element(postDiv).insertAfter(ele[0]);
        angular.element(preDiv).insertBefore(ele[0]);

        //Distance before scroll trigger functions are fired.
        var scrollDistance = 0;

        //Used to determine up or down direction relative to previous scroll event. 
        var lastScrollDrop = 0;

        var defaultScrollDistance = 3;

        //Get inputted scroll Distance
        if ( attrs.scrollDistance ) {
          var unbind = scope.$watch(attrs.scrollDistance,
            function( value ) {
              scrollDistance = parseInt(value, 10) || defaultScrollDistance;

              //Kill Watcher.
              unbind();
            }
          );
        }

        //Key for handler to prevent duplicate trigger function calls.
        var key = true;

        var handler = function(e) {
          //Only give handler with key access to check Condition
          if ( key ) {

            //Keep key to myself
            key = false;

            checkScroll(e);
          }
        };

        var checkScroll = function(e) {
          var height = window.height();

          //Get window view's bottom & top position on the page
          var windowTop = window.scrollTop();
          var windowBottom = height + windowTop;

          //Get position on page of top & bottom of container element
          var elementTop = ele.offset().top;
          var elementBottom = elementTop + ele.height();

          var remainingTop = windowTop - elementTop;
          var remainingBottom = elementBottom - windowBottom;

          //Trigger booleans
          var topTrigger = remainingTop <= height * scrollDistance;
          var bottomTrigger = remainingBottom <= height * scrollDistance;

          //Direction: 0 = up. 1 = down.
          var direction = windowTop > lastScrollDrop;

          //Save current window position for future reference.
          lastScrollDrop = windowTop;

          //Let digest cycle finish
          $timeout(
            function() {
              if ( bottomTrigger && direction) {
                scope.$apply(attrs.bottomTrigger);
              }
              else if ( topTrigger && !direction ) {
               // console.log("u[");
                scope.$apply(attrs.topTrigger);
              }

              //Give key back
              key = true;
            }
          );
        };

        //Set up Scroll Event Handler
        window.bind("scroll", handler);

        scope.$on('$destroy', function() {
          // $(window).off('scroll', handler);
          window.unbind("scroll", handler);
        });

        //Run initial handler on page load.
        $timeout(function() {
          handler();
        });
      }
    };
  }
]);
