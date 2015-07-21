var app = angular.module("dms", ['ui.router','restangular','smart-table','textAngular','angularMoment','LocalStorageModule','slick', 'highcharts-ng', 'chart.js', 'ngAnimate', 'toastr', 'ng-token-auth', 'ngStorage', 'ngMaterial', 'leaflet-directive', 'angular-loading-bar']);

app.factory('DMSRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://localhost:3000/api/v1'); //Le Base URL for making API calls
        
    });
});

app.run(['$http', '$rootScope', '$state', 'toastr', 'MySessionService', 

      function($http, $rootScope, $state, $toastr, MySessionService) {
        
//**Le Global Variables 

    $rootScope.date = new Date();
    $rootScope.title = 'DMS';
    $rootScope.messages=[];
    $rootScope.menu=[];
    $rootScope.user = MySessionService.getLoggedUser();

 
//** ng-token-auth events with le toastr notifactions **//
//**Check if user has logged in **//
    $rootScope.$on('auth:invalid', function(ev, reason) {
        $toastr.error('Log in first dude!', 'Yo!'); 
    });
//**Check for validation errors     **//
    $rootScope.$on('auth:validation-error', function(ev, reason) {
        $toastr.error(reason.errors[0], 'Yo!'); 
    });
//**Check for login errors  **//
    $rootScope.$on('auth:login-error', function(ev, reason) {
        $toastr.error(reason.errors[0], 'Yo!'); 
    });
//**Check for Successful Login  **//
    $rootScope.$on('auth:login-success', function(ev, reason) {
        $toastr.success('Login successful! Welcome Dude!');
        $state.go('dashboard'); //take the user to the dashboard state after successful login
    });
//**Check for Successful Logout     **//
    $rootScope.$on('auth:logout-success', function(ev, reason) {
        $toastr.info('You have been logged out! Adios Dude!'); 
        $state.go('login'); //take the user to the login state after successful logout
    });
//**Check for Logout errors     **//
    $rootScope.$on('auth:logout-error', function(ev, reason) {
        $toastr.success(reason.errors[0], 'Yo'); 
    });

    $rootScope.$on('auth:registration-email-success', function(ev, message) {
    $toastr.info("A registration email was sent to " + message.email);
    });

    $rootScope.$on('auth:email-confirmation-success', function(ev, user) {
    $toastr.info("Welcome, "+user.email+". Your account has been verified! You can log in.");
        $state.go('login');
    });
}]);

//**Local Storage config**//
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
    .setPrefix('app')
    .setStorageType('localStorage')
    .setNotify(true, true);

});
//**Restangular config setDefaultHeaders for interaction with API**//
app.config(function (RestangularProvider){
    RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});

});
//** ng-token-auth config working with Ruby devise-token-auth gem **//
app.config(function($authProvider) {
    // the following shows the default values. values passed to this method
    // will extend the defaults using angular.extend  
      $authProvider.configure({
      apiUrl:                  'http://localhost:3000', //path setup for devise token auth gem for dms_api
      storage:                 'localStorage', //auth headers storage type you change and set it as 'cookies'
      proxyIf:                 function() { return false; },
      proxyUrl:                '/proxy',
      authProviderPaths: {
        github:   '/auth/github' //for integration with le GitHub
      },
      // user's authentication information included by the client in the access-token header of each request
      // using devise-token-auth gem, header must follow this Token format (RFC 6750 Bearer)
      tokenFormat: {
        "access-token": "{{ token }}",
        "token-type":   "Bearer",
        "client":       "{{ clientId }}",
        "expiry":       "{{ expiry }}",
        "uid":          "{{ uid }}"
      },
      parseExpiry: function(headers) {
        // convert from UTC ruby (seconds) to UTC js (milliseconds)
        return (parseInt(headers.expiry) * 1000) || null;
      },
      handleLoginResponse: function(response) {
        return response.data;
      },
      handleAccountResponse: function(response) {
        return response.data;
      },
      handleTokenValidationResponse: function(response) {
        return response.data;
      }
      });
    });
//** Le Config for angular toastr notifications
app.config(function(toastrConfig) {

      angular.extend(toastrConfig, {
        allowHtml: false, //Alow checkboxes and stuff
        autoDismiss: false,
        closeButton: false,
        closeHtml: '<button>&times;</button>',
        containerId: 'toast-container',
        extendedTimeOut: 1000,
        iconClasses: {
          error: 'toast-error',
          info: 'toast-info',
          success: 'toast-success',
          warning: 'toast-warning'
        },
        maxOpened: 0,    
        messageClass: 'toast-message',
        newestOnTop: true,
        onHidden: null, //Callback function called when a toast is hidden
        onShown: null, //Callback function called when a toast is shown
        positionClass: 'toast-bottom-right', //Position of toastr notification
        preventDuplicates: false,
        preventOpenDuplicates: false, 
        progressBar: true, //Animate timeout
        tapToDismiss: true,
        timeOut: 5000,
        showCloseButton: true

      });
});