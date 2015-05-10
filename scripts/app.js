app = angular.module('app', [
  'ui.router'
  ])

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    
    $stateProvider
      .state('home', {
        resolve:{
          init: function(contact){
            return contact.init();
          }
       },
        url: "/",
        templateUrl: "views/home.html",
        controller: 'mainController'
      });
  }
);