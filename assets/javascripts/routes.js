app.config(function($stateProvider, $urlRouterProvider ) {
    //
    // For any unmatched url, redirect to /state1
   $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
    .state('home',{
     url:'/',
     controller: function($rootScope){
        $rootScope.date = new Date();
     }
    })
    .state('members',{
        url:'/members',
        controller: 'memberCtrl',
        templateUrl: 'partials/members/index.html'
    }).
    state('members.list',{
        url:'/list',
        templateUrl: 'partials/members/list.html',
        parent:'members',
        controller: function($rootScope){
            $rootScope.title = 'Members List'
        }
    }).
     state('members.add',{
        url:'/add',
        templateUrl: 'partials/members/form.html',
        parent:'members',
        controller: function($rootScope){
            $rootScope.title = 'Register Member'   
        }
    }).
      state('members.view',{
        url:'/view',
        templateUrl: 'partials/members/form.html',
        parent:'members',
        controller: function($rootScope){
            $rootScope.title = 'View Member'   
        }
    })

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
