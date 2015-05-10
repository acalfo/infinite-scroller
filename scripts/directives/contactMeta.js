angular.module('app')
.directive('contactMeta', function() {
  var tpl = '<p><span ng-bind="text"></span>: <span ng-bind="value"></span></p>';
  return {
    restrict: 'E',
    scope: {},
    template: tpl,
    replace:false,
    link: function(scope, ele, attrs) {
      //Get attrs Input Data.
      if ( attrs.text ) {
        scope.text = attrs.text;
      }
      if ( attrs.value ) {
        scope.value = attrs.value;
      }
    }
  };
});
