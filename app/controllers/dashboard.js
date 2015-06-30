// I am le Dashboard Controller
app.controller(
  "dashboardCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {


      rootScope.title = 'Dashboard';

      getMemberCount();
      getParishCount();
      getDioceseCount();
      getArchdioceseCount();
      rootScope.user = MySessionService.getLoggedUser();

        var baseMembers = DMSRestangular.all('members');
        baseMembers.getList().then(function(members) {
        scope.allMembers = members;
      });

      scope.login = function login() {
        rootScope.user = [];
        var user = DMSRestangular.one('user').one('username', scope.formData
          .username).one('password', scope.formData.password).one(
          'format', 'json');
        // This will query /accounts and return a promise.
        user.customGET('').then(function(userObj) {
          localStorageService.set('meds_user', userObj);
          state.go('users');

        });
      }

      function getMemberCount() {
      var Members   = DMSRestangular.all('members');
        Members.customGET('').then(function(members) {
          scope.members = members.length;
        });
      }

       function getParishCount() {
      var Parishes  = DMSRestangular.all('parishes');
        Parishes.customGET('').then(function(parishes) {
          scope.parishes = parishes.length;
        });
      } 

        function getDioceseCount() {
      var Dioceses = DMSRestangular.all('dioceses');
        Dioceses.customGET('').then(function(dioceses) {
          scope.dioceses = dioceses.length;
        });
      }

       function getArchdioceseCount() {
      var Archidioceses = DMSRestangular.all('archdioceses');
        Archidioceses.customGET('').then(function(archdioceses) {
          scope.archdioceses = archdioceses.length;
        });
      }

        // Dashboard charts
        scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        scope.series = ['Series A', 'Series B'];
        scope.data = [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ];

       function onClick(points, evt) {
          console.log(points, evt);
        };
      

    }
    
  ]
);
