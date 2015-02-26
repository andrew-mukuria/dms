// I control the main demo.
app.controller(
  "diocesesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      getDioceseCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getDiocese = function getDiocese(newDiocese) {
        console.log(newDiocese);
        scope.dioceseProfile = newDiocese;
        state.go('location.dioceses.view');
      }

      scope.getDioceses = function getDioceses() {
        var Dioceses = DMSRestangular.all('dioceses');
        // This will query /accounts and return a promise.
        Dioceses.customGET('').then(function(dioceses) {
          //console.log(users);
          scope.rowCollection = dioceses;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });
      }

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

      function getDioceseCount() {
        var Dioceses = DMSRestangular.all('dioceses');
        // This will query /accounts and return a promise.
        Dioceses.customGET('').then(function(dioceses) {
          // console.log(users);
          scope.records = dioceses.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }
    }
  ]
);
