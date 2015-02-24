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
        controller: function($rootScope, $scope) {
            $rootScope.title = 'View Profile';
            $scope.getUsers();
        },
        templateUrl: 'app/partials/users/form.html'
    }).
    state('users.list', {
        url: '/list',
        controller: function($rootScope, $scope) {
            $rootScope.title = 'Users List';
            $scope.getUsers();
        },
        templateUrl: 'app/partials/users/list.html'
    }).
    state('location', {
        url: '/location',
        controller: '',
        templateUrl: 'app/partials/location/index.html'
    }).
    state('location.archdiocese', {
        url: '/archdiocese',
        controller: '',
        templateUrl: 'app/partials/location/archdiocese.index.html'
    }).
    state('location.diocese', {
        url: '/diocese',
        controller: '',
        templateUrl: 'app/partials/location/diocese.index.html'
    }).
    state('location.deanery', {
        url: '/deanery',
        controller: '',
        templateUrl: 'app/partials/location/deanery.index.html'
    }).
    state('location.parishes', {
        url: '/parishes',
        controller: 'parishesCtrl',
        templateUrl: 'app/partials/location/parishes.index.html'
    }).
    state('location.parishes.list', {
        url: '/list',
        controller: function($rootScope, $scope) {
            $rootScope.title = 'Parish List';
            $scope.getParishes();
        },
        templateUrl: 'app/partials/location/parishes.list.html'
    }).
    state('location.parishes.view', {
        url: '/view',
        controller: function($rootScope, $scope) {
            $rootScope.title = 'Parish View';
            $scope.getParishes();
        },
        templateUrl: 'app/partials/location/parishes.view.html'
    }).
    state('location.members', {
        url: '/members',
        controller: '',
        templateUrl: 'app/partials/location/members.index.html'
    }).
    state('location.services', {
        url: '/services',
        controller: '',
        templateUrl: 'app/partials/location/services.index.html'
    }).
    state('location.services.add', {
        url: '/add',
        controller: '',
        templateUrl: 'app/partials/location/services.add.html'
    })

});
