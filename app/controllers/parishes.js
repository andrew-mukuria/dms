// I am ze Parishes Controller
app.controller(
  "parishesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService', 'toastr',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService, toastr) {
      var Parishes = DMSRestangular.all('parishes');
      getParishCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getParish = function getParish(newParish) {
        scope.parishProfile = newParish;
        state.go('location.parishes.view');
      };

      scope.getParishes = function getParishes() {
        Parishes.customGET('').then(function(parishes) {
          scope.rowCollection = parishes;
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

      function getParishCount() {
        Parishes.customGET('').then(function(parishes) {
          scope.records = parishes.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }

      scope.setStatus = function setStatus(status) {
        scope.status = status;
        if (status == 'add') {
          scope.parishProfile = [];
        }
      };
      scope.newParish = function newParish() {
        parish = {
              "parish": {
                  "name":       scope.parishProfile.name,
                  "in_charge":  scope.parishProfile.in_charge,
                  "location":   scope.parishProfile.location
         }
        };
        console.log(parish);
        Parishes.customPOST(parish);

      };
        
        scope.updateParish = function updateParish() {
        updatedParish = DMSRestangular.one('parishes', scope.parishProfile.id);

        today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
        day = today.getDay();
        // this.updated_at = year + '-' + month + '-' + day;
        var now = year + '-' + month + '-' + day;
        
        parish = {
              "parish": {
              "id":         scope.parishProfile.id,
              "name":       scope.parishProfile.name,
              "in_charge":  scope.parishProfile.in_charge,
              "location":   scope.parishProfile.location
              }
        };
        updatedParish.customPUT(parish).then(function(response){
        toastr.info('Update Successful', 'Awesome!'); 
        }, function(response) {
        toastr.danger('Update was not successfyl', 'Wow!'); 
        });
        console.log(scope.parishProfile.id);
      };

    }
  ]
);