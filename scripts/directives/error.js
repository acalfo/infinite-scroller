angular.module('app')
.directive('error', function() {
  var tpl = '<p ng-if="error" ng-bind="error" style="color:red; font-size:14px; margin-top:20px;"></p>';
  return {
    restrict: 'E',
    scope: true,
    template: tpl,
    replace:true
  };
});
