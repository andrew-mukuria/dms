var app = angular.module("hais", ['ui.router','ui.router.stateHelper','restangular','smart-table','chart.js','textAngular']);

app.controller('benefitsCtrl', ['$scope', '$http',
  function ($scope, $http) {

  }]);

app.controller('claimsCtrl', ['$scope', '$http',
  function ($scope, $http) {

  }]);

app.controller('providerCtrl', ['$scope', '$http',
  function ($scope, $http) {

  }]);

app.controller('servicesCtrl', ['$scope', '$http',
  function ($scope, $http) {

  }]);

app.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost/hmis');
  RestangularProvider.setRequestSuffix('.json');
});

app.factory('MembersRestangular', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl('http://localhost/hmis/members_api');
  });
});

app.run(['$http', '$rootScope', function($http, $rootScope) {
     $rootScope.date = new Date();
     $rootScope.title = 'HAIS Web';
     $rootScope.messages=[];
     $rootScope.menu=[];
 }]);


