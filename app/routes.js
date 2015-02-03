app.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    //
    // Now set up the states
    $stateProvider
    .state('login', {
            url: '/login',
            templateUrl: 'app/partials/users/login.html',
            controller: function($rootScope) {
                $rootScope.date = new Date();
            }
        }).
     state('lock-screen', {
            url: '/lock-screen',
            templateUrl: 'app/partials/users/lock-screen.html',
            controller: function($rootScope) {
                $rootScope.date = new Date();
            }
        }).
    state('dashboard', {
        url: '/dashboard',
        controller: '',
        templateUrl: 'app/partials/global/dashboard.html'
    }).
    state('knowledge-base', {
        url: '/knowledge-base',
        controller: function($rootScope) {
            $rootScope.title = 'Knowledge Base'
        },
        templateUrl: 'app/partials/knowledge-base/index.html'
    }).
    state('knowledge-base.list', {
        url: '/list',
        templateUrl: 'app/partials/knowledge-base/list.html',
        parent: 'knowledge-base',
        controller: function($rootScope,$scope) {
            $rootScope.title = 'Members List',
            $scope.articles=[];
        }
    }).
    state('knowledge-base.add', {
        url: '/add',
        templateUrl: 'app/partials/knowledge-base/form.html',
        parent: 'knowledge-base',
        controller: function($rootScope) {
            $rootScope.title = 'Register Member'
        }
    }).
    state('knowledge-base.view', {
        url: '/view',
        templateUrl: 'app/partials/knowledge-base/form.html',
        parent: 'knowledge-base',
        controller: function($rootScope) {
            $rootScope.title = 'View Member'
        }
    }).
    state('knowledge-base.statistics', {
        url: '/statistics',
        templateUrl: 'app/partials/knowledge-base/statistics.html',
        parent: 'knowledge-base',
        controller: function($scope) {
            $scope.totalMembers();
        }
    }).
    state('members', {
        url: '/members',
        controller: 'memberCtrl',
        templateUrl: 'app/partials/members/index.html'
    }).
    state('members.list', {
        url: '/list',
        templateUrl: 'app/partials/members/list.html',
        parent: 'members',
        controller: function($rootScope,$scope) {
            $rootScope.title = 'Members List';
            $scope.getMembers();
        }
    }).
    state('members.add', {
        url: '/add',
        templateUrl: 'app/partials/members/form.html',
        parent: 'members',
        controller: function($rootScope) {
            $rootScope.title = 'Register Member'
        }
    }).
    state('members.view', {
        url: '/view',
        templateUrl: 'app/partials/members/form.html',
        parent: 'members',
        controller: function($rootScope) {
            $rootScope.title = 'View Member'
        }
    }).
    state('members.statistics', {
        url: '/statistics',
        templateUrl: 'app/partials/members/statistics.html',
        parent: 'members',
        controller: function($scope) {
            $scope.totalMembers();
        }
    })

});