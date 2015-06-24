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
      }

      scope.getParishes = function getParishes() {
        Parishes.customGET('').then(function(parishes) {
          scope.rowCollection = parishes;
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
      }
      scope.newParish = function newParish() {
        parish = scope.parishProfile;
        today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
        day = today.getDay();
        parish.created_at = year + '-' + month + '-' + day;
        parish.updated_at = year + '-' + month + '-' + day;
        console.log(parish);
        parish = {
              "parish": {
              "name":       scope.parishProfile.name,
              "in_charge":  scope.parishProfile.in_charge,
              "location":   scope.parishProfile.location
         }
        };
        console.log(parish);
        Parishes.post(parish);

        scope.items = DMSRestangular.one('parishes', scope.parishProfile.name);
        console.log(scope.items);

        if (scope.items != null) {
            // items have value
        toastr.info('Parish saved successfully!', 'Awesome!'); 
        } else {
            // items is still null
        toastr.warning('Something went wrond dude!', 'Oops!'); 
        }
      }
        
      scope.updateParish = function updateParish() {
        parish = scope.parishProfile;
        updatedParish = DMSRestangular.one('parishes', parish.id);
        parish = {
              "utf8":"✓",
              "parish": {
              "id":         parish.id,
              "name":       scope.parishProfile.name,
              "in_charge":  scope.parishProfile.in_charge,
              "location":   scope.parishProfile.location
         }
        };
        console.log(parish);
        updatedParish.put(parish);
      }

    }
  ]
);