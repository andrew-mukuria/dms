// I am le Register Controller
app.controller(
  "RegisterCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService', '$auth', 'toastr',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService, auth, toastr) {

      scope.handleRegBtnClick = function() {
      auth.submitRegistration(scope.registrationForm)
        .then(function(resp) { 
          // handle success response
        })
        .catch(function(resp) { 
          // handle error response
        console.log(resp.errors);
        });
    };

    }
  ]
);