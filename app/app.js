var app = angular.module("meds", ['ui.router','restangular','smart-table','textAngular','angularMoment','LocalStorageModule','slick']);

app.factory('MedsRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://localhost/meds_api/api');
    });
});

app.run(['$http', '$rootScope', function($http, $rootScope) {
    $rootScope.date = new Date();
    $rootScope.title = 'MEDS';
    $rootScope.messages=[];
    $rootScope.menu=[];

}]);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
    .setPrefix('app')
    .setStorageType('localStorage')
    .setNotify(true, true)
});


