/**
 * Main Controller
 */
angular.module('app')
	.controller('mainController', ['$scope', 'contact', 'init',
		function($scope, contact, init) {
			//Bind view data to service scope 4 ez manipulation
			$scope.contacts = contact.getContactScope();

			//Ensure we loaded up some data. 
			if ( !init.success ) {
				$scope.error = "An Error has Occurred while Fetching Data.";
			}

			//Super Scroller Trigger Methods
			$scope.forward = function() {
				contact.forward();
			};

			$scope.back = function() {
				contact.back();
			};
		}
	]
);
