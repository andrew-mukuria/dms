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
  state('location.archdioceses', {
    url: '/archdioceses',
    controller: '',
    templateUrl: 'app/partials/location/archdioceses.index.html'
  }).
  state('location.dioceses', {
    url: '/dioceses',
    controller: 'diocesesCtrl',
    templateUrl: 'app/partials/location/dioceses.index.html'
  }).
  state('location.dioceses.list', {
    url: '/list',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Diocese List';
      $scope.getDioceses();
    },
    templateUrl: 'app/partials/location/dioceses.list.html'
  }).
  state('location.dioceses.view', {
    url: '/view',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Diocese View';
      $scope.getDioceses();
    },
    templateUrl: 'app/partials/location/dioceses.view.html'
  }).
  state('location.deaneries', {
    url: '/deanery',
    controller: '',
    templateUrl: 'app/partials/location/deaneries.index.html'
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
      $scope.setStatus('update');
    },
    templateUrl: 'app/partials/location/parishes.view.html'
  }).
  state('location.parishes.add', {
    url: '/add',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Parish Add';
      $scope.getParishes();
      $scope.setStatus('add');
    },
    templateUrl: 'app/partials/location/parishes.view.html'
  }).
  state('location.members', {
    url: '/members',
    controller: 'membersCtrl',
    templateUrl: 'app/partials/location/members.index.html'
  }).
  state('location.members.list', {
    url: '/list',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Member List';
      $scope.getMembers();
    },
    templateUrl: 'app/partials/location/members.list.html'
  }).
  state('location.members.view', {
    url: '/view',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Member View';
      $scope.getMembers();
      $scope.setStatus('update');
    },
    templateUrl: 'app/partials/location/members.index.html'
  }).

  state('location.services', {
    url: '/services',
    controller: 'servicesCtrl',
    templateUrl: 'app/partials/location/services.index.html'
  }).
  state('location.services.list', {
    url: '/list',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Services List';
      $scope.getDioceses();
    },
    templateUrl: 'app/partials/location/services.list.html'
  }).
  state('location.services.view', {
    url: '/view',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Services View';
      $scope.getServices();
    },
    templateUrl: 'app/partials/location/services.view.html'
  }).
  state('location.services.today', {
    url: '/today',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Services Today';
      $scope.getServices();
    },
    templateUrl: 'app/partials/location/services.today.html'
  }).
  state('location.services.add', {
    url: '/add',
    controller: '',
    templateUrl: 'app/partials/location/services.add.html'
  })

});
