var base_url;

var hmisApp = angular.module('hmisApp', [
  'ngRoute',
  'hmisControllers'
]);

hmisApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/claims', {
      templateUrl: 'ng-partials/claim-info.html',
      controller: 'ClaimsCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);

function setArchitecture(new_base_url) {
  base_url = new_base_url;
}
