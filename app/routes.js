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
            controller: 'usersCtrl'
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
    state('users', {
        url: '/users',
        controller: 'usersCtrl',
        templateUrl: 'app/partials/users/index.html'
    }).
    state('users.view', {
        url: '/view',
        controller: function($rootScope,$scope) {
            $rootScope.title = 'View Profile';
            $scope.getUsers();
        },
        templateUrl: 'app/partials/users/form.html'
    }).
    state('users.list', {
        url: '/list',
        controller: function($rootScope,$scope) {
            $rootScope.title = 'Users List';
            $scope.getUsers();
        },
        templateUrl: 'app/partials/users/list.html'
    }).
    state('test-requests', {
        url: '/test-requests',
        controller: 'testsCtrl',
        templateUrl: 'app/partials/test-requests/index.html'
    }).
    state('test-requests.list', {
        url: '/list',
        controller: 'testsCtrl',
        templateUrl: 'app/partials/test-requests/list.html'
    }).
    state('tests', {
        url: '/tests',
        controller: 'testsCtrl',
        templateUrl: 'app/partials/tests/index.html'
    }).
    state('tests.view', {
        url: '/view',
        controller: function($rootScope,$scope) {
            $rootScope.title = 'View Tests';
            $scope.getUsers();
        },
        templateUrl: 'app/partials/tests/form.html'
    }).
    state('tests.list', {
        url: '/list',
        controller: function($rootScope,$scope) {
            $rootScope.title = 'Tests List';
            $scope.getTests();
        },
        templateUrl: 'app/partials/tests/list.html'
    }).
    state('tests.dissolution', {
        url: '/dissolution',
        templateUrl: 'app/partials/tests/dissolution/index.html'
    }).
    state('tests.dissolution.hplc', {
        url: '/hplc',
        templateUrl: 'app/partials/tests/dissolution/hplc.html'
    }).
    state('clients', {
        url: '/clients',
        controller: 'clientsCtrl',
        templateUrl: 'app/partials/clients/index.html'
    }).
    state('clients.add', {
        url: '/add',
        controller: function($rootScope,$scope) {
            $rootScope.title = 'Register Client';
            $scope.clientProfile=[];
        },
        templateUrl: 'app/partials/clients/form.html'
    }).
    state('clients.view', {
        url: '/view',
        controller: function($rootScope,$scope) {
            $rootScope.title = 'View Clients';
        },
        templateUrl: 'app/partials/clients/form.html'
    }).
    state('clients.list', {
        url: '/list',
        controller: function($rootScope,$scope) {
            $rootScope.title = 'Clients List';
            $scope.getClients();
        },
        templateUrl: 'app/partials/clients/list.html'
    })

});