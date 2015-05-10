angular.module('app')

.service('randomGenerator', [ '$q', '$http',
  randomGenerator
]);

function randomGenerator($q, $http) {
  var maxResultsPerFetch = 100;

  function fetch(total) {
    var url_string = "http://api.randomuser.me" + (total ? '/?results='+total : "");
    var deferredAbort = $q.defer();

    // Initiate the AJAX request.
    var request = $http({
        method: "get",
        url: url_string,
        timeout: deferredAbort.promise
    });

    var promise = request.then(
      function( response ) {
        return({
          success: true,
          data: response.data
        });
      },
      function( response ) {
        return({
          success: false,
          data: "Something went wrong"
        });
      }
    );

    promise.abort = function() {

        deferredAbort.resolve();

    };

    promise.finally(
        function() {

            //Clean up Object References.
            promise.abort = angular.noop;

            deferredAbort = request = promise = null;

        }
    );

    return( promise );
  }

  function getMaxResults() {
    return maxResultsPerFetch;
  }

    // Return the public API.
    return({
        fetch: fetch,
        getMaxResults: getMaxResults
    });
}


