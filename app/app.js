var app = angular.module("dms", ['ui.router','restangular','smart-table','textAngular','angularMoment','LocalStorageModule','slick', 'highcharts-ng', 'chart.js', 'ngAnimate', 'toastr', 'ng-token-auth', 'ngStorage']);

app.factory('DMSRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://localhost:3000/api/v1');
    });
});

app.run(['$http', '$rootScope', '$state', 'toastr', function($http, $rootScope, state, toastr) {
    $rootScope.date = new Date();
    $rootScope.title = 'DMS';
    $rootScope.messages=[];
    $rootScope.menu=[];

//Check if user has logged in
    $rootScope.$on('auth:invalid', function(ev, reason) {
        toastr.error('Log in first dude!', 'Yo!'); 
    });
//Check for validation errors    
    $rootScope.$on('auth:validation-error', function(ev, reason) {
        toastr.error('Password must be 8 characters!', 'Oops!'); 
    });
//Check for login errors 
    $rootScope.$on('auth:login-error', function(ev, reason) {
        toastr.error(reason.errors[0], 'Yo!'); 
    });
//Check for Successful Login 
    $rootScope.$on('auth:login-success', function(ev, reason) {
        toastr.success('Login successful! Welcome Dude!');
        state.go('dashboard');
    });
//Check for Successful Logout    
    $rootScope.$on('auth:logout-success', function(ev, reason) {
        toastr.info('You have been logged out! Adios Dude!'); 
        state.go('login');
    });
//Check for Logout errors    
    $rootScope.$on('auth:logout-error', function(ev, reason) {
        toastr.success(reason.errors[0], 'Yo'); 
    });
}]);

app.config(function (localStorageServiceProvider, RestangularProvider) {
    localStorageServiceProvider
    .setPrefix('app')
    .setStorageType('localStorage')
    .setNotify(true, true)

    RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});

});

app.config(function($authProvider) {
    // the following shows the default values. values passed to this method
    // will extend the defaults using angular.extend  
      $authProvider.configure({
      apiUrl:                  'http://localhost:3000', //path setup for devise token auth gem for dms_api
      storage:                 'localStorage',
      proxyIf:                 function() { return false; },
      proxyUrl:                '/proxy',
      authProviderPaths: {
        github:   '/auth/github'
      },
      // user's authentication information included by the client in the access-token header of each request
      // using devise token auth gem, header must follow this Token format (RFC 6750 Bearer)
      tokenFormat: {
        "access-token": "{{ token }}",
        "token-type":   "Bearer",
        "client":       "{{ clientId }}",
        "expiry":       "{{ expiry }}",
        "uid":          "{{ uid }}"
      },
      parseExpiry: function(headers) {
        // convert from UTC ruby (seconds) to UTC js (milliseconds)
        return (parseInt(headers['expiry']) * 1000) || null;
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

app.config(function(toastrConfig) {

      angular.extend(toastrConfig, {
        allowHtml: false,
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
        onHidden: null,
        onShown: null,
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        progressBar: true,
        tapToDismiss: true,
        timeOut: 5000

      });
});