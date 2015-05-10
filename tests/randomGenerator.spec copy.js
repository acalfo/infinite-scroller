describe('randomGenerator', function () {

  var randomGenerator;

  beforeEach(
    function() {
      module('app');

      inject(
        function (_randomGenerator_) {
          randomGenerator = _randomGenerator_;
        }
      );
    }
  );

  it('should be defined', function() {
    expect(randomGenerator).toBeDefined();
  });

  it('should be have a max number of results per http request', function() {
    expect(randomGenerator.getMaxResults()).toBeDefined();
  });

  describe('Mocked HTTP Requests', function() {

    var $httpBackend;
    var user = { name : {first:"Alex"}};

    beforeEach(inject(
      function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'http://api.randomuser.me/?results=20')
          .respond(200, {user: user,  success: true});
      }
    ));

    afterEach(
      function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      }
    );


    it('should have sent a GET request to the randomuser API', function() {
        var result = randomGenerator.fetch(20);
        $httpBackend.expectGET('http://api.randomuser.me/?results=20');
        $httpBackend.flush();
    });

  });

});