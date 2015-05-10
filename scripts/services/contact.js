angular.module('app')

.service('contact', [ 'randomGenerator', '$q', '$timeout', '$window',
  contact
]);

function contact(randomGenerator, $q, $timeout, $window) {
    var copy = angular.copy;

    /**
        Contact Config.
    **/

    //Total Random Contacts fetched from 3rd party api.
    var totalSize = 500;

    //How many more contacts are loaded/removed when scroll triggers fires.
    var loadSize = 10;

    //Threshold for the max number of rows allowable in container
    var viewSize = 40;

    //Maximum number of results allowed by 3rd party api.
    var maxResultsPerFetch = randomGenerator.getMaxResults();

    var rowClassName = '.contact-row';
    /**
        Data Variables / Functions
    **/

    //All Data
    var dataSet = [];

    //Current Data binded to obj
    var contactScope = {
        currentSet  : []
    };

    //Indexes used to slice total data set into smaller current data set
    var currentFirst = 0;

    //Curren Last Value: 1 + last index to show
    var currentLast = viewSize;

    //Mutex key manipulating data
    var loading = false;

    //Element height of each row (used to pad bottom/top divs)
    var rowHeight = 0;

    //Farthest bottom index reached. (Used to pad bottom div)
    var largestLastIndex = 0;

    /*Get some data to load view.
    //Recursively keep loading more if needed. */
    this.init = function() {
        var self = this;
        return randomGenerator.fetch(totalSize).then(
            function ( success ) {
                //Save data to our total set
                dataSet = success.data.results;

                //Make current set from data set
                self.makeCurrentSet();

                //Bind view data to 'this' current set
                success.data = contactScope.currentSet;

                //Async recursive reload of more data
                $timeout(function() {
                    self.setRowHeight();
                    if ( maxResultsPerFetch < totalSize ) {
                        self.load(totalSize - maxResultsPerFetch);
                    }
                });

                return success;
            },
            function ( rejection ) {
                return{success : false};
            }
        );
    };

    //Continue loading more 3rd party data until max size is reached
    this.load = function(rows) {
        var self = this;

        randomGenerator.fetch(rows).then(
            function ( success ) {
                //Save data to our total set
                self.addData(success.data.results);

                //If we still havn't reached our total keep loading.
                if ( rows > maxResultsPerFetch ) {
                    $timeout(
                        function() {
                            self.load(rows - maxResultsPerFetch);
                        }
                    );
                }
            }
        );
    };

    //@Move current window forward.
    this.forward = function() {
        if( !loading ) {
            loading = true;

            // Shift indexes by loadSize
            currentLast += loadSize;
            currentFirst +=loadSize;

            //Validate new values
            this.validateView();

            //Pad view from new values.
            this.padView();

            $timeout(function() {
                loading = false;
            });
        }
    };

    //@Move current window backward.
    this.back = function() {
        if( !loading ) {
            loading = true;

            // Shift indexes by loadSize
            currentFirst -= loadSize;
            currentLast -= loadSize;

            //Validate new values
            this.validateView();

            //Pad top/bottom divs
            this.padView();

            if ( currentLast > largestLastIndex ) {
                largestLastIndex = currentLast;
            }

            //Release 'key' after digest loop finishes.
            $timeout(function() {
                loading = false;
            });
        }
    };

    //Ensure our first/last index remain w/in bounds of data set.
    this.validateView = function() {
        if ( currentLast > dataSet.length ) {
            currentLast = dataSet.length;
            currentFirst = currentLast - viewSize;
        }
        else if ( currentFirst >= currentLast  ) {
            currentFirst = currentLast - viewSize;
        }
        else if ( currentFirst < 0 ) {
            currentFirst = 0;
            currentLast = currentFirst + viewSize;
        }
        else if ( currentLast <= currentFirst ) {
            currentFirst = 0;
            currentLast = currentFirst + viewSize;
        }
        //Make.
        this.makeCurrentSet();
    };

    //Add/Remove height to bottom / top placeholder divs to allow for smooth data manipulation when scrolling
    this.padView = function() {
        //Add Top Padding to Top Div
        var topPadding = ((currentFirst-1) || 0) * rowHeight;
        var topDiv = this.domSelect('.ng-super-scroller-before');
        topDiv.height(topPadding);

        //Add bottom Padding to bottom Div.
        var bottomPadding = (largestLastIndex - currentLast) || 0 * rowHeight;
        var bottomDiv = this.domSelect('.ng-super-scroller-after');
        bottomDiv.height(bottomPadding);
    };


    /**
        Accessor / Helper Methods
    **/

    //Splice total to current set
    this.makeCurrentSet = function() {
        contactScope.currentSet = copy(dataSet).slice(currentFirst, currentLast);
    };

    //Return the requested Dom Element.
    this.domSelect = function(class_name) {
        return angular.element(document.querySelector(class_name));
    };

    this.addData = function(data) {
        dataSet = dataSet.concat(data);
    };

    this.getData = function() {
        return dataSet;
    };

    this.setData = function(totalSet) {
        dataSet = totalSet;
    };

    //Service Scope used for 2 way binding to the view.
    this.getContactScope = function() {
        return contactScope;
    };

    this.setRowHeight = function() {
        rowHeight = this.domSelect(rowClassName).height();
    };

    this.getMaxResults = function() {
        return maxResultsPerFetch;
    };

    this.getTotalSize = function() {
        return totalSize;
    };

    this.setViewOptions = function(view, load, total) {
        viewSize = view || viewSize;
        currentLast = viewSize;

        loadSize = load || loadSize;
        totalSize = total || totalSize;
    };

    //Set Default View Options
    this.setViewOptions(viewSize, loadSize, totalSize);

    return this;
}


