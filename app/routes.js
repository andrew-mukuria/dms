//** Le routes **//
app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states

//** Le routes accessible by any dude **//
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/partials/users/login.html',
      controller: 'LoginCtrl'
    }).
    state('home', {
      url: '/',
      templateUrl: 'app/partials/front-end/index.html',
         controller: 'HomeCtrl'
       }).
    state('register', {
      url: '/register',
      templateUrl: 'app/partials/users/register.html',
      controller: 'RegisterCtrl'
    }).
    state('lock-screen', {
    url: '/lock-screen',
    templateUrl: 'app/partials/users/lock-screen.html',
    controller: function($rootScope) {
      $rootScope.date = new Date();
    }
  }).
//** Le routes which dudes need authorization **//
    state('dashboard', {
    url: '/dashboard',
    controller: 'dashboardCtrl',
    //** Check if user is logged in, if not redirect the dude to the login page**//
    resolve: {
          auth: function($auth, $state) {
            return $auth.validateUser().catch(function(){
              // redirect unauthorized users to the login page
              $state.go('login');
            });
          }
        },
    templateUrl: 'app/partials/global/dashboard.html'
  }).
// With the resolve in this state, only authenticated dudes will be able to see routes that are
 // children of this 'users'state  
  state('users', {
    url: '/users',
    controller: 'usersCtrl',
    resolve: {
          auth: function($auth, $state) {
            return $auth.validateUser().catch(function(){
              // redirect unauthorized users to the login page
              $state.go('login');
            });
          }
        },
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
// With the resolve in this state, only authenticated dudes will be able to see routes that are
 // children of this 'location'state  
  state('location', {
    url: '/location',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Location';
    },
//** Check if dude is logged in, if not redirect the dude to the login page**//
    resolve: {
          auth: function($auth, $state) {
            return $auth.validateUser().catch(function(){
              // redirect unauthorized dudes to the login page
              $state.go('login');
            });
          }
        },
    templateUrl: 'app/partials/location/index.html'
  }).
  state('location.archdioceses', {
    url: '/archdioceses',
    controller: 'archdiocesesCtrl',
    templateUrl: 'app/partials/location/archdioceses.index.html'
  }).
  state('location.archdioceses.list', {
    url: '/list',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Archidiocese List';
      $scope.getArchdioceses();
    },
    templateUrl: 'app/partials/location/archdioceses.list.html'
  }).
  state('location.archdioceses.view', {
    url: '/view',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Archidiocese View';
      $scope.getArchdioceses();
      $scope.setStatus('update');
  },
    templateUrl: 'app/partials/location/archdioceses.view.html'
  }).
  state('location.archdioceses.add', {
    url: '/add',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Archdioceses Add';
      $scope.getArchdioceses();
      $scope.setStatus('add');
    },
    templateUrl: 'app/partials/location/archdioceses.view.html'
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
      $scope.setStatus('update');
    },
    templateUrl: 'app/partials/location/dioceses.view.html'
  }).
    state('location.dioceses.add', {
    url: '/add',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Dioceses Add';
      $scope.getDioceses();
      $scope.setStatus('add');
    },
    templateUrl: 'app/partials/location/dioceses.view.html'
  }).
  state('location.deaneries', {
    url: '/deanery',
    controller: 'deaneriesCtrl',
    templateUrl: 'app/partials/location/deaneries.index.html'
  }).
  state('location.deaneries.list', {
    url: '/list',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Deaneries List';
      $scope.getDeaneries();
    },
    templateUrl: 'app/partials/location/deaneries.list.html'
  }).
  state('location.deaneries.view', {
    url: '/view',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Deaneries View';
      $scope.getDeaneries();
      $scope.setStatus('update');
    },
    templateUrl: 'app/partials/location/deaneries.view.html'
  }).
  state('location.deaneries.add', {
    url: '/add',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Deaneries Add';
      $scope.getDeaneries();
      $scope.setStatus('add');
    },
    templateUrl: 'app/partials/location/deaneries.view.html'
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
      $rootScope.title = 'Members List';
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
    templateUrl: 'app/partials/location/members.view.html'
  }).

  state('location.members.add', {
    url: '/add',
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Member Add';
      $scope.getMembers();
      $scope.setStatus('add');
    },
    templateUrl: 'app/partials/location/members.view.html'
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
      $scope.getServices();
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
  });
});