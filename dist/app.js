var app = angular.module("meds", ['ui.router','restangular','smart-table','textAngular','angularMoment','LocalStorageModule','slick']);

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
    "memberCtrl", ['$scope', '$filter','$timeout', 'MedsRestangular','$state', function(scope, filter,timeout, MedsRestangular,state) {
        getMemberCount();
        


        scope.getMember = function getMember(newMember) {
            console.log(newMember);
            scope.member = newMember;
            state.go('members.view');
        }

        scope.getMembers = function getMembers() {
            var AllMembers = MedsRestangular.all('members');
            // This will query /accounts and return a promise.
            AllMembers.customGET('').then(function(members) {
                scope.rowCollection = members.data;
                scope.displayedCollection = [].concat(scope.rowCollection);

            });
        }

        function getMemberCount() {
            var AllMembers = MedsRestangular.all('members');
            // This will query /accounts and return a promise.
            AllMembers.customGET('').then(function(members) {
                scope.records = members.data.length;
                scope.recordsPerPage = 5;
                scope.pages = Math.ceil(scope.records/scope.recordsPerPage);

            });
        }
        // scope.totalMembers = function totalMembers() {
        //     scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        //     scope.series = ['Series A', 'Series B'];
        //     scope.data = [
        //         [65, 59, 80, 81, 56, 55, 40],
        //         [28, 48, 40, 19, 86, 27, 90]
        //     ];
        //     scope.onClick = function(points, evt) {
        //         console.log(points, evt);
        //     };

        //     // Simulate async data update
        //     timeout(function() {
        //         scope.data = [
        //             [28, 48, 40, 19, 86, 27, 90],
        //             [65, 59, 80, 81, 56, 55, 40]
        //         ];
        //     }, 3000);
        // }
    }]
);;// I control the main demo.
app.controller(
  "parishesCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {
      var Parishes = DMSRestangular.all('parishes');
      getParishCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getParish = function getParish(newParish) {
        console.log(newParish);
        scope.parishProfile = newParish;
        state.go('location.parishes.view');
      }

      scope.getParishes = function getParishes() {

        // This will query /accounts and return a promise.
        Parishes.customGET('').then(function(parishes) {
          //console.log(users);
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
        // This will query /accounts and return a promise.
        Parishes.customGET('').then(function(parishes) {
          // console.log(users);
          scope.records = parishes.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }

      scope.newParish = function newParish() {
        parish = {
          "name": "St. Lukes",
          "in_charge": "Pastor Oscar",
          "location": "Outer Ring Road",
          "updated_at": "2015-01-01 00:00:00 UTC",
          "created_at": "2015-01-01 00:00:00 UTC"
        }
        Parishes.post(parish);
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
        scope.parishProfile = newService;
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
;// I control the main demo.
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
;angular.module('templates-dist', ['../app/partials/dashboard.html']);

angular.module("../app/partials/dashboard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/dashboard.html",
    "");
}]);
