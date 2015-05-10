angular.module('app')
.directive('name', function() {
  var tpl = '<h1><span ng-bind="full_name"></span></h1>';
  return {
    restrict: 'E',
    scope: true,
    template: tpl,
    replace:true,
    link: function(scope, ele, attrs) {
      var capitalizeFirst = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
      
      scope.full_name = capitalizeFirst(attrs.first) + " " +
                         capitalizeFirst(attrs.last);
    }
  };
});
