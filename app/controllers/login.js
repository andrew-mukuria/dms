// I am le Login Controller
app.controller(
  "LoginCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService', '$auth', 'toastr', 
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService, auth, toastr) {

    rootScope.title = 'DMS CPanel';
      
     scope.handleLoginBtnClick = function() {
          auth.submitLogin(scope.loginForm)
            .then(function(response) { 
              toastr.info(response.status, 'Wow');
            })
            .catch(function(response) { 
              toastr.info(response.status, 'Wow');
            console.log(response.errors); //log any errors 
            });
        };
    
    }
  ]
);