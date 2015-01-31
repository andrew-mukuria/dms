app.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    //
    // Now set up the states
    $stateProvider
    .state('login', {
            url: '/login',
            templateUrl: 'partials/users/login.html',
            controller: function($rootScope) {
                $rootScope.date = new Date();
            }
        }).
     state('lock-screen', {
            url: '/lock-screen',
            templateUrl: 'partials/users/lock-screen.html',
            controller: function($rootScope) {
                $rootScope.date = new Date();
            }
        }).
    state('dashboard', {
        url: '/dashboard',
        controller: '',
        templateUrl: 'partials/global/dashboard.html'
    }).
    state('knowledge-base', {
        url: '/knowledge-base',
        controller: function($rootScope) {
            $rootScope.title = 'Knowledge Base'
        },
        templateUrl: 'partials/knowledge-base/index.html'
    }).
    state('knowledge-base.list', {
        url: '/list',
        templateUrl: 'partials/knowledge-base/list.html',
        parent: 'knowledge-base',
        controller: function($rootScope,$scope) {
            $rootScope.title = 'Members List',
            $scope.articles=[];
        }
    }).
    state('knowledge-base.add', {
        url: '/add',
        templateUrl: 'partials/knowledge-base/form.html',
        parent: 'knowledge-base',
        controller: function($rootScope) {
            $rootScope.title = 'Register Member'
        }
    }).
    state('knowledge-base.view', {
        url: '/view',
        templateUrl: 'partials/knowledge-base/form.html',
        parent: 'knowledge-base',
        controller: function($rootScope) {
            $rootScope.title = 'View Member'
        }
    }).
    state('knowledge-base.statistics', {
        url: '/statistics',
        templateUrl: 'partials/knowledge-base/statistics.html',
        parent: 'knowledge-base',
        controller: function($scope) {
            $scope.totalMembers();
        }
    }).
    state('members', {
        url: '/members',
        controller: 'memberCtrl',
        templateUrl: 'partials/members/index.html'
    }).
    state('members.list', {
        url: '/list',
        templateUrl: 'partials/members/list.html',
        parent: 'members',
        controller: function($rootScope,$scope) {
            $rootScope.title = 'Members List';
            $scope.getMembers();
        }
    }).
    state('members.add', {
        url: '/add',
        templateUrl: 'partials/members/form.html',
        parent: 'members',
        controller: function($rootScope) {
            $rootScope.title = 'Register Member'
        }
    }).
    state('members.view', {
        url: '/view',
        templateUrl: 'partials/members/form.html',
        parent: 'members',
        controller: function($rootScope) {
            $rootScope.title = 'View Member'
        }
    }).
    state('members.statistics', {
        url: '/statistics',
        templateUrl: 'partials/members/statistics.html',
        parent: 'members',
        controller: function($scope) {
            $scope.totalMembers();
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