// le Services Controller
app.controller(
  "servicesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {
      var Services = DMSRestangular.all('services');
      getServiceCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getService = function getService(newService) {
        console.log(newService);
        scope.service = newService;
        state.go('location.services.view');
      };

      scope.getServices = function getServices() {

        // This will query /accounts and return a promise.
        Services.customGET('').then(function(services) {
          // console.log(services[0]);
          scope.rowCollection = services;
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

      function getServiceCount() {
        // This will query /accounts and return a promise.
        Services.customGET('').then(function(services) {
          // console.log(users);
          scope.records = services.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }

      scope.newService = function newService() {
        parish = {
          "name": "St. Lukes",
          "in_charge": "Pastor Oscar",
          "location": "Outer Ring Road",
          "updated_at": "2015-01-01 00:00:00 UTC",
          "created_at": "2015-01-01 00:00:00 UTC"
        };
        Services.post(parish);
      };
    }
  ]
);