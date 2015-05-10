describe("contact", function(){

  var contactService;
  var currentSet;

  var viewSize = 5;
  var loadSize = 2;
  var totalSize = 20;

  var contactScope;

  beforeEach(
    function() {
      module("app");

      inject(
        function(_contact_, $q){

          contactService = _contact_;
          contactService.setViewOptions(viewSize, loadSize, totalSize);
          contactService.setData(mockContacts);

          contactScope = contactService.getContactScope();
          contactService.makeCurrentSet();

        }
      );
    }
  );

  it('should be defined', function() {
    expect(contactService).toBeDefined();
  });

  it('should have a total data set', function() {
    expect(contactService.getData()).toBeDefined();
  });

  it('total data should contain all data', function() {
    expect(contactService.getData().length).toBe(mockContacts.length);
  });

  it('current set should be defined', function() {
    expect(contactService.getContactScope().currentSet).toBeDefined();
  });

  it('current set should have correct length from view options', function() {
    expect(contactScope.currentSet.length).toBe(viewSize);
  });

  it('should move current set forward when triggered', function() {
    //Move forward
    contactService.forward();
    
    expect(contactScope.currentSet[0].index).toBe(loadSize);
    expect(contactScope.currentSet[contactScope.currentSet.length-1].index).toBe(loadSize+viewSize-1);
  });

  var mockContacts = [{
    index: 0,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 1,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 2,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 3,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 4,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 5,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 6,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 7,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 8,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 9,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 10,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 11,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 12,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 13,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 14,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 15,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 16,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 17,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 18,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  },
  {
    index: 19,
    name: {
      first: 'alex',
      last: 'calfo'
    },
    username: 'acalfo',
    email: 'alexcafo@gmail.com',
    phone: '3238108011'
  }];
});