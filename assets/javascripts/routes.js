app.config(function(stateHelperProvider ) {
    //
    // For any unmatched url, redirect to /state1
//    $urlRouterProvider.otherwise("/members");
    //
    // Now set up the states
    stateHelperProvider
    .state({
        name:'members',
        url:'/members',
        controller: 'memberCtrl',
        templateUrl: 'crud_partials/members.html',
        children:[{
            name: 'headercrud',
            url:'',
            templateUrl : 'partials/headercrud.html'
        }]
    },true)
    .state({
        name:'benefits',
        url:'/benefits',
        templateUrl: "crud_partials/benefits.html",
        controller: "benefitsCtrl"
    },true)
    .state({
        name:'claims',
        url:'/claims',
        templateUrl: "crud_partials/claims.html",
        controller: "claimsCtrl"
    },true)
    .state({
        name:'provider',
        url:'/provider',
        templateUrl: "crud_partials/provider.html",
        controller: "providerCtrl"
    },true)
    .state({
        name:'services',
        url:'/services',
        templateUrl: "crud_partials/services.html",
        controller: "servicesCtrl"
    },true)

});



//app.config(function ($routeProvider) {
//    $routeProvider.
//    when("/members", {
//        templateUrl: "crud_partials/members.html",
//        controller: "memberCtrl"
//    }).
//    when("/benefits", {
//        templateUrl: "crud_partials/benefits.html",
//        controller: "benefitsCtrl"
//    }).
//    when("/claims", {
//        templateUrl: "crud_partials/claims.html",
//        controller: "claimsCtrl"
//    }).
//    when("/provider", {
//        templateUrl: "crud_partials/provider.html",
//        controller: "providerCtrl"
//    }).
//    when("/services", {
//        templateUrl: "crud_partials/services.html",
//        controller: "servicesCtrl"
//    }).
//    otherwise({
//        redirectTo: '/'
//    }); });
