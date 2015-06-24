// I am le Login Controller
app.controller(
  "LoginCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService', '$auth', 'toastr', 
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService, auth, toastr) {

     scope.handleLoginBtnClick = function() {
          auth.submitLogin(scope.loginForm)
            .then(function(resp) { 
              // handle success response
              state.go('dashboard');
            })
            .catch(function(resp) { 
              // handle error response
            console.log(resp.errors);
            });
        };
    
    }
  ]
);