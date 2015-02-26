// I control the main demo.
app.controller(
  "usersCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      getUserCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getUser = function getUser(newUser) {
        console.log(newUser);
        scope.userProfile = newUser;
        state.go('users.view');
      }

      scope.getUsers = function getUsers() {
        var AllUsers = DMSRestangular.all('users');
        // This will query /accounts and return a promise.
        AllUsers.customGET('').then(function(users) {
          //console.log(users);
          scope.rowCollection = users;
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

      function getUserCount() {
        var AllUsers = DMSRestangular.all('users');
        // This will query /accounts and return a promise.
        AllUsers.customGET('').then(function(users) {
          // console.log(users);
          scope.records = users.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }
    }
  ]
);
