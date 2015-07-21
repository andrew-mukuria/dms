//le Dashboard Controller
app.controller(
  "dashboardCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      var Members         = DMSRestangular.all('members');
      var Parishes        = DMSRestangular.all('parishes');
      var Dioceses        = DMSRestangular.all('dioceses');
      var Archidioceses   = DMSRestangular.all('archdioceses');

      // Title for the route
      rootScope.title = 'Dashboard';

      // Get the .lenght for all the tables
      getLength();

      rootScope.user = MySessionService.getLoggedUser();

      function getLength() {
        Members.customGET('').then(function(members) {
          scope.members = members.length;
        });
        Parishes.customGET('').then(function(parishes) {
          scope.parishes = parishes.length;
        });
        Dioceses.customGET('').then(function(dioceses) {
          scope.dioceses = dioceses.length;
        });
        Archidioceses.customGET('').then(function(archdioceses) {
          scope.archdioceses = archdioceses.length;
        });
      }

      // Restangular returns promises
      /*DMSRestangular.all('members');.getList()  // GET: /members
      .then(function(members) {
        // returns a list of members
        scope.memList = members; // first Restangular obj in list: { id: 123 }
        console.log(scope.memList);
      })

       Parishes.getList()  // GET: /parishes
      .then(function(parishes) {
        // returns a list of parishes
        scope.parishList = parishes; // first Restangular obj in list: { id: 123 }
        console.log(scope.memList);
      })*/

        // Dashboard charts
        scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        scope.series = ['Series A', 'Series B'];
        scope.data = [
          [20, 30, 40, 50 ,60, 80, 90],
          [20, 30, 40, 50 ,60, 80, 90]
        ];

       function onClick(points, evt) {
          console.log(points, evt);
        }
            
            /*scope.login = function login() {
        rootScope.user = [];
        var user = DMSRestangular.one('user').one('username', scope.formData
          .username).one('password', scope.formData.password).one(
          'format', 'json');
        // This will query /accounts and return a promise.
        user.customGET('').then(function(userObj) {
          localStorageService.set('meds_user', userObj);
          state.go('users');

        });
      };*/

    }
    
  ]
);
