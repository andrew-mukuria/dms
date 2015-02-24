var app = angular.module("meds", ['ui.router','restangular','smart-table','textAngular','angularMoment','LocalStorageModule','slick']);

app.factory('DMSRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://localhost:3000/api/v1');
    });
});

app.run(['$http', '$rootScope', function($http, $rootScope) {
    $rootScope.date = new Date();
    $rootScope.title = 'DMS';
    $rootScope.messages=[];
    $rootScope.menu=[];

}]);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
    .setPrefix('app')
    .setStorageType('localStorage')
    .setNotify(true, true)
});


