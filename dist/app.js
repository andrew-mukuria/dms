var app = angular.module("dms", ['ui.router','restangular','smart-table','textAngular','angularMoment','LocalStorageModule','slick', 'highcharts-ng']);

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

;// I control the main demo.
app.controller(
	"clientsCtrl", ['$scope', '$rootScope', '$filter', '$timeout', 'MedsRestangular', '$state', 'localStorageService', 'MySessionService', function(scope, rootScope, filter, timeout, MedsRestangular, state, localStorageService, MySessionService) {
		getClientCount();

		scope.getClient = function getClient(newClient) {
			scope.clientProfile = newClient;
			state.go('clients.view');
		}

		scope.getClients = function getClients() {
			var AllClients = MedsRestangular.all('clients');
			// This will query /accounts and return a promise.
			AllClients.customGET('').then(function(clients) {
				//console.log(clients);
				scope.rowCollection = clients;
				scope.displayedCollection = [].concat(scope.rowCollection);
			});
		}

		function getClientCount() {
			var AllClients = MedsRestangular.all('clients');
			// This will query /accounts and return a promise.
			AllClients.customGET('').then(function(clients) {
				// console.log(clients);
				scope.records = clients.length;
				scope.recordsPerPage = 5;
				scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
			});
		}

	}]
);;// I control the main demo.
app.controller(
  "diocesesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      getDioceseCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getDiocese = function getDiocese(newDiocese) {
        console.log(newDiocese);
        scope.dioceseProfile = newDiocese;
        state.go('location.dioceses.view');
      }

      scope.getDioceses = function getDioceses() {
        var Dioceses = DMSRestangular.all('dioceses');
        // This will query /accounts and return a promise.
        Dioceses.customGET('').then(function(dioceses) {
          //console.log(users);
          scope.rowCollection = dioceses;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });
      }

      scope.login = function login() {
        rootScope.user = [];
        var user = DMSRestangular.one('user').one('username', scope.formData
          .username).one('password', scope.formData.password).one(
          'format', 'json');
        // This will query /accounts and return a promise.
        user.customGET('').then(function(userObj) {
          localStorageService.set('meds_user', userObj);
          state.go('users');

        });
      }

       scope.setStatus = function setStatus(status) {
        scope.status = status;
        if (status == 'add') {
          scope.parishProfile = [];
        }
      }

      function getDioceseCount() {
        var Dioceses = DMSRestangular.all('dioceses');
        // This will query /accounts and return a promise.
        Dioceses.customGET('').then(function(dioceses) {
          // console.log(users);
          scope.records = dioceses.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }
    }


  ]
);
;// I control the main demo.
app.controller(
  "archdiocesesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      getArchdioceseCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getArchdiocese = function getArchdiocese(newArchdiocese) {
        console.log(newArchdiocese);
        scope.ArchdioceseProfile = newArchdiocese;
        state.go('location.archdioceses.view');
      }

      scope.getArchdioceses = function getArchdioceses() {
        var Archdioceses = DMSRestangular.all('archdioceses');
        // This will query /accounts and return a promise.
        Archdioceses.customGET('').then(function(archdioceses) {
          //console.log(users);
          scope.rowCollection = archdioceses;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });
      }

      scope.login = function login() {
        rootScope.user = [];
        var user = DMSRestangular.one('user').one('username', scope.formData
          .username).one('password', scope.formData.password).one(
          'format', 'json');
        // This will query /accounts and return a promise.
        user.customGET('').then(function(userObj) {
          localStorageService.set('meds_user', userObj);
          state.go('users');

        });
      }

	  scope.setStatus = function setStatus(status) {
        scope.status = status;
        if (status == 'add') {
          scope.parishProfile = [];
        }
      }

      function getArchdioceseCount() {
        var Archdioceses = DMSRestangular.all('archdioceses');
        // This will query /accounts and return a promise.
        Archdioceses.customGET('').then(function(archdioceses) {
          // console.log(users);
          scope.records = archdioceses.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }
    }

    
  ]
);
;
app.controller(
  "deaneriesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      getDeaneryCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getDeanery = function getDeanery(newDeanery) {
        console.log(newDeanery);
        scope.DeaneryProfile = newDeanery;
        state.go('location.deaneries.view');
      }

      scope.getDeaneries = function getDeaneries() {
        var Deaneries = DMSRestangular.all('deaneries');
        // This will query /accounts and return a promise.
        Deaneries.customGET('').then(function(deaneries) {
          //console.log(users);
          scope.rowCollection = deaneries;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });
      }

      scope.login = function login() {
        rootScope.user = [];
        var user = DMSRestangular.one('user').one('username', scope.formData
          .username).one('password', scope.formData.password).one(
          'format', 'json');
        // This will query /accounts and return a promise.
        user.customGET('').then(function(userObj) {
          localStorageService.set('meds_user', userObj);
          state.go('users');

        });
      }

    scope.setStatus = function setStatus(status) {
        scope.status = status;
        if (status == 'add') {
          scope.parishProfile = [];
        }
      }

      function getDeaneryCount() {
        var Deaneries = DMSRestangular.all('deaneries');
        // This will query /accounts and return a promise.
        Deaneries.customGET('').then(function(deaneries) {
          // console.log(users);
          scope.records = deaneries.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }
    }

    
  ]
);
;
app.controller(
  "membersCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {
      var Members = DMSRestangular.all('members');
      getMemberCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getMember = function getMember(newMember) {
        scope.memberProfile = newMember;
        state.go('location.members.view');
      }

      scope.getMembers = function getMembers() {
        Members.customGET('').then(function(members) {
          scope.rowCollection = members;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });
      }

      scope.login = function login() {
        rootScope.user = [];
        var user = DMSRestangular.one('user').one('username', scope.formData
          .username).one('password', scope.formData.password).one(
          'format', 'json');
        // This will query /accounts and return a promise.
        user.customGET('').then(function(userObj) {
          localStorageService.set('meds_user', userObj);
          state.go('users');

        });
      }

      function getMemberCount() {
        Members.customGET('').then(function(members) {
          scope.records = members.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }

      scope.setStatus = function setStatus(status) {
        scope.status = status;
        if (status == 'add') {
          scope.memberProfile = [];
        }
      }
      scope.newMember = function newMember() {

      }

      scope.updateMember = function updateMember() {
        member = scope.memberProfile;
        updatedmember = DMSRestangular.one('members.json', member.id);
        updatedmember[0] = member;
        updatedmember.put(member);
      }

    }
  ]
);
;// I control the main demo.
app.controller(
  "parishesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {
      var Parishes = DMSRestangular.all('parishes');
      getParishCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getParish = function getParish(newParish) {
        scope.parishProfile = newParish;
        state.go('location.parishes.view');
      }

      scope.getParishes = function getParishes() {
        Parishes.customGET('').then(function(parishes) {
          scope.rowCollection = parishes;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });
      }

      scope.login = function login() {
        rootScope.user = [];
        var user = DMSRestangular.one('user').one('username', scope.formData
          .username).one('password', scope.formData.password).one(
          'format', 'json');
        // This will query /accounts and return a promise.
        user.customGET('').then(function(userObj) {
          localStorageService.set('meds_user', userObj);
          state.go('users');

        });
      }

      function getParishCount() {
        Parishes.customGET('').then(function(parishes) {
          scope.records = parishes.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }

      scope.setStatus = function setStatus(status) {
        scope.status = status;
        if (status == 'add') {
          scope.parishProfile = [];
        }
      }
      scope.newParish = function newParish() {
        parish = scope.parishProfile;
        today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
        day = today.getDay();
        parish.created_at = year + '-' + month + '-' + day;
        parish.updated_at = year + '-' + month + '-' + day;
        console.log(parish);
        parish = {
          'name': 'St. Chris',
          'location': 'Kabete',
          'in_charge': 'Oscar',
          'created_at': parish.created_at,
          'updated_at': parish.updated_at
        };
        console.log(parish);
        // Parishes.post(parish);
      }

      scope.updateParish = function updateParish() {
        parish = scope.parishProfile;
        updatedParish = DMSRestangular.one('parishes', parish.id);
        updatedParish[0] = parish;
        updatedParish.put(parish);
      }

    }
  ]
);
;// I control the main demo.
app.controller(
  "servicesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {
      var Services = DMSRestangular.all('services');
      getServiceCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getService = function getService(newService) {
        console.log(newService);
        scope.service = newService;
        state.go('location.services.view');
      }

      scope.getServices = function getServices() {

        // This will query /accounts and return a promise.
        Services.customGET('').then(function(services) {
          // console.log(services[0]);
          scope.rowCollection = services;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });
      }

      scope.login = function login() {
        rootScope.user = [];
        var user = DMSRestangular.one('user').one('username', scope.formData
          .username).one('password', scope.formData.password).one(
          'format', 'json');
        // This will query /accounts and return a promise.
        user.customGET('').then(function(userObj) {
          localStorageService.set('meds_user', userObj);
          state.go('users');

        });
      }

      function getServiceCount() {
        // This will query /accounts and return a promise.
        Services.customGET('').then(function(services) {
          // console.log(users);
          scope.records = services.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }

      scope.newService = function newService() {
        parish = {
          "name": "St. Lukes",
          "in_charge": "Pastor Oscar",
          "location": "Outer Ring Road",
          "updated_at": "2015-01-01 00:00:00 UTC",
          "created_at": "2015-01-01 00:00:00 UTC"
        }
        Services.post(parish);
      }
    }
  ]
);
;
// I control the main demo.
app.controller(
  "dashboardCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      rootScope.title = 'Dashboard';

      getMemberCount();
      getParishCount();
      getDioceseCount();
      getArchdioceseCount();

      rootScope.user = MySessionService.getLoggedUser();


      scope.login = function login() {
        rootScope.user = [];
        var user = DMSRestangular.one('user').one('username', scope.formData
          .username).one('password', scope.formData.password).one(
          'format', 'json');
        // This will query /accounts and return a promise.
        user.customGET('').then(function(userObj) {
          localStorageService.set('meds_user', userObj);
          state.go('users');

        });
      }

      function getMemberCount() {
      var Members   = DMSRestangular.all('members');
        Members.customGET('').then(function(members) {
          scope.members = members.length;
        });
      }

       function getParishCount() {
      var Parishes  = DMSRestangular.all('parishes');
        Parishes.customGET('').then(function(parishes) {
          scope.parishes = parishes.length;
        });
      } 

        function getDioceseCount() {
      var Dioceses = DMSRestangular.all('dioceses');
        Dioceses.customGET('').then(function(dioceses) {
          scope.dioceses = dioceses.length;
        });
      }

       function getArchdioceseCount() {
      var Archidioceses = DMSRestangular.all('archdioceses');
        Archidioceses.customGET('').then(function(archdioceses) {
          scope.archdioceses = archdioceses.length;
        });
      }


    }
    
  ]
);;// I control the main demo.
app.controller(
    "testsCtrl", ['$scope', '$rootScope', '$filter', '$timeout', 'MedsRestangular', '$state','localStorageService','MySessionService', function(scope, rootScope, filter, timeout, MedsRestangular, state, localStorageService, MySessionService) {
        getTestCount();

		scope.getTest = function getTest(newTest) {
			scope.testProfile = newTest;
			state.go('tests.view');
		}

		scope.getTests = function getTests() {
			var AllTests = MedsRestangular.all('tests');
			// This will query /accounts and return a promise.
			AllTests.customGET('').then(function(tests) {
				//console.log(tests);
				scope.rowCollection = tests;
				scope.displayedCollection = [].concat(scope.rowCollection);
			});
		}

		function getTestCount() {
			var AllTests = MedsRestangular.all('tests');
			// This will query /accounts and return a promise.
			AllTests.customGET('').then(function(tests) {
				// console.log(tests);
				scope.records = tests.length;
				scope.recordsPerPage = 5;
				scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
			});
		}
        
    }]
);;// I control the main demo.
app.controller(
  "usersCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {

      getUserCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getUser = function getUser(newUser) {
        console.log(newUser);
        scope.userProfile = newUser;
        state.go('users.view');
      }

      scope.getUsers = function getUsers() {
        var AllUsers = DMSRestangular.all('users');
        // This will query /accounts and return a promise.
        AllUsers.customGET('').then(function(users) {
          //console.log(users);
          scope.rowCollection = users;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });
      }

      scope.login = function login() {
        rootScope.user = [];
        var user = DMSRestangular.one('user').one('username', scope.formData
          .username).one('password', scope.formData.password).one(
          'format', 'json');
        // This will query /accounts and return a promise.
        user.customGET('').then(function(userObj) {
          localStorageService.set('meds_user', userObj);
          state.go('users');

        });
      }

      function getUserCount() {
        var AllUsers = DMSRestangular.all('users');
        // This will query /accounts and return a promise.
        AllUsers.customGET('').then(function(users) {
          // console.log(users);
          scope.records = users.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }
    }
  ]
);
;// app.directive("head", function () {
//     return {
//         templateUrl: "app/partials/global/head.html"
//     }
// });

app.directive("header", function () {
    return {
        templateUrl: "app/partials/global/header.html"
    }
});
app.directive("sidemenu", function () {
    return {
        templateUrl: "app/partials/global/side-menu.html"
    }
});
app.directive("rails", function () {
    return {
        templateUrl: "app/partials/global/rails.html"
    }
});
app.directive("formSideMenu", function () {
    return {
        templateUrl: "app/partials/global/forms/side-menu.html"
    }
});

app.directive('isActiveNav', [ '$location', function($location) {
return {
 restrict: 'A',
 link: function(scope, element) {
   scope.location = $location;
   scope.$watch('location.path()', function(currentPath) {
     if('#' + currentPath == element[0].hash) {
       element.addClass('active');
     } else {
       element.removeClass('active');
     }
   });
 }
 };
}]);
;app.config(function($stateProvider, $urlRouterProvider) {
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
    controller: 'dashboardCtrl',
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
    controller: function($rootScope, $scope) {
      $rootScope.title = 'Location';
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
  })
});
;
// I act a repository for the remote header collection.
app.service("criteriaService",
            function( $http, $q ) {
    return({
        create: create
    });



    function create(array_data) {
        result = Array('done');
        return( result );

    }

    // ---
    // PRIVATE METHODS.
    // ---


    // I transform the error response, unwrapping the application dta from
    // the API response payload.
    function handleError( response ) {

        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
        ) {

            return( $q.reject( "An unknown error occurred." ) );

        }

        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );

    }


    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {
        return( response.data );

    }

}
           );
;
// I act a repository for the remote header collection.
app.service("MySessionService",
            function( localStorageService ) {
    return({
        getLoggedUser: getLoggedUser
    });


    function getLoggedUser(){
        console.log(localStorageService.get('meds_user'));
        return localStorageService.get('meds_user');
    }



}
           );
;angular.module('templates-dist', ['../app/partials/clients/form.html', '../app/partials/clients/index.html', '../app/partials/clients/list.html', '../app/partials/dashboard.html', '../app/partials/global/dashboard.html', '../app/partials/global/forms/side-menu.html', '../app/partials/global/head.html', '../app/partials/global/header.html', '../app/partials/global/headerCrud.html', '../app/partials/global/rails.html', '../app/partials/global/side-menu.html', '../app/partials/knowledge-base/form.html', '../app/partials/knowledge-base/index.html', '../app/partials/knowledge-base/list.html', '../app/partials/location/archdioceses.index.html', '../app/partials/location/deaneries.index.html', '../app/partials/location/dioceses.index.html', '../app/partials/location/dioceses.list.html', '../app/partials/location/dioceses.view.html', '../app/partials/location/index.html', '../app/partials/location/members.index.html', '../app/partials/location/parishes.index.html', '../app/partials/location/parishes.list.html', '../app/partials/location/parishes.view.html', '../app/partials/location/services.add.html', '../app/partials/location/services.index.html', '../app/partials/location/services.today.html', '../app/partials/location/services.view.html', '../app/partials/test-requests/index.html', '../app/partials/test-requests/list.html', '../app/partials/tests/dissolution/form.html', '../app/partials/tests/dissolution/hplc.html', '../app/partials/tests/dissolution/index.html', '../app/partials/tests/index.html', '../app/partials/tests/list.html', '../app/partials/users/form.html', '../app/partials/users/index.html', '../app/partials/users/list.html', '../app/partials/users/lock-screen.html', '../app/partials/users/login.html', '../app/partials/users/statistics.html']);

angular.module("../app/partials/clients/form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/clients/form.html",
    "<div class=\"ui grid\">\n" +
    "    <div class=\"twelve wide column\">\n" +
    "        <!-- Form -->\n" +
    "        <form class=\"ui form ui segment\" id=\"clientForm\" action=\"\" method=\"post\">\n" +
    "            <div class=\"fields\">\n" +
    "                <div class=\"field eight wide required\">\n" +
    "                    <label>First Name</label>\n" +
    "                    <div class=\"ui icon left input\">\n" +
    "                        <i class=\"icon ion-person\"></i>\n" +
    "                        <input name=\"applicantName\" id=\"applicantName\" type=\"text\" ng-model=\"clientProfile.applicantName\"/>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"field eight wide required\">\n" +
    "                    <label>Last Name</label>\n" +
    "                    <div class=\"ui icon left input\">\n" +
    "                        <i class=\"icon ion-person\"></i>\n" +
    "                        <input name=\"applicantAdrress\" id=\"applicantAdrress\" type=\"text\" ng-model=\"clientProfile.applicantAdrress\"/>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"fields\">\n" +
    "                <div class=\"field left icon four wide required\">\n" +
    "                    <label>Email Address</label>\n" +
    "                    <div class=\"ui icon left input\">\n" +
    "                        <i class=\"icon ion-email\"></i>\n" +
    "                        <input name=\"email\" id=\"email\" type=\"text\" ng-model=\"clientProfile.email\"/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"field left icon four wide required\">\n" +
    "                    <label>Telephone No.</label>\n" +
    "                    <div class=\"ui icon left input\">\n" +
    "                        <i class=\"icon ion-ios-telephone\"></i>\n" +
    "                        <input name=\"telephone\" id=\"telephone\" type=\"text\" ng-model=\"clientProfile.telephone\"/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"field left icon eight wide required\">\n" +
    "                    <label>Location</label>\n" +
    "                    <div class=\"ui icon left input\">\n" +
    "                        <i class=\"icon fa fa-list\"></i>\n" +
    "                        <input name=\"location\" id=\"location\" type=\"text\" ng-model=\"clientProfile.location\"/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "            </div>\n" +
    "            <div class=\"ui error message\"></div>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"four wide column\">\n" +
    "        <div class=\"ui segment\">\n" +
    "            <div class=\"ui statistic\" id=\"total\">\n" +
    "                <div class=\"value\">\n" +
    "                    {{records}}\n" +
    "                </div>\n" +
    "                <div class=\"label\">\n" +
    "                    <i class=\"icon database\"></i>Total Records\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("../app/partials/clients/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/clients/index.html",
    "<header>\n" +
    "\n" +
    "</header>\n" +
    "<!-- Users Index.html -->\n" +
    "<nav class=\"ui inverted blue menu centered\">\n" +
    "    <div href=\"\" ui-sref=\"clients\" class=\"item\">\n" +
    "    	<b>\n" +
    "    	<i class=\"icon fa fa-building\"></i>\n" +
    "    	Clients\n" +
    "    	</b>\n" +
    "    </div>\n" +
    "    <a is-active-nav class=\"item\" ui-sref=\"clients.statistics\"><i class=\"icon ion-arrow-graph-up-right\"></i>Statistics</a>\n" +
    "    <a is-active-nav class=\"item\" ui-sref=\"clients.list\"><i class=\"icon fa fa-list\"></i>List Clients</a>\n" +
    "    <a is-active-nav class=\"item\" ui-sref=\"clients.add\"><i class=\"icon fa fa-plus\"></i>Register Client</a>\n" +
    "</nav>\n" +
    "<div ui-view class=\"centered within\"></div>");
}]);

angular.module("../app/partials/clients/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/clients/list.html",
    "<!-- Members' List -->\n" +
    "<table class=\"ui table celled compact bordered\" st-safe-src=\"rowCollection\" st-table=\"displayedCollection\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th><i class=\"icon ion-person\"></i>Name</th>\n" +
    "            <th><i class=\"icon fa fa-mail-reply\"></i>Address</th>\n" +
    "            <th><i class=\"icon ion-email\"></i>Email Address</th>\n" +
    "             <th><i class=\"icon ion-ios-telephone\"></i>Telephone</th>\n" +
    "            <th><i class=\"icon ion-map\"></i>Location</th>\n" +
    "        </tr>\n" +
    "        \n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'applicantName'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'applicantAddress'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'email'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'telephone'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'location'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td></td>\n" +
    "        </tr>\n" +
    "        <tr ng-repeat=\"row in displayedCollection\"  st-select-row=\"row\">\n" +
    "            <td>{{row.applicantName}}</td>\n" +
    "            <td>{{row.applicantAddress}}</td>\n" +
    "            <td>{{row.email}}</td>\n" +
    "            <td>{{row.telephone}}</td>\n" +
    "            <td>{{row.location}}</td>\n" +
    "            <td width=\"150\">\n" +
    "            <button type=\"button\" ng-click=\"getClient(row)\" class=\"ui blue tiny button icon\">\n" +
    "				<i class=\"icon ion-more\">\n" +
    "				</i>\n" +
    "			</button>\n" +
    "            <button type=\"button\" ng-click=\"\" class=\"ui red tiny button icon\">\n" +
    "				<i class=\"icon ion-minus-circled\">\n" +
    "				</i>\n" +
    "			</button>\n" +
    "\n" +
    "			</td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "     <tfoot>\n" +
    "        	<tr>\n" +
    "        		<th colspan=\"1\">{{records}} Records</th>\n" +
    "                <th colspan=\"5\">\n" +
    "                    <div st-pagination=\"\" st-items-by-page=\"recordsPerPage\" st-displayed-pages=\"pages\"></div>\n" +
    "                </th>\n" +
    "        	</tr>\n" +
    "        </tfoot>\n" +
    "</table>");
}]);

angular.module("../app/partials/dashboard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/dashboard.html",
    "");
}]);

angular.module("../app/partials/global/dashboard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/global/dashboard.html",
    "<header></header>\n" +
    "\n" +
    "<div ui-view class=\"centered within\">\n" +
    "	<div class=\"ui stackable grid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"four wide column\">\n" +
    "            <div class=\"inner small ui segment\">\n" +
    "                <div class=\"ui statistic\">\n" +
    "					<div class=\"value\">{{records}}</div>\n" +
    "                </div>\n" +
    "                <h6 class='ui header'><i class=\"icon fa fa-bar-chart-o\"></i>Total Members</h6>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"four wide column\">\n" +
    "            <div class=\"inner small ui segment\">\n" +
    "                <div class='graph'>\n" +
    "                </div>\n" +
    "                <h6 class='ui header'><i class=\"icon fa fa-bar-chart-o\"></i>Header</h6>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"four wide column\">\n" +
    "            <div class=\"inner small ui segment\">\n" +
    "                <div class='graph'></div>\n" +
    "                <h6 class='ui header'><i class=\"icon fa fa-bar-chart-o\"></i>Header</h6>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"four wide column\">\n" +
    "            <div class=\"inner small ui segment\">\n" +
    "                <div class='graph'></div>\n" +
    "                <h6 class='ui header'><i class=\"icon fa fa-bar-chart-o\"></i>Header</h6>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"eight wide column\">\n" +
    "            <div class=\"inner ui segment\">\n" +
    "                <div class='graph'>\n" +
    "                    <canvas id=\"line\" class=\"chart chart-line\" data=\"data\" labels=\"labels\"\n" +
    "                    legend=\"true\" series=\"series\" click=\"onClick\"></canvas>\n" +
    "                </div>\n" +
    "                <h6 class='ui header'><i class=\"icon fa fa-bar-chart-o\"></i>Header</h6>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"eight wide column\">\n" +
    "            <div class=\"inner ui segment\">\n" +
    "                <div class='graph'>\n" +
    "                    <canvas id=\"line\" class=\"chart chart-bar\" data=\"data\" labels=\"labels\"\n" +
    "                    legend=\"true\" series=\"series\" click=\"onClick\"></canvas>\n" +
    "                </div>\n" +
    "                <h6 class='ui header'><i class=\"icon fa fa-bar-chart-o\"></i>Header</h6>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/global/forms/side-menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/global/forms/side-menu.html",
    "<div class=\"ui green menu\">\n" +
    "	<a href=\"\" class=\"item\" ng-repeat=\"section in sections\">\n" +
    "		{{section.title}}\n" +
    "		<i class=\"{{section.icon}}\"></i>\n" +
    "	</a>\n" +
    "</div>");
}]);

angular.module("../app/partials/global/head.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/global/head.html",
    "<title>{{title}}</title>\n" +
    "\n" +
    "<link rel=\"stylesheet\" href=\"libs/webfont-opensans/css/stylesheet.css\" media=\"screen\" title=\"no title\" charset=\"utf-8\">\n" +
    "<link rel=\"stylesheet\" href=\"libs/font-awesome/css/font-awesome.css\">\n" +
    "<link rel=\"stylesheet\" href=\"libs/ionicons/css/ionicons.css\">\n" +
    "<link rel=\"stylesheet\" href=\"dist/styles.css\">\n" +
    "<link rel=\"stylesheet\" href=\"libs/semantic-ui/dist/semantic.css\">\n" +
    "<link rel=\"stylesheet\" href=\"libs/ionicons/css/ionicons.css\" media=\"screen\" title=\"no title\" charset=\"utf-8\">\n" +
    "<link rel='stylesheet' href='libs/textAngular/src/textAngular.css'>\n" +
    "<link rel='stylesheet' href='libs/slick-carousel/slick/slick.css'>\n" +
    "\n" +
    "");
}]);

angular.module("../app/partials/global/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/global/header.html",
    "<div class=\"ui tiered menu\">\n" +
    "    <nav class=\"ui menu\" id=\"main\">\n" +
    "        <a class=\"item\" href=\"\" data-transition=\"push\" id=\"show_side_menu\"><i class=\"icon ion-navicon-round\"></i>More</a>\n" +
    "        <a href=\"\" ui-sref=\"messages\" class=\"item\"><i class=\"icon mail\"></i>Messages<div class=\"ui red round label\">{{messages.length}}</div></a>\n" +
    "        <div class=\"right menu\">\n" +
    "            <div class=\"item\">\n" +
    "                <i class=\"icon ion-person\"></i>{{user[0].fname + ' '+ user[0].lname}}\n" +
    "            </div>\n" +
    "            <div class='item'><i class=\"icon calendar\"></i>{{date | date:'d-MM-yyyy'}}</div>\n" +
    "            <a ui-sref=\"login\" class=\"item\"><i class=\"icon ion-log-out\"></i>Logout</a>\n" +
    "        </div>\n" +
    "    </nav>\n" +
    "</div>\n" +
    "<script>\n" +
    "    $('#show_side_menu').click(function(){\n" +
    "        //        alert('hi');\n" +
    "        $('#main-side-menu').sidebar('toggle');\n" +
    "    });\n" +
    "</script>");
}]);

angular.module("../app/partials/global/headerCrud.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/global/headerCrud.html",
    "<div class=\"ui menu sub-menu\">\n" +
    "    <a class=\"item\">User Information</a>\n" +
    "    <a class=\"register item\" id=\"register\"><i class=\"icon\"></i>Register</a>\n" +
    "    <a class=\"view item\" id=\"view\"><i class=\"icon\"></i>View</a>\n" +
    "    <a class=\"item\"><i class=\"icon fa fa-edit\"></i>Edit</a>\n" +
    "    <div class=\"item\">\n" +
    "        <div class=\"ui left top pointing floating labeled icon dropdown button\" id=\"filter\" ng-model=\"filterText\">\n" +
    "\n" +
    "            <i class=\"filter icon\"></i>\n" +
    "            <span class=\"text\">Filter</span>\n" +
    "            <div class=\"menu\">\n" +
    "                <div class=\"header\">\n" +
    "                    <i class=\"tags icon\"></i>\n" +
    "                    Filter by criteria\n" +
    "                </div>\n" +
    "                <div class=\"divider\"></div>\n" +
    "                <div class=\"item\" ng-repeat=\"filter in filters\">\n" +
    "                    <i class=\"{{filter.icon}}\"></i>{{filter.text}}\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"item\">\n" +
    "        <div class=\"ui icon mini input\">\n" +
    "            <input  id=\"search\" class=\"typeahead\" type=\"search\" placeholder=\"Search Here...\" ng-model=\"search\"/>\n" +
    "            <i class=\"icon search\"></i>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/global/rails.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/global/rails.html",
    "<div class=\"ui right rail\">\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/global/side-menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/global/side-menu.html",
    "<div class=\"item\">\n" +
    "    <a is-active-nav href=\"\" class=\"item\" ui-sref=\"dashboard\">\n" +
    "        Dashboard\n" +
    "        <i class=\"icon ion-arrow-graph-up-right\"></i>\n" +
    "    </a>\n" +
    "</div>\n" +
    "<div class=\"item\">\n" +
    "    Diocese Management\n" +
    "    <div class=\"menu\">\n" +
    "        <a ui-sref=\"overview\" href=\" \" class=\"item\">Overview</a>\n" +
    "        <a ui-sref=\"location\" href=\" \" class=\"item\">Location</a>\n" +
    "        <a ui-sref=\"staff\" href=\" \" class=\"item\">Staff</a>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"item\">\n" +
    "    <a is-active-nav href=\"\" class=\"item\" ui-sref=\"users\">\n" +
    "        User Management\n" +
    "        <i class=\"icon ion-person\"></i>\n" +
    "    </a>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("../app/partials/knowledge-base/form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/knowledge-base/form.html",
    "<form action=\"\" class='ui form segment'>\n" +
    "<h1 class=\"ui header\">Publish Article</h1>\n" +
    "    <div class=\"sixteen wide field\">\n" +
    "        <div class=\"ui input left icon\">\n" +
    "            <i class=\"icon ion-document-text\"></i><input type=\"text\" name=\"username\" placeholder=\"Enter Title...\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"sixteen wide field\">\n" +
    "\n" +
    "           <div text-angular ng-model=\"htmlVariable\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"sixteen wide field\">\n" +
    "        <div class=\"ui input left icon\">\n" +
    "            <i class=\"icon fa fa-tag\"></i><input type=\"text\" name=\"username\" placeholder=\"Enter Tags...\"></div>\n" +
    "        </div>\n" +
    "            <button class=\"ui icon green button\"><i class='icon ion-plus-round'></i>Publish</button>\n" +
    "</form>");
}]);

angular.module("../app/partials/knowledge-base/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/knowledge-base/index.html",
    "<header></header>\n" +
    "<nav class=\"ui inverted green menu centered\">\n" +
    "    <div href=\"\" ui-sref=\"knowledge-base\" class=\"item\" style=\"font-weight:bold\"><i class=\"icon ion-help\"></i>Knowledge Base</div>\n" +
    "     <a is-active-nav class=\"item\" ui-sref=\"knowledge-base.statistics\"><i class=\"icon ion-arrow-graph-up-right\"></i>Statistics</a>\n" +
    "    <a is-active-nav class=\"item\" ui-sref=\"knowledge-base.list\"><i class=\"icon fa fa-list\"></i>List Articles</a>\n" +
    "    <a is-active-nav class=\"item\" ui-sref=\"knowledge-base.add\"><i class=\"icon fa fa-plus\"></i>Publish Article</a>\n" +
    "</nav>\n" +
    "\n" +
    "<div ui-view class=\"centered within\"></div>");
}]);

angular.module("../app/partials/knowledge-base/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/knowledge-base/list.html",
    "<!-- Articles' List -->\n" +
    "<table class=\"ui table celled bordered\" st-safe-src=\"rowCollection\" st-table=\"displayedCollection\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th><i class=\"icon ion-document-text\"></i>Title</th>\n" +
    "            <th><i class=\"icon fa fa-tags\"></i>Tags</th>\n" +
    "            <th><i class=\"icon ion-person\"></i>Author</th>\n" +
    "            <th><i class=\"icon calendar\"></i>Date</th>\n" +
    "        </tr>\n" +
    "\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr>\n" +
    "            <td class=\"ui input\" ><input st-search=\"\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "            <td class=\"ui input\" ><input st-search=\"\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "            <td class=\"ui input\" ><input st-search=\"\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "            <td class=\"ui input\" ><input st-search=\"\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "            <td></td>\n" +
    "        </tr>\n" +
    "        <tr ng-repeat=\"row in displayedCollection\"  st-select-row=\"row\">\n" +
    "            <td>{{row.memberNo}}</td>\n" +
    "            <td>{{row.memberName}}</td>\n" +
    "            <td>{{row.dob}}</td>\n" +
    "            <td>{{row.dob}}</td>\n" +
    "            <td>\n" +
    "                <button type=\"button\" ng-click=\"r\" class=\"ui blue tiny button icon\">\n" +
    "                <i class=\"icon ion-more\">\n" +
    "                </i>\n" +
    "                </button>\n" +
    "                <button type=\"button\" ng-click=\"r\" class=\"ui red tiny button icon\">\n" +
    "                <i class=\"icon ion-minus-circled\">\n" +
    "                </i>\n" +
    "                </button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "    <tfoot>\n" +
    "    <tr>\n" +
    "        <th colspan=\"1\">{{articles.length}} Records</th>\n" +
    "        <th colspan=\"2\">\n" +
    "            <div st-pagination=\"\" st-items-by-page=\"recordsPerPage\" st-displayed-pages=\"pages\" class=\"text center\"></div>\n" +
    "        </th>\n" +
    "    </tr>\n" +
    "    </tfoot>\n" +
    "</table>");
}]);

angular.module("../app/partials/location/archdioceses.index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/archdioceses.index.html",
    "<!-- Archidiocese Index -->\n" +
    "<nav class=\"ui inverted blue menu\">\n" +
    "  <div href=\"\" ui-sref=\"location.archdiocese\" class=\"item\">\n" +
    "    <b>\n" +
    "      <i class=\"icon building\"></i>\n" +
    "      Archidiocese\n" +
    "    </b>\n" +
    "  </div>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.archdiocese.statistics\"><i class=\"icon ion-arrow-graph-up-right\"></i>Statistics</a>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.archdiocese.list\"><i class=\"icon fa fa-list\"></i>List Archidiocese</a>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.archdiocese.add\"><i class=\"icon fa fa-plus\"></i>Register Archidiocese</a>\n" +
    "</nav>\n" +
    "<div ui-view></div>\n" +
    "");
}]);

angular.module("../app/partials/location/deaneries.index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/deaneries.index.html",
    "<!-- Deanery Index -->\n" +
    "<nav class=\"ui inverted blue menu\">\n" +
    "  <div href=\"\" ui-sref=\"location.deanery\" class=\"item\">\n" +
    "    <b>\n" +
    "      <i class=\"icon building\"></i>\n" +
    "      Deanery\n" +
    "    </b>\n" +
    "  </div>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.deanery.statistics\"><i class=\"icon ion-arrow-graph-up-right\"></i>Text</a>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.deanery.list\"><i class=\"icon fa fa-list\"></i>List Deanery</a>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.deanery.add\"><i class=\"icon fa fa-plus\"></i>Register Deanery</a>\n" +
    "</nav>\n" +
    "<div ui-view></div>\n" +
    "");
}]);

angular.module("../app/partials/location/dioceses.index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/dioceses.index.html",
    "<!-- Diocese Index -->\n" +
    "<nav class=\"ui inverted blue menu\">\n" +
    "  <div href=\"\" ui-sref=\"location.dioceses\" class=\"item\">\n" +
    "    <b>\n" +
    "      <i class=\"icon building\"></i>\n" +
    "      Dioceses\n" +
    "    </b>\n" +
    "  </div>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.dioceses.statistics\"><i class=\"icon ion-arrow-graph-up-right\"></i>Statistics</a>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.dioceses.list\"><i class=\"icon fa fa-list\"></i>List Diocese</a>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.dioceses.add\"><i class=\"icon fa fa-plus\"></i>Register Diocese</a>\n" +
    "</nav>\n" +
    "<div ui-view></div>\n" +
    "");
}]);

angular.module("../app/partials/location/dioceses.list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/dioceses.list.html",
    "<!-- Parishes' List -->\n" +
    "<table class=\"ui table celled compact bordered\" st-safe-src=\"rowCollection\" st-table=\"displayedCollection\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><i class=\"icon ion-person\"></i>In Charge</th>\n" +
    "      <th><i class=\"icon fa fa-building\"></i>Name</th>\n" +
    "    </tr>\n" +
    "\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr>\n" +
    "      <td class=\"ui input\" ><input st-search=\"'in_charge'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "      <td class=\"ui input\" ><input st-search=\"'location'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "\n" +
    "      <td></td>\n" +
    "    </tr>\n" +
    "    <tr ng-repeat=\"row in displayedCollection\"  st-select-row=\"row\">\n" +
    "      <td>{{row.in_charge}}</td>\n" +
    "      <td>{{row.name}}</td>\n" +
    "      <td width=\"150\">\n" +
    "        <button type=\"button\" ng-click=\"getDiocese(row)\" class=\"ui blue tiny button icon\">\n" +
    "          <i class=\"icon ion-more\">\n" +
    "          </i>\n" +
    "        </button>\n" +
    "        <button type=\"button\" ng-click=\"\" class=\"ui red tiny button icon\">\n" +
    "          <i class=\"icon ion-minus-circled\">\n" +
    "          </i>\n" +
    "        </button>\n" +
    "\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "  <tfoot>\n" +
    "    <tr>\n" +
    "      <th colspan=\"1\">{{records}} Records</th>\n" +
    "      <th colspan=\"5\">\n" +
    "        <div st-pagination=\"\" st-items-by-page=\"recordsPerPage\" st-displayed-pages=\"pages\"></div>\n" +
    "      </th>\n" +
    "    </tr>\n" +
    "  </tfoot>\n" +
    "</table>\n" +
    "");
}]);

angular.module("../app/partials/location/dioceses.view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/dioceses.view.html",
    "<div class=\"ui grid\">\n" +
    "  <div class=\"twelve wide column\">\n" +
    "    <!-- Form -->\n" +
    "    <form class=\"ui form ui segment\" id=\"memberForm\" action=\"\" method=\"post\">\n" +
    "      <div class=\"fields\">\n" +
    "        <div class=\"field eight wide required\">\n" +
    "          <label>Name</label>\n" +
    "          <div class=\"ui icon left input\">\n" +
    "            <i class=\"icon building\"></i>\n" +
    "            <input name=\"fname\" id=\"fname\" type=\"text\" ng-model=\"dioceseProfile.name\"/>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"field left icon eight wide required\">\n" +
    "          <label>In Charge</label>\n" +
    "          <div class=\"ui icon left input\">\n" +
    "            <i class=\"icon ion-person\"></i>\n" +
    "            <input name=\"email\" id=\"email\" type=\"text\" ng-model=\"dioceseProfile.in_charge\"/>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <!--\n" +
    "      <div class=\"fields\">\n" +
    "\n" +
    "    </div>\n" +
    "  -->\n" +
    "  <div class=\"ui error message\"></div>\n" +
    "</form>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"four wide column\">\n" +
    "  <div class=\"ui segment\">\n" +
    "    <div class=\"ui statistic\" id=\"total\">\n" +
    "      <div class=\"value\">\n" +
    "        {{records}}\n" +
    "      </div>\n" +
    "      <div class=\"label\">\n" +
    "        <i class=\"icon database\"></i>Total Records\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/location/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/index.html",
    "<header>\n" +
    "\n" +
    "</header>\n" +
    "<!--  -->\n" +
    "<div class=\"centered within\">\n" +
    "  <div class=\"ui grid\">\n" +
    "    <div class=\"column four wide\">\n" +
    "      <div class=\"ui inverted blue vertical menu\">\n" +
    "        <a is-active-nav ui-sref=\"location.archdioceses\" class=\"item\">Archdiocese<i class='icon chevron right'></i></a>\n" +
    "        <a is-active-nav ui-sref=\"location.dioceses\" class=\"item\">Dioceses<i class='icon chevron right'></i></a>\n" +
    "        <a is-active-nav ui-sref=\"location.deaneries\" class=\"item\">Deaneries<i class='icon chevron right'></i></a>\n" +
    "        <a is-active-nav ui-sref=\"location.parishes\" class=\"item\">Parishes<i class='icon chevron right'></i></a>\n" +
    "        <a is-active-nav ui-sref=\"location.members\" class=\"item\">Members<i class='icon chevron right'></i></a>\n" +
    "        <a is-active-nav ui-sref=\"location.services\" class=\"item\">Services<i class='icon chevron right'></i></a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"column twelve wide\">\n" +
    "      <div ui-view></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/location/members.index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/members.index.html",
    "<!-- Members Index -->\n" +
    "<nav class=\"ui inverted blue menu\">\n" +
    "  <div href=\"\" ui-sref=\"location.members\" class=\"item\">\n" +
    "    <b>\n" +
    "      <i class=\"icon ion-ios-people\"></i>\n" +
    "      Members\n" +
    "    </b>\n" +
    "  </div>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.members.statistics\"><i class=\"icon ion-arrow-graph-up-right\"></i>Statistics</a>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.members.list\"><i class=\"icon fa fa-list\"></i>List Members</a>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.members.add\"><i class=\"icon fa fa-plus\"></i>Register Members</a>\n" +
    "</nav>\n" +
    "<div ui-view></div>\n" +
    "");
}]);

angular.module("../app/partials/location/parishes.index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/parishes.index.html",
    "<!-- Parish Index -->\n" +
    "<nav class=\"ui inverted blue menu\">\n" +
    "  <div href=\"\" ui-sref=\"location.parish\" class=\"item\">\n" +
    "    <b>\n" +
    "      <i class=\"icon building\"></i>\n" +
    "      Parishes\n" +
    "    </b>\n" +
    "  </div>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.parishes.statistics\"><i class=\"icon ion-arrow-graph-up-right\"></i>Statistics</a>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.parishes.list\"><i class=\"icon fa fa-list\"></i>List Parishes</a>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.parishes.add\"><i class=\"icon fa fa-plus\"></i>Register Parish</a>\n" +
    "</nav>\n" +
    "<div ui-view></div>\n" +
    "");
}]);

angular.module("../app/partials/location/parishes.list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/parishes.list.html",
    "<!-- Parishes' List -->\n" +
    "<table class=\"ui table celled compact bordered\" st-safe-src=\"rowCollection\" st-table=\"displayedCollection\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><i class=\"icon ion-person\"></i>In Charge</th>\n" +
    "      <th><i class=\"icon ion-person\"></i>Location</th>\n" +
    "    </tr>\n" +
    "\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr>\n" +
    "      <td class=\"ui input\" ><input st-search=\"'in_charge'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "      <td class=\"ui input\" ><input st-search=\"'location'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "\n" +
    "      <td></td>\n" +
    "    </tr>\n" +
    "    <tr ng-repeat=\"row in displayedCollection\"  st-select-row=\"row\">\n" +
    "      <td>{{row.in_charge}}</td>\n" +
    "      <td>{{row.location}}</td>\n" +
    "      <td width=\"150\">\n" +
    "        <button type=\"button\" ng-click=\"getParish(row)\" class=\"ui blue tiny button icon\">\n" +
    "          <i class=\"icon ion-more\">\n" +
    "          </i>\n" +
    "        </button>\n" +
    "        <button type=\"button\" ng-click=\"\" class=\"ui red tiny button icon\">\n" +
    "          <i class=\"icon ion-minus-circled\">\n" +
    "          </i>\n" +
    "        </button>\n" +
    "\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "  <tfoot>\n" +
    "    <tr>\n" +
    "      <th colspan=\"1\">{{records}} Records</th>\n" +
    "      <th colspan=\"5\">\n" +
    "        <div st-pagination=\"\" st-items-by-page=\"recordsPerPage\" st-displayed-pages=\"pages\"></div>\n" +
    "      </th>\n" +
    "    </tr>\n" +
    "  </tfoot>\n" +
    "</table>\n" +
    "");
}]);

angular.module("../app/partials/location/parishes.view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/parishes.view.html",
    "<div class=\"ui grid\">\n" +
    "  <div class=\"twelve wide column\">\n" +
    "    <!-- Form -->\n" +
    "    <form class=\"ui form ui segment\" id=\"memberForm\">\n" +
    "      <div class=\"fields\">\n" +
    "        <div class=\"field eight wide required\">\n" +
    "          <label>Name</label>\n" +
    "          <div class=\"ui icon left input\">\n" +
    "            <i class=\"icon building\"></i>\n" +
    "            <input name=\"fname\" id=\"fname\" type=\"text\" ng-model=\"parish.name\"/>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"field eight wide required\">\n" +
    "          <label>Location</label>\n" +
    "          <div class=\"ui icon left input\">\n" +
    "            <i class=\"icon map\"></i>\n" +
    "            <input name=\"lname\" id=\"lname\" type=\"text\" ng-model=\"parish.location\"/>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"fields\">\n" +
    "        <div class=\"field eight wide required\">\n" +
    "          <label>In Charge</label>\n" +
    "          <div class=\"ui icon left input\">\n" +
    "            <i class=\"icon ion-person\"></i>\n" +
    "            <input name=\"email\" id=\"email\" type=\"text\" ng-model=\"parish.in_charge\"/>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"buttons\">\n" +
    "        <button class=\"ui button blue\" ng-click=\"updateParish()\" ng-show=\"status=='update'\">Update Parish</button>\n" +
    "        <button class=\"ui button teal\" ng-click=\"newParish()\" ng-show=\"status=='add'\">Add Parish</button>\n" +
    "      </div>\n" +
    "      <div class=\"ui error message\"></div>\n" +
    "    </form>\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"four wide column\">\n" +
    "    <div class=\"ui segment\">\n" +
    "      <div class=\"ui statistic\" id=\"total\">\n" +
    "        <div class=\"value\">\n" +
    "          {{records}}\n" +
    "        </div>\n" +
    "        <div class=\"label\">\n" +
    "          <i class=\"icon database\"></i>Total Records\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  {{parish}}\n" +
    "");
}]);

angular.module("../app/partials/location/services.add.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/services.add.html",
    "<form class='ui form segment'>\n" +
    "	<div class=\"fields\">\n" +
    "		<div class=\"field eight wide\">\n" +
    "			<div class=\"ui right icon field\">\n" +
    "				<i class=\"icon\"></i>\n" +
    "				<input placeholder=\"Service Name\" type=\"text\"/>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"field four wide\">\n" +
    "			<div class=\"ui right icon field\">\n" +
    "				<i class=\"icon\"></i>\n" +
    "				<input placeholder=\"Service Type\" type=\"text\"/>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"field four wide\">\n" +
    "			<div class=\"ui right icon field\">\n" +
    "				<i class=\"icon\"></i>\n" +
    "				<input placeholder=\"Service Type\" type=\"text\"/>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"fields\">\n" +
    "		<div class=\"field eight wide\">\n" +
    "			<div class=\"ui right icon field\">\n" +
    "				<i class=\"icon\"></i>\n" +
    "				<input placeholder=\"Text...\" type=\"text\"/>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"field eight wide\">\n" +
    "			<div class=\"ui right icon field\">\n" +
    "				<i class=\"icon\"></i>\n" +
    "				<input placeholder=\"Text...\" type=\"text\"/>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"fields\">\n" +
    "		<div class=\"field eight wide\">\n" +
    "			<div class=\"ui right icon field\">\n" +
    "				<i class=\"icon\"></i>\n" +
    "				<input placeholder=\"Text...\" type=\"text\"/>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"field eight wide\">\n" +
    "			<div class=\"ui right icon field\">\n" +
    "				<i class=\"icon\"></i>\n" +
    "				<input placeholder=\"Text...\" type=\"text\"/>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<button class=\"ui green right icon button\">Register<i class=\"icon icon fa fa-plus\"></i></button>\n" +
    "</form>\n" +
    "");
}]);

angular.module("../app/partials/location/services.index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/services.index.html",
    "<!-- Services Index -->\n" +
    "<nav class=\"ui inverted blue menu\">\n" +
    "  <div href=\"\" ui-sref=\"location.services\" class=\"item\">\n" +
    "    <b>\n" +
    "      <i class=\"icon book\"></i>\n" +
    "      Services\n" +
    "    </b>\n" +
    "  </div>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.services.today\"><i class=\"icon ion-calendar\"></i>Today</a>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.services.list\"><i class=\"icon fa fa-list\"></i>List Services</a>\n" +
    "  <a is-active-nav class=\"item\" ui-sref=\"location.services.add\"><i class=\"icon fa fa-plus\"></i>Register Services</a>\n" +
    "</nav>\n" +
    "<!-- Services View -->\n" +
    "<div ui-view>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/location/services.today.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/services.today.html",
    "<div class=\"ui grid\">\n" +
    "  <div class=\"fourteen wide column\">\n" +
    "    <div class=\"ui input fluid icon\">\n" +
    "      <i class=\"icon search\"></i>\n" +
    "      <input type=\"search\" placeholder='Type Search Here' ng-model=\"searchText\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"ui three cards\">\n" +
    "  <div ng-repeat=\"row in displayedCollection | filter: searchText\" class=\"red card\">\n" +
    "    <div class=\"content\">\n" +
    "      <div class=\"header\">{{row.parish_name}}\n" +
    "        <span class=\"right floated\">\n" +
    "          <a href=\"\">\n" +
    "            <i class=\"icon share alternate\"></i>\n" +
    "          </a>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class=\"meta\">{{row.in_charge}}</div>\n" +
    "      <div class=\"description\">\n" +
    "        <h6 class=\"ui header\">{{row.name}}</h6>\n" +
    "        {{row.content}}\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"extra content row\">\n" +
    "      <div class=\"ui grid\">\n" +
    "        <!-- <div class=\"two wide column\">\n" +
    "          <i class=\"icon fa fa-tags\"></i>\n" +
    "        </div> -->\n" +
    "        <div class=\"twelve wide column\">\n" +
    "          {{row.tags}}\n" +
    "          <a href=\"\" ng-repeat=\"tag in row.tags\"> #{{tag}}</a>\n" +
    "          <a>#One</a><a>#Two</a>\n" +
    "        </div>\n" +
    "        <div class=\"two wide column\">\n" +
    "          <a href=\"\" ng-click=\"getService(row)\">\n" +
    "            <i class='icon ion-more'></i>\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <!-- <div class=\"card\">\n" +
    "  <div class=\"content\">\n" +
    "  <div class=\"header\">St. Mark's\n" +
    "  <span class=\"right floated\">\n" +
    "  <a href=\"\">\n" +
    "  <i class=\"icon share alternate\"></i>\n" +
    "</a>\n" +
    "</span>\n" +
    "</div>\n" +
    "<div class=\"meta\">Father Nani</div>\n" +
    "<div class=\"description\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
    "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
    "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
    "cillum dolore eu fugiat nulla pariatur.\n" +
    "</div>\n" +
    "</div>\n" +
    "<div class=\"extra content\">\n" +
    "<span class=\"left floated\">\n" +
    "<i class=\"icon fa fa-tags\"></i>\n" +
    "<a>#One</a><a>#Two</a>\n" +
    "</span>\n" +
    "<span class=\"right floated\">\n" +
    "<a href=\"\">\n" +
    "<i class='icon ion-more'></i>\n" +
    "</a>\n" +
    "</span>\n" +
    "</div>\n" +
    "</div>\n" +
    "<div class=\"card\">\n" +
    "<div class=\"content\">\n" +
    "<div class=\"header\">Consolata Shrine\n" +
    "<span class=\"right floated\">\n" +
    "<a href=\"\">\n" +
    "<i class=\"icon share alternate\"></i>\n" +
    "</a>\n" +
    "</span>\n" +
    "</div>\n" +
    "<div class=\"meta\">Father Nani</div>\n" +
    "<div class=\"description\">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
    "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
    "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
    "cillum dolore eu fugiat nulla pariatur.\n" +
    "</div>\n" +
    "</div>\n" +
    "<div class=\"extra content\">\n" +
    "<span class=\"left floated\">\n" +
    "<i class=\"icon fa fa-tags\"></i>\n" +
    "<a>#One</a><a>#Two</a>\n" +
    "</span>\n" +
    "<span class=\"right floated\">\n" +
    "<a href=\"\">\n" +
    "<i class=\"icon ion-more\"></i>\n" +
    "</a>\n" +
    "</span>\n" +
    "</div>\n" +
    "</div> -->\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/location/services.view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/location/services.view.html",
    "<form action=\"\" class='ui form segment'>\n" +
    "  <h1 class=\"ui header\">Publish Serivce</h1>\n" +
    "  <div class=\"fields\">\n" +
    "    <div class=\"eight wide field\">\n" +
    "      <div class=\"ui input left icon\">\n" +
    "        <i class=\"icon ion-document-text\"></i>\n" +
    "        <input type=\"text\" ng-model=\"service.name\" placeholder=\"Service Name ...\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"four wide field\">\n" +
    "      <select class=\"ui dropdown\" ng-model=\"service.parish\">\n" +
    "        <option value=\"\">Parish Name</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <div class=\"four wide field\">\n" +
    "      <select class=\"ui dropdown\" ng-model=\"service.tags\">\n" +
    "        <option value=\"\">Tags</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"sixteen wide field\">\n" +
    "\n" +
    "    <div text-angular ng-model=\"service.content\"></div>\n" +
    "  </div>\n" +
    "  <button class=\"ui icon green button\"><i class='icon ion-plus-round'></i>Publish</button>\n" +
    "</form>\n" +
    "{{service}}\n" +
    "<script>\n" +
    "$('.ui.dropdown').dropdown();\n" +
    "</script>\n" +
    "");
}]);

angular.module("../app/partials/test-requests/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/test-requests/index.html",
    "<header>\n" +
    "\n" +
    "</header>\n" +
    "<!-- Users Index.html -->\n" +
    "<nav class=\"ui inverted green menu centered\">\n" +
    "    <div href=\"\" ui-sref=\"tests\" class=\"item\">\n" +
    "    	<b>\n" +
    "    	<i class=\"icon ion-beaker\"></i>\n" +
    "    	Tests\n" +
    "    	</b>\n" +
    "    </div>\n" +
    "    <a is-active-nav class=\"item\" ui-sref=\"tests.statistics\"><i class=\"icon ion-arrow-graph-up-right\"></i>Statistics</a>\n" +
    "    <a is-active-nav class=\"item\" ui-sref=\"tests.add\"><i class=\"icon fa fa-plus\"></i>New Test Request</a>\n" +
    "</nav>\n" +
    "<div ui-view class=\"centered within\"></div>\n" +
    "\n" +
    "<script>\n" +
    "	$('.ui.dropdown').dropdown();\n" +
    "</script>");
}]);

angular.module("../app/partials/test-requests/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/test-requests/list.html",
    "<!-- Tests' List -->\n" +
    "<table class=\"ui table celled compact bordered\" st-safe-src=\"rowCollection\" st-table=\"displayedCollection\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th><i class=\"icon\"></i>Test</th>\n" +
    "            <th><i class=\"icon\"></i>Status</th>\n" +
    "        </tr>\n" +
    "        \n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr>\n" +
    "        <td class=\"ui input\" ><input st-search=\"\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td></td>\n" +
    "        </tr>\n" +
    "        <tr ng-repeat=\"row in displayedCollection\"  st-select-row=\"row\">\n" +
    "            <td>{{row.name}}</td>\n" +
    "            <td>\n" +
    "                <div class=\"ui label\">Unassigned <div class=\"detail\">0</div></div>\n" +
    "                <div class=\"ui blue label\">Assigned <div class=\"detail\">0</div></div>\n" +
    "                <div class=\"ui green label\">Done : No Repeat <div class=\"detail\">0</div></div>\n" +
    "                <div class=\"ui purple label\">Done : Repeat <div class=\"detail\">0</div></div>\n" +
    "                <div class=\"ui orange label\">Quarantined <div class=\"detail\">0</div></div>\n" +
    "                <div class=\"ui red label\">Withdrawn <div class=\"detail\">0</div></div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "     <tfoot>\n" +
    "        	<tr>\n" +
    "        		<th colspan=\"1\">{{records}} Records</th>\n" +
    "                <th colspan=\"2\">\n" +
    "                    <div st-pagination=\"\" st-items-by-page=\"recordsPerPage\" st-displayed-pages=\"pages\"></div>\n" +
    "                </th>\n" +
    "        	</tr>\n" +
    "        </tfoot>\n" +
    "</table>");
}]);

angular.module("../app/partials/tests/dissolution/form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/tests/dissolution/form.html",
    "");
}]);

angular.module("../app/partials/tests/dissolution/hplc.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/tests/dissolution/hplc.html",
    "<!-- HPLC Partial -->\n" +
    "<div class=\"ui grid\">\n" +
    "    <div formSideMenu class=\"four wide column\">\n" +
    "    </div>\n" +
    "    <form class=\"twelve wide column\">\n" +
    "        <table class=\"ui table\">\n" +
    "            <input type=\"hidden\" name =\"assignment\" id=\"assignment\" value =\"\"><input type=\"hidden\" id=\"test_request\" name =\"test_request\" value =\"<?php echo $test_request;?>\">\n" +
    "            <input type=\"hidden\" name =\"analyst\" value =\"\">\n" +
    "            <input type =\"hidden\" id = \"label_claim\" value=\"\" />\n" +
    "            <tr>\n" +
    "                <td>Document</td>\n" +
    "                <td>Title</td>\n" +
    "                <td>REF</td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td>Effective Date</td>\n" +
    "                <td>ISSUE/REV</td>\n" +
    "                <td>Supersedes</td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td>Serial No.</td>\n" +
    "                <td colspan=\"2\">Batch/Lot No.</td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "        <div id=\"sectionOne\">\n" +
    "            <table class='ui table'>\n" +
    "                <tr>\n" +
    "                    <td>Registration Number: <?php echo $results['laboratory_number'];?></td>\n" +
    "                    <td>Request Date: <?php echo $results['date_time'];?></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td colspan=\"2\">Label Claim: <?php echo $results['active_ingredients'];?></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Brand Name: <?php echo $results['brand_name'];?></td>\n" +
    "                    <td>Method/Specifications: <?php echo $results['test_specification'];?></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Manufacturer Details:<br><br> <?php echo $results['manufacturer_name'];?><br><?php echo $results['manufacturer_address'];?></td>\n" +
    "                    <td>Clients Details:<br><br> <?php echo $results['applicant_name'];?><br><?php echo $results['applicant_address'];?> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Manufacturer Date: <?php echo $results['date_manufactured'];?></td>\n" +
    "                    <td>Expiry Date: <?php echo $results['expiry_date'];?></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Analysis Start Date: <?php echo date(\"d/m/Y\")?></td>\n" +
    "                    <td>Analysis End Date:</td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "            <table class='ui table'>\n" +
    "                <tr>\n" +
    "                    <td  class=\"ui header\"> MEDS Dissolution Test Form: By Normal HPLC Method</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Component:\n" +
    "                        <select class=\"ui dropdown\" class='ui dropdown'>\n" +
    "                            <option> Empty Set</option>\n" +
    "                        </select>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Equipment ID:</td>\n" +
    "                    <td>\n" +
    "                        <select class=\"ui dropdown\" id =\"equipment_make\" name=\"equipment_number\">\n" +
    "                            <option> Empty Set</option>\n" +
    "                        </select>\n" +
    "                    </td>\n" +
    "                    <td>Equipment Make:</td>\n" +
    "                    <td class=\"ui input\"><input type =\"text\" name =\"equipment_number\" id=\"equipmentid\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td   ><b>Preparation of Dissolution Medium</b></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  colspan=\"6\"><div text-angular ng-model=\"htmlVariable\"></div></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td   ><b>Dissolution System Setup</b></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td align = \"\"  ><b>Requirements</b></td><td align = \"center\" ><b>Actual</b></td><td align = \"left\" ><b>Comment</b></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Apparatus</td>\n" +
    "                    <td class=\"ui input\" > <input type =\"text\" name=\"apparatus\"> </td>\n" +
    "                    <td class=\"ui input\" > <input type =\"text\" name=\"actual_apparatus\"> </td>\n" +
    "                    <td class=\"ui input\" > <input type =\"text\" name=\"apparatus_comment\"> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Rotation</td>\n" +
    "                    <td class=\"ui input\"><input type =\"text\" name=\"rotation\"> </td>\n" +
    "                    <td class=\"ui input\"><input type =\"text\" name=\"actual_rotation\"> </td>\n" +
    "                    <td class=\"ui input\"> <input type =\"text\" name=\"rotation_comment\"> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Time</td>\n" +
    "                    <td class=\"ui input\">  <input type =\"text\" name=\"time\"> </td>\n" +
    "                    <td class=\"ui input\">  <input type =\"text\" name=\"actual_time\"> </td>\n" +
    "                    <td class=\"ui input\"> <input type =\"text\" name=\"time_comment\"> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Temperarture</td>\n" +
    "                    <td class=\"ui input\" >  <input type =\"text\" name=\"temperature\"> </td>\n" +
    "                    <td class=\"ui input\" >  <input type =\"text\" name=\"actual_temperature\"> </td>\n" +
    "                    <td class=\"ui input\" > <input type =\"text\" name=\"temperature_comment\"> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td ><b>Weight of Standard</b></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td align =\"center\" colspan=\"6\"><div text-angular ng-model=\"htmlVariable\"></div></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Balance Make:</td>\n" +
    "                    <td >\n" +
    "                        <select class=\"ui dropdown\" id =\"equipment_balance\" name=\"balance_make\">\n" +
    "                            <option> Empty Set</option>\n" +
    "\n" +
    "                        </select>\n" +
    "                    </td>\n" +
    "                    <td colspan=\"\" >ID Number:</td>\n" +
    "                    <td class=\"ui input\" ><input type =\"text\" name =\"balance_number\" id=\"idnumber\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <!-- start of adding standards-->\n" +
    "                <tr>\n" +
    "                    <td  > <b>Standard Description:</b></td>\n" +
    "                    <td >\n" +
    "                        <select class=\"ui dropdown\" id=\"standard_description_one\" name=\"standard_description\" >\n" +
    "                            <option> Empty Set</option>\n" +
    "                        </select>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td> Potency:</td>\n" +
    "                    <td class=\"ui input\"> <input type =\"text\" class=\"all_input\" name=\"potency\" id = \"potency\"> </td>\n" +
    "                    <td>Lot No.:</td>\n" +
    "                    <td class=\"ui input\"><input type =\"text\"class=\"all_input\" name=\"lot_no\" id =\"stdlotnumber\"> </td>\n" +
    "                    <td> ID No.:</td>\n" +
    "                    <td class=\"ui input\"><input type =\"text\"class=\"all_input\" name=\"id_no\" id =\"stdrefnumber\"> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td colspan=\"2\"> Weight of standard + container (g)</td>\n" +
    "                    <td class=\"ui input\"> <input type =\"text\"class=\"all_input\" name=\"standard_container\" id =\"standard_container\"> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td colspan=\"2\"> Weight of container (g) </td>\n" +
    "                    <td class=\"ui input\"> <input type =\"text\"class=\"all_input\" name=\"container\" id =\"container\" > </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td colspan=\"2\"> Weight of standard (g)</td>\n" +
    "                    <td class=\"ui input\"> <input type =\"text\"class=\"all_input\" name=\"standard_weight_1\" id =\"standard_weight_1\" > </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td > Dilution</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td colspan=\"6\">   <div text-angular ng-model=\"htmlVariable\"></div> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td > <b>Sample Preparation</b></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td colspan=\"6\" colspan=\"6\"><div text-angular ng-model=\"htmlVariable\"></div></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td class=\"ui input\"><b>Sample Dilution Factor:</b> [<input type =\"text\" name = \"df_1\" id = \"df_1\"> X <input type =\"text\" name = \"df_2\" id = \"df_2\">] / <input type =\"text\" name = \"df_3\" id = \"df_3\"></td>\n" +
    "                    <td class=\"ui input\" ><input type =\"text\" name = \"dilution_factor\" id = \"dilution_factor\"> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td   ><b>Determination of content- HPLC</b></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td   >System suitability </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td   ><b>Mobile Phase Preparation</b></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  colspan=\"6\"><div text-angular ng-model=\"htmlVariable\"></div></td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "            <table class=\"ui table\">\n" +
    "                <tr>\n" +
    "                    <td   ><b>The chromatographic conditions:</b></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td   ><b>Chromatographic System</b></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td rowspan = \"2\" align=\"right\"> <b>A stainless steel column:</b></td>\n" +
    "                    <td>  Name:</td>\n" +
    "                    <td>\n" +
    "                        <select class=\"ui dropdown\" id=\"name\" name=\"name\" >\n" +
    "                            <option>Blank Selection</option>\n" +
    "                        </select>\n" +
    "                    </td>\n" +
    "                    <td>  Length:</td>\n" +
    "                    <td class=\"ui input\">  <input type =\"text\" name=\"length\" id =\"length\"> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>  Lot/Serial No.:</td>\n" +
    "                    <td class=\"ui input\">  <input type =\"text\" name=\"serial_no\" id =\"serial_no\"> </td>\n" +
    "                    <td>  Manufacturer:</td>\n" +
    "                    <td class=\"ui input\">  <input type =\"text\" name=\"manufacturer\" id=\"manufacturer\"> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  align=\"right\"> Column Pressure:</td>\n" +
    "                    <td class=\"ui input\" >  <input type =\"text\" name=\"column_pressure\"> <select class=\"ui dropdown\" name=\"column_pressure_select\"><option value=\"Bar\">Bar</option><option value=\"MPA\">MPA</option><option value=\"PSI\">PSI</option></select> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td align=\"right\"> Column Oven Pressure:</td>\n" +
    "                    <td class=\"ui input\" > <input type =\"text\" name=\"column_oven_temp\"> <select class=\"ui dropdown\" name=\"column_oven_temp_select\"><option value=\"C\">Celcius</option><option value=\"F\">Fahrenheit</option></select> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td align=\"right\"> Mobile Phase Flow rate:</td>\n" +
    "                    <td class=\"ui input\"  ><input type =\"text\" name=\"flow_rate\"> ml/min</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td align=\"right\"> Detection of Wavelength:</td>\n" +
    "                    <td class=\"ui input\"  ><input type =\"text\" name=\"wavelength\"> nm</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><b>Suitability summary</b><br/>From chromatograms on -  </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td >\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "            <table class=\"ui table\">\n" +
    "                <tr>\n" +
    "                    <td><b></b></td>\n" +
    "                    <td><b>Retention Time (minutes)</b></td>\n" +
    "                    <td><b>Peak Area</b></td>\n" +
    "                    <td><b>Asymmetry</b></td>\n" +
    "                    <td><b>Resolution</b></td>\n" +
    "                    <td><b>Others</b></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>1.</td>\n" +
    "                    <td class=\"ui three wide input\"><input type = \"text\" class=\"rt\" name =\"rt_1\" id =\"rt_1\"></td>\n" +
    "                    <td class=\"ui three wide input\"><input type = \"text\" class=\"peak_area\" name =\"peak_area_1\" id =\"peak_area_1\"></td >\n" +
    "                    <td class=\"ui three wide input\"><input type = \"text\" class=\"asymmetry\" name =\"asymmetry_1\" id=\"asymmetry_1\"></td>\n" +
    "                    <td class=\"ui three wide input\"><input type = \"text\" class=\"resolution\" name =\"resolution_1\" id =\"resolution_1\"></td>\n" +
    "                    <td class=\"ui three wide input\"><input type = \"text\" class=\"other\" name =\"other_1\" id =\"other_1\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>2.</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"rt\" name =\"rt_2\" id =\"rt_2\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"peak_area\" name =\"peak_area_2\" id =\"peak_area_2\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"asymmetry\" name =\"asymmetry_2\" id=\"asymmetry_2\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"resolution\" name =\"resolution_2\" id =\"resolution_2\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"other\" name =\"other_2\" id =\"other_2\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>3.</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"rt\" name =\"rt_3\" id =\"rt_3\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"peak_area\" name =\"peak_area_3\" id =\"peak_area_3\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"asymmetry\" name =\"asymmetry_3\" id=\"asymmetry_3\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"resolution\" name =\"resolution_3\" id =\"resolution_3\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"other\" name =\"other_3\" id =\"other_3\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>4.</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"rt\" name =\"rt_4\" id =\"rt_4\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"peak_area\" name =\"peak_area_4\" id =\"peak_area_4\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"asymmetry\" name =\"asymmetry_4\" id=\"asymmetry_4\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"resolution\" name =\"resolution_4\" id =\"resolution_4\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"other\" name =\"other_4\" id =\"other_4\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>5.</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"rt\" name =\"rt_5\" id=\"rt_5\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"peak_area\" name =\"peak_area_5\" id =\"peak_area_5\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"asymmetry\" name =\"asymmetry_5\" id=\"asymmetry_5\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"resolution\" name =\"resolution_5\" id =\"resolution_5\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"other\" name =\"other_5\" id =\"other_5\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>6.</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"rt\" name =\"rt_6\" id=\"rt_6\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"peak_area\" name =\"peak_area_6\" id =\"peak_area_6\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"asymmetry\" name =\"asymmetry_6\" id =\"asymmetry_6\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"resolution\" name =\"resolution_6\"id =\"resolution_6\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"other\" name =\"other_6\"id =\"other_6\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Average</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"rt_avg\" name =\"rt_avg\" id =\"rt_avg\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"peak_area_avg\" name =\"peak_area_avg\" id =\"peak_area_avg\" ></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"asymmetry_avg\" name =\"asymmetry_avg\" id=\"asymmetry_avg\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"resolution_avg\" name =\"resolution_avg\" id =\"resolution_avg\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"other_avg\" name =\"other_avg\" id =\"other_avg\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>SD</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"rt_sd\" name =\"rt_sd\" id =\"rt_sd\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"peak_area_sd\" name =\"peak_area_sd\" id =\"peak_area_sd\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"asymmetry_sd\" name =\"asymmetry_sd\" id =\"asymmetry_sd\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"resolution_sd\" name =\"resolution_sd\" id =\"resolution_sd\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"other_sd\" name =\"other_sd\" id =\"other_sd\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>RSD</td>\n" +
    "                    <td class=\"ui input\" ><input class=\"rt_rsd\" id = \"rt_rsd\" type = \"text\" name =\"rt_rsd\"></td>\n" +
    "                    <td class=\"ui input\" ><input class=\"peak_area_rsd\" id = \"peak_area_rsd\" type = \"text\" name =\"peak_area_rsd\"></td>\n" +
    "                    <td class=\"ui input\" ><input class=\"asymmetry_rsd\" id = \"asymmetry_rsd\" type = \"text\" name =\"asymmetry_rsd\"></td>\n" +
    "                    <td class=\"ui input\" ><input class=\"resolution_rsd\" id = \"resolution_rsd\" type = \"text\" name =\"resolution_rsd\"></td>\n" +
    "                    <td class=\"ui input\" ><input class=\"other_rsd\" id = \"other_rsd\" type = \"text\" name =\"other_rsd\" id =\"other_rsd\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Acceptance Criteria</td>\n" +
    "                    <td class=\"ui input\"><input type=\"text\" class=\"rt_ac\" id=\"rt_ac\" name=\"rt_ac\" placeholder =\"NMT 2.0% RSD\"></td>\n" +
    "                    <td class=\"ui input\"><input type=\"text\" class=\"peak_area_ac\" id=\"peak_area_ac\" name=\"peak_area_ac\" placeholder =\"NMT 2.0% RSD\"></td>\n" +
    "                    <td class=\"ui input\"><input type=\"text\" class=\"asymmetry_ac\" id=\"asymmetry_ac\" name=\"asymmetry_ac\" placeholder =\"NMT 2.0% Avg\"></td>\n" +
    "                    <td class=\"ui input\"><input type=\"text\" class=\"resolution_ac\" id=\"resolution_ac\" name=\"resolution_ac\" placeholder =\"NLT 5.0% Avg\"></td>\n" +
    "                    <td class=\"ui input\"><input type=\"text\" class=\"other_ac\" id=\"other_ac\" name=\"other_ac\" placeholder =\"NLT\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Comment</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"rt_comment alerts\" name =\"rt_comment\" id =\"rt_comment\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"peak_area_comment alerts\" name =\"peak_area_comment\" id =\"peak_area_comment\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"asymmetry_comment alerts\" name =\"asymmetry_comment\" id =\"asymmetry_comment\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"resolution_comment alerts\" name =\"resolution_comment\" id =\"resolution_comment\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class=\"other_comment alerts\" name =\"other_comment\" id =\"other_comment\"></td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "\n" +
    "            <table class=\"ui table\">\n" +
    "                <tr>\n" +
    "                    <td class=\"ui input\" ><b>After</b> <input type =\"text\" name =\"minutes\"/> minutes</td>\n" +
    "                    <td><b>Peak Area from chromatograms - </b></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><b></b></td>\n" +
    "                    <td><b>Std 1</b></td>\n" +
    "                    <td><b>Sample 1</b></td>\n" +
    "                    <td><b>Sample 2</b></td>\n" +
    "                    <td><b>Sample 3</b></td>\n" +
    "                    <td><b>Sample 4</b></td>\n" +
    "                    <td><b>Sample 5</b></td>\n" +
    "                    <td><b>Sample 6</b></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>1.</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class = \"standard all_input\" name =\"sample_1\" id =\"sample_1\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_1 all_input\" name =\"sample_1_s1\" id =\"sample_1_s1\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_2 all_input\" name =\"sample_1_s2\" id =\"sample_1_s2\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_3 all_input\" name =\"sample_1_s3\" id =\"sample_1_s3\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_4 all_input\" name =\"sample_1_s4\" id =\"sample_1_s4\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_5 all_input\" name =\"sample_1_s5\" id =\"sample_1_s5\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_6 all_input\" name =\"sample_1_s6\" id =\"sample_1_s6\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>2.</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class = \"standard all_input\" name =\"sample_2\" id =\"sample_2\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_1 all_input\" name =\"sample_2_s1\" id =\"sample_2_s1\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_2 all_input\" name =\"sample_2_s2\" id =\"sample_2_s2\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_3 all_input\" name =\"sample_2_s3\" id =\"sample_2_s3\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_4 all_input\" name =\"sample_2_s4\" id =\"sample_2_s4\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_5 all_input\" name =\"sample_2_s5\" id =\"sample_2_s5\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_6 all_input\" name =\"sample_2_s6\" id =\"sample_2_s6\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>3.</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class = \"standard all_input\" name =\"sample_3\" id =\"sample_3\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_1 all_input\" name =\"sample_3_s1\" id =\"sample_3_s1\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_2 all_input\" name =\"sample_3_s2\" id =\"sample_3_s2\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_3 all_input\" name =\"sample_3_s3\" id =\"sample_3_s3\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_4 all_input\" name =\"sample_3_s4\" id =\"sample_3_s4\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_5 all_input\" name =\"sample_3_s5\" id =\"sample_3_s5\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_6 all_input\" name =\"sample_3_s6\" id =\"sample_3_s6\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>4.</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class = \"standard all_input\" name =\"sample_4\" id =\"sample_4\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_1 all_input\" name =\"sample_4_s1\" id =\"sample_4_s1\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_2 all_input\" name =\"sample_4_s2\" id =\"sample_4_s2\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_3 all_input\" name =\"sample_4_s3\" id =\"sample_4_s3\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_4 all_input\" name =\"sample_4_s4\" id =\"sample_4_s4\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_5 all_input\" name =\"sample_4_s5\" id =\"sample_4_s5\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_6 all_input\" name =\"sample_4_s6\" id =\"sample_4_s6\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>5.</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class = \"standard all_input\" name =\"sample_5\" id =\"sample_5\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_1 all_input\" name =\"sample_5_s1\" id =\"sample_5_s1\" onchange =\"avg_sample1()\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_2 all_input\" name =\"sample_5_s2\" id =\"sample_5_s2\" onchange =\"avg_sample2()\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_3 all_input\" name =\"sample_5_s3\" id =\"sample_5_s3\" onchange =\"avg_sample3()\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_4 all_input\" name =\"sample_5_s4\" id =\"sample_5_s4\" onchange =\"avg_sample4()\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_5 all_input\" name =\"sample_5_s5\" id =\"sample_5_s5\" onchange =\"avg_sample5()\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_6 all_input\" name =\"sample_5_s6\" id =\"sample_5_s6\" onchange =\"avg_sample6()\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Average</td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class = \"standard_avg all_input\" name =\"avg\" id =\"avg\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_1_avg all_input\" name =\"avg_s1\" id =\"avg_s1\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_2_avg all_input\" name =\"avg_s2\" id =\"avg_s2\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_3_avg all_input\" name =\"avg_s3\" id =\"avg_s3\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_4_avg all_input\" name =\"avg_s4\" id =\"avg_s4\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_5_avg all_input\" name =\"avg_s5\" id =\"avg_s5\"></td>\n" +
    "                    <td class=\"ui input\"><input type = \"text\" class =\"sample_6_avg all_input\" name =\"avg_s6\" id =\"avg_s6\"></td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "            <table class=\"ui table\" >\n" +
    "                <tr>\n" +
    "                    <td  align = \"center\">RETENTION TIME: <input type = \"text\" name =\"sample_rrt_avg\" id =\"sample_value\" placeholder=\"RT of SAMPLE\"> / <input type = \"text\" name =\"sample_rrt_avg\" id =\"std_value\" placeholder =\"RT of STD\"></td>\n" +
    "                    <td ><input type = \"text\" name =\"sample_rrt_avg\" id =\"sample_rrt_avg\"></td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "            <table class=\"ui table\" >\n" +
    "                <tr>\n" +
    "                    <td colspan=\"8\" style=\"padding:8px;border-bottom:solid 1px #c4c4ff;\">\n" +
    "\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  align = \"center\"style=\"padding: 12px;background-color:#ffffff;border-bottom: solid 1px #bfbfbf;border-top: solid 1px #bfbfbf;color:#0000fb;\"> <u>PEAK OF SAMPLE (PKT) * WT OF STANDARD IN FINAL DILUTION * DILUTION FACTOR(DF) * 100 * POTENCY (P) </u> <br/> PEAK AREA OF STANDARD(PKSTD) * LABEL CLAIM (LC)</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  style=\"padding: 12px;background-color:#ffffff;border-bottom: dotted 1px #bfbfbf;border-top: dotted 1px #bfbfbf;\"> <b><u>Determination 1</u></b></td>\n" +
    "                    <td  style=\"padding: 12px;background-color:#ffffff;border-bottom: dotted 1px #bfbfbf;border-top: dotted 1px #bfbfbf;\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  align =\"center\" style=\"padding: 12px;\">\n" +
    "                        <input type =\"text\" name=\"det_1_pkt\" id =\"det_1_pkt\" size =\"10\" placeholder=\"PKT\" onchange=\"calculation_determinations()\">\n" +
    "                        <input type =\"text\" name=\"det_1_wstd\" id =\"det_1_wstd\" size =\"10\" placeholder=\"WSTD\">\n" +
    "                        <input type =\"text\" name=\"det_1_df\" id =\"det_1_df\" size =\"10\" placeholder=\"DF\">\n" +
    "                        <input type =\"text\" name=\"det_1_potency\" id =\"det_1_potency\" size =\"10\" placeholder=\"Potency\">*100 <br/><br/>\n" +
    "                        <input type =\"text\" name=\"det_1_pkstd\" id =\"det_1_pkstd\" size =\"10\" placeholder=\"PKSTD\" onchange=\"calculation_determinations()\">\n" +
    "                        <input type =\"text\" name=\"det_1_lc\" id =\"det_1_lc\" class=\"det_1_lc\" size =\"10\" placeholder=\"LC\" onchange=\"calculation_determinations()\"></td>\n" +
    "                    <td> = <input type =\"text\" name=\"determination_1\" id =\"determination_1\" class=\"determination_1\" size =\"10\"> % LC</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  style=\"padding: 12px;background-color:#ffffff;border-bottom: dotted 1px #bfbfbf;border-top: dotted 1px #bfbfbf;\"> <b><u>Determination 2</u></b></td>\n" +
    "                    <td  style=\"padding: 12px;background-color:#ffffff;border-bottom: dotted 1px #bfbfbf;border-top: dotted 1px #bfbfbf;\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  align =\"center\" style=\"padding: 12px;\">\n" +
    "                        <input type =\"text\" name=\"det_2_pkt\" id=\"det_2_pkt\" size =\"10\" placeholder=\"PKT\" onchange=\"calculation_determinations()\">\n" +
    "                        <input type =\"text\" name=\"det_2_wstd\" id =\"det_2_wstd\" size =\"10\" placeholder=\"WSTD\">\n" +
    "                        <input type =\"text\" name=\"det_2_df\"id=\"det_2_df\" size =\"10\" placeholder=\"DF\">\n" +
    "                        <input type =\"text\" name=\"det_2_potency\" id =\"det_2_potency\" size =\"10\" placeholder=\"Potency\">*100 <br/><br/>\n" +
    "                        <input type =\"text\" name=\"det_2_pkstd\" id =\"det_2_pkstd\" size =\"10\" placeholder=\"PKSTD\" onchange=\"calculation_determinations()\">\n" +
    "                        <input type =\"text\" name=\"det_2_lc\" id =\"det_2_lc\" class=\"det_2_lc\" size =\"10\" placeholder=\"LC\"onchange=\"calculation_determinations()\"></td>\n" +
    "                    <td><input type =\"text\" name=\"determination_2\"id =\"determination_2\" class=\"determination_2\" size =\"10\">% LC </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  style=\"padding: 12px;background-color:#ffffff;border-bottom: dotted 1px #bfbfbf;border-top: dotted 1px #bfbfbf;\"> <b><u>Determination 3</u></b></td>\n" +
    "                    <td  style=\"padding: 12px;background-color:#ffffff;border-bottom: dotted 1px #bfbfbf;border-top: dotted 1px #bfbfbf;\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  align =\"center\" style=\"padding: 12px;\">\n" +
    "                        <input type =\"text\" name=\"det_3_pkt\" id =\"det_3_pkt\"size =\"10\" placeholder=\"PKT\" onchange=\"calculation_determinations()\">\n" +
    "                        <input type =\"text\" name=\"det_3_wstd\" id =\"det_3_wstd\"size =\"10\" placeholder=\"WSTD\">\n" +
    "                        <input type =\"text\" name=\"det_3_df\" id =\"det_3_df\" size =\"10\" placeholder=\"DF\">\n" +
    "                        <input type =\"text\" name=\"det_3_potency\" id =\"det_3_potency\" size =\"10\" placeholder=\"Potency\">*100 <br/><br/>\n" +
    "                        <input type =\"text\" name=\"det_3_pkstd\" id =\"det_3_pkstd\" size =\"10\" placeholder=\"PKSTD\" onchange=\"calculation_determinations()\">\n" +
    "                        <input type =\"text\" name=\"det_3_lc\" id =\"det_3_lc\" class=\"det_3_lc\" size =\"10\" placeholder=\"LC\" onchange=\"calculation_determinations()\"></td>\n" +
    "                    <td><input type =\"text\" name=\"determination_3\" id =\"determination_3\" class=\"determination_3\" size =\"10\">% LC </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td   style=\"padding: 12px;background-color:#ffffff;border-bottom: dotted 1px #bfbfbf;border-top: dotted 1px #bfbfbf;\"> <b><u>Determination 4</u></b></td>\n" +
    "                    <td   style=\"padding: 12px;background-color:#ffffff;border-bottom: dotted 1px #bfbfbf;border-top: dotted 1px #bfbfbf;\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  align =\"center\" style=\"padding: 12px;\">\n" +
    "                        <input type =\"text\" name=\"det_4_pkt\" id =\"det_4_pkt\" size =\"10\" placeholder=\"PKT\" onchange=\"calculation_determinations()\">\n" +
    "                        <input type =\"text\" name=\"det_4_wstd\" id =\"det_4_wstd\" size =\"10\" placeholder=\"WSTD\">\n" +
    "                        <input type =\"text\" name=\"det_4_df\" id =\"det_4_df\" size =\"10\" placeholder=\"DF\">\n" +
    "                        <input type =\"text\" name=\"det_4_potency\" id =\"det_4_potency\" size =\"10\" placeholder=\"Potency\">*100 <br/><br/>\n" +
    "                        <input type =\"text\" name=\"det_4_pkstd\" id =\"det_4_pkstd\" size =\"10\" placeholder=\"PKSTD\" onchange=\"calculation_determinations()\">\n" +
    "                        <input type =\"text\" name=\"det_4_lc\" id =\"det_4_lc\"  class=\"det_4_lc\" size =\"10\" placeholder=\"LC\" onchange=\"calculation_determinations()\"></td>\n" +
    "                    <td>=  <input type =\"text\" name=\"determination_4\" id =\"determination_4\" class=\"determination_4\" size =\"10\">% LC </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  style=\"padding: 12px;background-color:#ffffff;border-bottom: dotted 1px #bfbfbf;border-top: dotted 1px #bfbfbf;\"> <b><u>Determination 5</u></b></td>\n" +
    "                    <td  style=\"padding: 12px;background-color:#ffffff;border-bottom: dotted 1px #bfbfbf;border-top: dotted 1px #bfbfbf;\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  align =\"center\" style=\"padding: 12px;\">\n" +
    "                        <input type =\"text\" name=\"det_5_pkt\" id =\"det_5_pkt\" size =\"10\" placeholder=\"PKT\" onchange=\"calculation_determinations()\">\n" +
    "                        <input type =\"text\" name=\"det_5_wstd\" id =\"det_5_wstd\" size =\"10\" placeholder=\"WSTD\">\n" +
    "                        <input type =\"text\" name=\"det_5_df\" id =\"det_5_df\" size =\"10\" placeholder=\"DF\">\n" +
    "                        <input type =\"text\" name=\"det_5_potency\" id =\"det_5_potency\" size =\"10\" placeholder=\"Potency\">*100 <br/><br/>\n" +
    "                        <input type =\"text\" name=\"det_5_pkstd\" id =\"det_5_pkstd\" size =\"10\" placeholder=\"PKSTD\" onchange=\"calculation_determinations()\">\n" +
    "                        <input type =\"text\" name=\"det_5_lc\" id =\"det_5_lc\"  class=\"det_5_lc\" size =\"10\" placeholder=\"LC\" onchange=\"calculation_determinations()\"></td>\n" +
    "                    <td>=  <input type =\"text\" name=\"determination_5\" class=\"determination_5\" id =\"determination_5\" size =\"10\">% LC </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  style=\"padding: 12px;background-color:#ffffff;border-bottom: solid 1px #bfbfbf;border-top: dotted 1px #bfbfbf;\"> <b><u>Determination 6</u></b></td>\n" +
    "                    <td  style=\"padding: 12px;background-color:#ffffff;border-bottom: solid 1px #bfbfbf;border-top: dotted 1px #bfbfbf;\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td  align =\"center\" style=\"padding: 12px;\">\n" +
    "                        <input type =\"text\" name=\"det_6_pkt\" id =\"det_6_pkt\" size =\"10\" placeholder=\"PKT\" onchange=\"calculation_determinations()\">\n" +
    "                        <input type =\"text\" name=\"det_6_wstd\" id =\"det_6_wstd\" size =\"10\" placeholder=\"WSTD\">\n" +
    "                        <input type =\"text\" name=\"det_6_df\" id =\"det_6_df\" size =\"10\" placeholder=\"DF\">\n" +
    "                        <input type =\"text\" name=\"det_6_potency\" id =\"det_6_potency\" size =\"10\" placeholder=\"Potency\">*100 <br/><br/>\n" +
    "                        <input type =\"text\" name=\"det_6_pkstd\" id =\"det_6_pkstd\" size =\"10\" placeholder=\"PKSTD\" onchange=\"calculation_determinations()\">\n" +
    "                        <input type =\"text\" name=\"det_6_lc\" id =\"det_6_lc\"  class=\"det_6_lc\" size =\"10\" placeholder=\"LC\" onchange=\"calculation_determinations()\"></td>\n" +
    "                    <td>=  <input type =\"text\" name=\"determination_6\" class=\"determination_6\" id =\"determination_6\" size =\"10\">% LC </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td style=\"padding: 8px;padding: 8px;background-color: #e8e8ff;border-bottom: dotted 1px #bfbfbf;border-top: dotted 1px #bfbfbf;\"> </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>   Average % </td>\n" +
    "                    <td > <input type =\"text\" id = \"determination_avg\" name=\"average\"></td>\n" +
    "                    <td>   Equivalent to</td>\n" +
    "                    <td > <input type =\"text\" name=\"equivalent\" id = \"equivalent\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>   Range </td>\n" +
    "                    <td > <input type =\"text\" size = \"5\" id = \"range_min\" name=\"range_min\" > to <input type =\"text\" size = \"5\" id = \"range_max\" name=\"range_max\"></td>\n" +
    "                    <td>   RSD</td>\n" +
    "                    <td > <input type =\"text\" id = \"determination_rsd\" name=\"rsd\"></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td colspan=\"8\" style=\"padding:8px;\">\n" +
    "                        <table border=\"0\" width=\"80%\" cellpadding=\"8px\" >\n" +
    "                            <tr>\n" +
    "                                <td colspan =\"3\"  style=\"color:#0000ff;padding:8px;border-top:dotted 1px #c4c4ff;border-bottom:dotted 1px #c4c4ff;\">\n" +
    "                                </td>\n" +
    "                                <td colspan =\"\" align = \"center\">Method  <input type =\"text\" name=\"method\" placeholder=\"e.g BP 2014\"> </td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td colspan=\"2\" style=\"color:#0000ff;padding:8px;border-bottom:solid 1px #c4c4ff;\"><b>Acceptance Criteria</b></td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;border-bottom:solid 1px #c4c4ff;\"><b>Results</b></td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;border-bottom:solid 1px #c4c4ff;\"><b>Comment</b></td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td><input type=\"checkbox\" id=\"min\" />Not Less than Tolerance</td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;\"><input type=\"text\" min=\"min_tolerance\" id=\"min_tolerance\" name=\"min_tolerance\" placeholder=\"min%\" size=\"5\"  onChange=\"calc_determination()\" /></td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;\"><input type=\"text\" min=\"min_tolerance\" id=\"nlt_min_tolerance_det\" name=\"det_min\" size=\"4\" placeholder=\"min%\" onChange=\"calc_determination()\" disabled/> - <input type=\"text\" min=\"min_tolerance\" id=\"nlt_max_tolerance_det\" name=\"det_max\" size=\"4\" placeholder=\"max%\" onChange=\"calc_determination()\" disabled/></td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;\"><input type=\"text\" min=\"min_tolerance\" id=\"min_tolerance_comment\" name=\"min_tolerance_comment\" disable/></td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td><input type=\"checkbox\" id=\"max\" />Not Greater than Tolerance</td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;\"><input type=\"text\" max='max_tolerance' id=\"max_tolerance\" name=\"max_tolerance\" placeholder=\"max%\" size=\"5\"  onChange=\"calc_determination()\"/></td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;\"><input type=\"text\" max='max_tolerance' id=\"ngt_min_tolerance_det\" name=\"det_min\" size=\"4\" placeholder=\"min%\" onChange=\"calc_determination()\" disabled/> - <input type=\"text\" max=\"max_tolerance\" id=\"ngt_max_tolerance_det\" name=\"det_max\" size=\"4\" placeholder=\"max%\" onChange=\"calc_determination()\" disabled/></td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;\"><input type=\"text\" max='max_tolerance' name=\"content_comment\" disable/></td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td><input type=\"checkbox\" id=\"range\" />Tolerance Range</td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;\"><input type=\"text\" range=\"tolerance_range\" name=\"content_from\" placeholder=\"min%\" size=\"5\"> - <input type=\"text\" range=\"tolerance_range\" name=\"content_to\" placeholder=\"max%\" size=\"5\"></td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;\"><input type=\"text\" range=\"tolerance_range\" id=\"range_min_tolerance_det\" name=\"det_min\" size=\"4\" placeholder=\"min%\" onChange=\"calc_determination()\" disabled/> - <input type=\"text\" id=\"range_max_tolerance_det\" range=\"tolerance_range\" name=\"det_max\" size=\"4\" placeholder=\"max%\" onChange=\"calc_determination()\" disabled/></td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;\"><input type=\"text\" range=\"tolerance_range\" name=\"content_comment\" disable/></td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td>RSD %</td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;\"></td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;\"><input type=\"text\" id=\"determination_rsd_2\" name=\"determination_sd\" onChange=\"calculator()\" disabled/></td>\n" +
    "                                <td style=\"color:#0000ff;padding:8px;\"><input type=\"text\" name=\"rsd_comment\" disable/></td>\n" +
    "                            </tr>\n" +
    "                        </table>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "            <table>\n" +
    "                <tr>\n" +
    "                    <td>Requirement</td>\n" +
    "                    <td>Tick</td>\n" +
    "                    <td>Comment</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>System Suitability Sequence</td>\n" +
    "                    <td><input type=\"checkbox\" name=\"sysytem_suitability_sequence\" value=\"Sysytem Suitability Sequence\"/></td>\n" +
    "                    <td><input type=\"text\" name=\"sysytem_suitability_sequence_comment\" size=\"50\"/></td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>Sample Injection sequence</td>\n" +
    "                    <td><input type=\"checkbox\" name=\"sample_injection_sequence\" value=\"Sample Injection Sequence\"></td>\n" +
    "                    <td><input type=\"text\" name=\"Sample_injection_sequence_comment\" size=\"50\"></td>\n" +
    "\n" +
    "                <tr>\n" +
    "                    <td><b>Chromatography Check List</b></td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "\n" +
    "            <table class=\"ui table\">\n" +
    "                <tr>\n" +
    "                    <td><b>Conclusion</b></td>\n" +
    "                    <td>\n" +
    "                        <input type=\"text\" name=\"conclusion\" id = \"choice\" >\n" +
    "                    </td>\n" +
    "                    <td  align =\"center\"> <a  class=\"btn\" id=\"save_normal_hplc\" name =\"save_normal_hplc\"> Submit</a>\n" +
    "                        <input type =\"button\" class=\"btn\" id=\"clear_form\" name =\"\" value =\"Clear Form\"></td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "\n" +
    "            </form>\n" +
    "\n" +
    "        <script>\n" +
    "            $('.ui.dropdown').dropdown();\n" +
    "        </script>\n" +
    "        {{hplc}}\n" +
    "");
}]);

angular.module("../app/partials/tests/dissolution/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/tests/dissolution/index.html",
    "<!-- Dissolution Index -->\n" +
    "Dissolution Index\n" +
    "<!-- Test Comes Here -->\n" +
    "<div ui-view>\n" +
    "	\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/tests/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/tests/index.html",
    "<header>\n" +
    "\n" +
    "</header>\n" +
    "<!-- Users Index.html -->\n" +
    "<nav class=\"ui inverted green menu centered\">\n" +
    "    <div href=\"\" ui-sref=\"tests\" class=\"item\">\n" +
    "    	<b>\n" +
    "    	<i class=\"icon ion-beaker\"></i>\n" +
    "    	Tests\n" +
    "    	</b>\n" +
    "    </div>\n" +
    "    <a is-active-nav class=\"item\" ui-sref=\"tests.statistics\"><i class=\"icon ion-arrow-graph-up-right\"></i>Statistics</a>\n" +
    "    <div class=\"ui dropdown item\">\n" +
    "    	<i class=\"icon fa fa-list\"></i>List\n" +
    "    	<div class=\"ui menu\">\n" +
    "    		<a is-active-nav class=\"item\" ui-sref=\"tests.list\">Tests</a>\n" +
    "    		<a is-active-nav class=\"item\" ui-sref=\"tests.request-list\">Test Requests</a>\n" +
    "    	</div>\n" +
    "    </div>\n" +
    "    \n" +
    "    <a is-active-nav class=\"item\" ui-sref=\"tests.add\"><i class=\"icon fa fa-plus\"></i>New Test</a>\n" +
    "</nav>\n" +
    "<div ui-view class=\"centered within\"></div>\n" +
    "\n" +
    "<script>\n" +
    "	$('.ui.dropdown').dropdown();\n" +
    "</script>");
}]);

angular.module("../app/partials/tests/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/tests/list.html",
    "<!-- Tests' List -->\n" +
    "<table class=\"ui table celled compact bordered\" st-safe-src=\"rowCollection\" st-table=\"displayedCollection\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th><i class=\"icon\"></i>Name</th>\n" +
    "            <th><i class=\"icon\"></i>Category</th>\n" +
    "            <th><i class=\"icon\"></i>Action</th>\n" +
    "            <th><i class=\"icon\"></i>Status</th>\n" +
    "        </tr>\n" +
    "        \n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'name'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'mainTest[testName]'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td></td>\n" +
    "        </tr>\n" +
    "        <tr ng-repeat=\"row in displayedCollection\"  st-select-row=\"row\">\n" +
    "            <td>{{row.name}}</td>\n" +
    "            <td>{{row.mainTest.testName}}</td>\n" +
    "            <td>\n" +
    "                <a class=\"ui green button\" ui-sref=\"{{row.mainTest.testName+'.'+row.name}}\">Perform Test</a>\n" +
    "                <a class=\"ui button\" ui-sref=\"{{row.mainTest.testName+'.'+row.name}}\" ng-click=\"\">Review Test</a>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <div class=\"ui red label\">Not Done</div>\n" +
    "                <div class=\"ui green label\">Done</div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "     <tfoot>\n" +
    "        	<tr>\n" +
    "        		<th colspan=\"1\">{{records}} Records</th>\n" +
    "                <th colspan=\"3\">\n" +
    "                    <div st-pagination=\"\" st-items-by-page=\"recordsPerPage\" st-displayed-pages=\"pages\"></div>\n" +
    "                </th>\n" +
    "        	</tr>\n" +
    "        </tfoot>\n" +
    "</table>");
}]);

angular.module("../app/partials/users/form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/users/form.html",
    "<div class=\"ui grid\">\n" +
    "    <div class=\"twelve wide column\">\n" +
    "        <!-- Form -->\n" +
    "        <form class=\"ui form ui segment\" id=\"memberForm\" action=\"\" method=\"post\">\n" +
    "            <div class=\"fields\">\n" +
    "                <div class=\"field eight wide required\">\n" +
    "                    <label>First Name</label>\n" +
    "                    <div class=\"ui icon left input\">\n" +
    "                        <i class=\"icon ion-person\"></i>\n" +
    "                        <input name=\"fname\" id=\"fname\" type=\"text\" ng-model=\"userProfile.fname\"/>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"field eight wide required\">\n" +
    "                    <label>Last Name</label>\n" +
    "                    <div class=\"ui icon left input\">\n" +
    "                        <i class=\"icon ion-person\"></i>\n" +
    "                        <input name=\"lname\" id=\"lname\" type=\"text\" ng-model=\"userProfile.lname\"/>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"fields\">\n" +
    "                <div class=\"field left icon eight wide required\">\n" +
    "                    <label>Email Address</label>\n" +
    "                    <div class=\"ui icon left input\">\n" +
    "                        <i class=\"icon ion-email\"></i>\n" +
    "                        <input name=\"email\" id=\"email\" type=\"text\" ng-model=\"userProfile.email\"/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"field left icon eight wide required\">\n" +
    "                    <label>Telephone No.</label>\n" +
    "                    <div class=\"ui icon left input\">\n" +
    "                        <i class=\"icon ion-ios-telephone\"></i>\n" +
    "                        <input name=\"idNo\" id=\"idtelephoneNo\" type=\"text\" ng-model=\"userProfile.telephone\"/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"fields\">\n" +
    "                <div class=\"field left icon eight wide required\">\n" +
    "                    <label>Role</label>\n" +
    "                    <div class=\"ui icon left input\">\n" +
    "                        <i class=\"icon fa fa-list\"></i>\n" +
    "                        <input name=\"role\" id=\"role\" type=\"text\" ng-model=\"userProfile.role\"/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"field left icon eight wide required\">\n" +
    "                    <label>Department.</label>\n" +
    "                    <div class=\"ui icon left input\">\n" +
    "                        <i class=\"icon\"></i>\n" +
    "                        <input name=\"department\" id=\"department\" type=\"text\" ng-model=\"userProfile.departmentId\"/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"ui error message\"></div>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"four wide column\">\n" +
    "        <div class=\"ui segment\">\n" +
    "            <div class=\"ui statistic\" id=\"total\">\n" +
    "                <div class=\"value\">\n" +
    "                    {{records}}\n" +
    "                </div>\n" +
    "                <div class=\"label\">\n" +
    "                    <i class=\"icon database\"></i>Total Records\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("../app/partials/users/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/users/index.html",
    "<header>\n" +
    "\n" +
    "</header>\n" +
    "<!-- Users Index.html -->\n" +
    "<nav class=\"ui inverted purple menu centered\">\n" +
    "    <div href=\"\" ui-sref=\"users\" class=\"item\">\n" +
    "    	<b>\n" +
    "    	<i class=\"icon ion-ios-people\"></i>\n" +
    "    	Users\n" +
    "    	</b>\n" +
    "    	</div>\n" +
    "     <a is-active-nav class=\"item\" ui-sref=\"users.statistics\"><i class=\"icon ion-arrow-graph-up-right\"></i>Statistics</a>\n" +
    "    <a is-active-nav class=\"item\" ui-sref=\"users.list\"><i class=\"icon fa fa-list\"></i>List Users</a>\n" +
    "    <a is-active-nav class=\"item\" ui-sref=\"users.add\"><i class=\"icon fa fa-plus\"></i>Register Users</a>\n" +
    "</nav>\n" +
    "<div ui-view class=\"centered within\"></div>");
}]);

angular.module("../app/partials/users/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/users/list.html",
    "<!-- Members' List -->\n" +
    "<table class=\"ui table celled compact bordered\" st-safe-src=\"rowCollection\" st-table=\"displayedCollection\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th><i class=\"icon ion-person\"></i>First Name</th>\n" +
    "            <th><i class=\"icon ion-person\"></i>Last Name</th>\n" +
    "            <th><i class=\"icon ion-email\"></i>Email Address</th>\n" +
    "            <th><i class=\"icon ion-ios-telephone\"></i>Telephone</th>\n" +
    "            <th><i class=\"icon fa fa-list\"></i>Role</th>\n" +
    "        </tr>\n" +
    "        \n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'fname'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'lname'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'email'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'telephone'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'role'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        \n" +
    "        <td></td>\n" +
    "        </tr>\n" +
    "        <tr ng-repeat=\"row in displayedCollection\"  st-select-row=\"row\">\n" +
    "            <td>{{row.fname}}</td>\n" +
    "            <td>{{row.lname}}</td>\n" +
    "            <td>{{row.email}}</td>\n" +
    "            <td>{{row.telephone}}</td>\n" +
    "            <td>{{row.role}}</td>\n" +
    "            <td width=\"150\">\n" +
    "            <button type=\"button\" ng-click=\"getUser(row)\" class=\"ui blue tiny button icon\">\n" +
    "				<i class=\"icon ion-more\">\n" +
    "				</i>\n" +
    "			</button>\n" +
    "            <button type=\"button\" ng-click=\"\" class=\"ui red tiny button icon\">\n" +
    "				<i class=\"icon ion-minus-circled\">\n" +
    "				</i>\n" +
    "			</button>\n" +
    "\n" +
    "			</td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "     <tfoot>\n" +
    "        	<tr>\n" +
    "        		<th colspan=\"1\">{{records}} Records</th>\n" +
    "                <th colspan=\"5\">\n" +
    "                    <div st-pagination=\"\" st-items-by-page=\"recordsPerPage\" st-displayed-pages=\"pages\"></div>\n" +
    "                </th>\n" +
    "        	</tr>\n" +
    "        </tfoot>\n" +
    "</table>");
}]);

angular.module("../app/partials/users/lock-screen.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/users/lock-screen.html",
    "<div class=\"\" style=\"position:absolute;top:0;width:100%;height:100%;background:#3b83c0\">\n" +
    "    <form action=\"\" class=\"ui form inverted centered\">\n" +
    "        <div class=\"sixteen wide field\">\n" +
    "            <img style=\"background:white;margin:auto\" class=\"ui medium bordered  circular image\" src=\"assets/bower_components/ionicons/png/512/ios7-person.png\">\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"sixteen wide field\">\n" +
    "            <label style=\"text-align:center\">John Doe</label></div>\n" +
    "            <div class=\"fields\">\n" +
    "                <div class=\"ten wide field\">\n" +
    "                    <div class=\"ui input left icon\">\n" +
    "                        <i class=\"icon ion-lock-combination\"></i><input type=\"password\" name=\"password\" placeholder=\"Enter Password Here...\"></div>\n" +
    "                    </div>\n" +
    "                    <div class=\"six wide field\">\n" +
    "                    <button class=\"ui fluid button green\"><i class=\"icon ion-log-in\"></i>Return</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "            </form>\n" +
    "        </div>");
}]);

angular.module("../app/partials/users/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/users/login.html",
    "<form  class='ui form segment centered' ng-submit=\"login()\">\n" +
    "    <h1 class=\"ui header\">Login</h1>\n" +
    "    <div class=\"sixteen wide field\">\n" +
    "        <div class=\"ui input left icon\">\n" +
    "            <i class=\"icon ion-person\"></i><input type=\"text\" name=\"username\" ng-model=\"formData.username\" placeholder=\"Enter Username...\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"sixteen wide field\">\n" +
    "        <div class=\"ui input left icon\">\n" +
    "            <i class=\"icon ion-lock-combination\"></i><input type=\"password\" ng-model=\"formData.password\" name=\"password\" placeholder=\"Enter Password Here...\"></div>\n" +
    "    </div>\n" +
    "    <button type=\"submit\" class=\"ui icon green button\"><i class='icon ion-log-in'></i>Login</button>\n" +
    "</form>\n" +
    "");
}]);

angular.module("../app/partials/users/statistics.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/users/statistics.html",
    "<div class=\"ui stackable grid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"four wide column\">\n" +
    "            <div class=\"inner small ui segment\">\n" +
    "                <div class=\"ui statistic\">\n" +
    "					<div class=\"value\">{{records}}</div>\n" +
    "                </div>\n" +
    "                <h6 class='ui header'><i class=\"icon fa fa-bar-chart-o\"></i>Total Members</h6>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"four wide column\">\n" +
    "            <div class=\"inner small ui segment\">\n" +
    "                <div class='graph'>\n" +
    "                </div>\n" +
    "                <h6 class='ui header'><i class=\"icon fa fa-bar-chart-o\"></i>Header</h6>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"four wide column\">\n" +
    "            <div class=\"inner small ui segment\">\n" +
    "                <div class='graph'></div>\n" +
    "                <h6 class='ui header'><i class=\"icon fa fa-bar-chart-o\"></i>Header</h6>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"four wide column\">\n" +
    "            <div class=\"inner small ui segment\">\n" +
    "                <div class='graph'></div>\n" +
    "                <h6 class='ui header'><i class=\"icon fa fa-bar-chart-o\"></i>Header</h6>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"eight wide column\">\n" +
    "            <div class=\"inner ui segment\">\n" +
    "                <div class='graph'>\n" +
    "                    <canvas id=\"line\" class=\"chart chart-line\" data=\"data\" labels=\"labels\"\n" +
    "                    legend=\"true\" series=\"series\" click=\"onClick\"></canvas>\n" +
    "                </div>\n" +
    "                <h6 class='ui header'><i class=\"icon fa fa-bar-chart-o\"></i>Header</h6>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"eight wide column\">\n" +
    "            <div class=\"inner ui segment\">\n" +
    "                <div class='graph'>\n" +
    "                    <canvas id=\"line\" class=\"chart chart-bar\" data=\"data\" labels=\"labels\"\n" +
    "                    legend=\"true\" series=\"series\" click=\"onClick\"></canvas>\n" +
    "                </div>\n" +
    "                <h6 class='ui header'><i class=\"icon fa fa-bar-chart-o\"></i>Header</h6>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
