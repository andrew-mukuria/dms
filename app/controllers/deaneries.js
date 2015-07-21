// I am le Deaneries Controller
app.controller(
  "deaneriesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      getDeaneryCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getDeanery = function getDeanery(newDeanery) {
        console.log(newDeanery);
        scope.DeaneryProfile = newDeanery;
        state.go('location.deaneries.view');
      };

      scope.getDeaneries = function getDeaneries() {
        var Deaneries = DMSRestangular.all('deaneries');
        // This will query /accounts and return a promise.
        Deaneries.customGET('').then(function(deaneries) {
          //console.log(users);
          scope.rowCollection = deaneries;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });
      };

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
      };

    scope.setStatus = function setStatus(status) {
        scope.status = status;
        if (status == 'add') {
          scope.parishProfile = [];
        }
      };

      function getDeaneryCount() {
        var Deaneries = DMSRestangular.all('deaneries');
        // This will query /accounts and return a promise.
        Deaneries.customGET('').then(function(deaneries) {
          // console.log(users);
          scope.records = deaneries.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }
    }

    
  ]
);