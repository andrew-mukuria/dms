var app = angular.module("hais", ['ui.router','restangular','smart-table','chart.js','textAngular','angularMoment']);

app.controller('benefitsCtrl', ['$scope', '$http',
  function ($scope, $http) {

  }]);

app.controller('claimsCtrl', ['$scope', '$http',
  function ($scope, $http) {

  }]);

app.controller('providerCtrl', ['$scope', '$http',
  function ($scope, $http) {

  }]);

app.controller('servicesCtrl', ['$scope', '$http',
  function ($scope, $http) {

  }]);

app.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost/hmis');
  RestangularProvider.setRequestSuffix('.json');
});

app.factory('MembersRestangular', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl('http://localhost/hmis/members_api');
  });
});

app.run(['$http', '$rootScope', function($http, $rootScope) {
     $rootScope.date = new Date();
     $rootScope.title = 'HAIS Web';
     $rootScope.messages=[];
     $rootScope.menu=[];
 }]);


;// I control the main demo.
app.controller(
    "memberCtrl", ['$scope', '$filter','$timeout', 'MembersRestangular','$state', function(scope, filter,timeout, MembersRestangular,state) {
        getMemberCount();
        


        scope.getMember = function getMember(newMember) {
            console.log(newMember);
            scope.member = newMember;
            state.go('members.view');
        }

        scope.getMembers = function getMembers() {
            var AllMembers = MembersRestangular.all('members');
            // This will query /accounts and return a promise.
            AllMembers.customGET('').then(function(members) {
                scope.rowCollection = members.data;
                scope.displayedCollection = [].concat(scope.rowCollection);

            });
        }

        function getMemberCount() {
            var AllMembers = MembersRestangular.all('members');
            // This will query /accounts and return a promise.
            AllMembers.customGET('').then(function(members) {
                scope.records = members.data.length;
                scope.recordsPerPage = 5;
                scope.pages = Math.ceil(scope.records/scope.recordsPerPage);

            });
        }
        scope.totalMembers = function totalMembers() {
            scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
            scope.series = ['Series A', 'Series B'];
            scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
            scope.onClick = function(points, evt) {
                console.log(points, evt);
            };

            // Simulate async data update
            timeout(function() {
                scope.data = [
                    [28, 48, 40, 19, 86, 27, 90],
                    [65, 59, 80, 81, 56, 55, 40]
                ];
            }, 3000);
        }
    }]
);;app.directive("ng-head", function () {
    return {
        templateUrl: "app/partials/head.html"
    }
});

app.directive("header", function () {
    return {
        templateUrl: "app/partials/global/header.html"
    }
});

//app.directive("header_crud", function () {
//    return {
//        templateUrl: "partials/header-crud.html"
//    }
//});
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

app.directive('isActiveNav', [ '$location', function($location) {
return {
 restrict: 'A',
 link: function(scope, element) {
   scope.location = $location;
   scope.$watch('location.path()', function(currentPath) {
     if('#' + currentPath == element[0].hash) {
        console.log('found');
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



//app.config(function ($routeProvider) {
//    $routeProvider.
//    when("/members", {
//        templateUrl: "app/crud_partials/members.html",
//        controller: "memberCtrl"
//    }).
//    when("/benefits", {
//        templateUrl: "app/crud_partials/benefits.html",
//        controller: "benefitsCtrl"
//    }).
//    when("/claims", {
//        templateUrl: "app/crud_partials/claims.html",
//        controller: "claimsCtrl"
//    }).
//    when("/provider", {
//        templateUrl: "app/crud_partials/provider.html",
//        controller: "providerCtrl"
//    }).
//    when("/services", {
//        templateUrl: "app/crud_partials/services.html",
//        controller: "servicesCtrl"
//    }).
//    otherwise({
//        redirectTo: '/'
//    }); });;
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
;angular.module('templates-dist', ['../app/partials/dashboard.html', '../app/partials/global/dashboard.html', '../app/partials/global/head.html', '../app/partials/global/header.html', '../app/partials/global/headerCrud.html', '../app/partials/global/rails.html', '../app/partials/global/side-menu.html', '../app/partials/knowledge-base/form.html', '../app/partials/knowledge-base/index.html', '../app/partials/knowledge-base/list.html', '../app/partials/members/form.html', '../app/partials/members/index.html', '../app/partials/members/list.html', '../app/partials/members/statistics.html', '../app/partials/users/lock-screen.html', '../app/partials/users/login.html']);

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

angular.module("../app/partials/global/head.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/global/head.html",
    "<link rel=\"stylesheet\" href=\"assets/bower_components/font-awesome/css/font-awesome.css\">\n" +
    "<link rel=\"stylesheet\" href=\"assets/bower_components/ionicons/css/ionicons.css\">\n" +
    "<link rel=\"stylesheet\" href=\"assets/stylesheets/styles.css\">\n" +
    "<link rel=\"stylesheet\" href=\"assets/bower_components/webfont-opensans/stylesheet.css\" media=\"screen\" title=\"no title\" charset=\"utf-8\">\n" +
    "<link rel=\"stylesheet\" href=\"assets/bower_components/semantic-ui/dist/semantic.css\">\n" +
    "<link rel=\"stylesheet\" href=\"assets/bower_components/jquery-ui/jquery-ui.min.css\">\n" +
    "<link rel=\"stylesheet\" href=\"assets/bower_components/ionicons/css/ionicons.css\" media=\"screen\" title=\"no title\" charset=\"utf-8\">\n" +
    "\n" +
    "<!-- Scripts-->\n" +
    "\n" +
    "<script src=\"assets/javascripts/bootstrap.js\"></script>\n" +
    "<script src=\"assets/bower_components/jquery-ui/jquery-ui.min.js\"></script>\n" +
    "<script src=\"assets/bower_components/typeahead.js/dist/typeahead.bundle.js\"></script>\n" +
    "<script src=\"assets/bower_components/angular-bootstrap/ui-bootstrap.js\"></script>\n" +
    "<script src=\"assets/bower_components/angular-typeahead/angular-typeahead.js\"></script>\n" +
    "<script src=\"assets/bower_components/semantic-ui/dist/semantic.js\"></script>\n" +
    "\n" +
    "");
}]);

angular.module("../app/partials/global/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/global/header.html",
    "<div class=\"ui tiered menu\">\n" +
    "    <nav class=\"ui menu\" id=\"main\">\n" +
    "        <a class=\"item\" href=\"\" data-transition=\"push\" id=\"show_side_menu\"><i class=\"icon ion-navicon-round\"></i>More</a>\n" +
    "<a href=\"\" ui-sref=\"messages\" class=\"item\"><i class=\"icon mail\"></i>Messages<div class=\"ui red round label\">{{messages.length}}</div></a>\n" +
    "<div class=\"right menu\">\n" +
    "    <div class='item'><i class=\"icon calendar\"></i>{{date | date:'d-MM-yyyy'}}</div>\n" +
    "<a href=\"\" class=\"item\"><i class=\"icon ion-log-out\"></i>Logout</a>\n" +
    "</div>\n" +
    "\n" +
    "       <!--\n" +
    "        <a ui-sref=\"members\" class=\"item members\" data-ctrl=\"members\"><i class=\"icon\"></i>Members</a>\n" +
    "        <a ui-sref=\"claims\" class=\"item claims\" data-ctrl=\"claims\"><i class=\"icon\"></i>Claims</a>\n" +
    "        <a ui-sref=\"provider\" class=\"item provider\" data-ctrl=\"provider\"><i class=\"icon\"></i>Provider</a>\n" +
    "        <a ui-sref=\"benefits\" class=\"item benefits\" data-ctrl=\"benefits\"><i class=\"icon\"></i>Benefits</a>\n" +
    "        <a ui-sref=\"services\" class=\"item services\" data-ctrl=\"services\"><i class=\"icon\"></i>Services</a>\n" +
    "-->\n" +
    "    </nav>\n" +
    "</div>\n" +
    "<script>\n" +
    "    $('#show_side_menu').click(function(){\n" +
    "//        alert('hi');\n" +
    "        $('#main-side-menu').sidebar('toggle');\n" +
    "    });\n" +
    "\n" +
    "\n" +
    "</script>\n" +
    "");
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

angular.module("../app/partials/members/form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/members/form.html",
    "<div class=\"ui grid\">\n" +
    "    <div class=\"twelve wide column\">\n" +
    "\n" +
    "        <form class=\"ui form ui segment\" id=\"memberForm\" action=\"\" method=\"post\">\n" +
    "            <div class=\"fields\">\n" +
    "                <div class=\"field eight wide required\"><label>Member No.</label><input name=\"memberNo\" id=\"memberNo\" type=\"text\" ng-model=\"member.memberNo\"></input></div>\n" +
    "            <div class=\"field eight wide required\"><label>Member Name</label><input name=\"memberName\" id=\"memberName\" type=\"text\" ng-model=\"member.memberName\"></input></div>\n" +
    "    </div>\n" +
    "    <div class=\"fields\">\n" +
    "        <div class=\"field four wide required\"><label>Date of Birth</label><input name=\"dob\" id=\"dob\" type=\"text\" ng-model=\"member.dob.date | amDateFormat:'YYYY-MM-DD'\"></input></div>\n" +
    "    <div class=\"field four wide required\"><label>ID No.</label><input name=\"idNo\" id=\"idNo\" type=\"text\" ng-model=\"member.idNo\"></input></div>\n" +
    "<div class=\"field eight wide required\"><label>Scheme Name</label><input name=\"schemeName\" id=\"schemeName\" type=\"text\" ng-model=\"member.schemeName\"></input></div>\n" +
    "</div>\n" +
    "<div class=\"fields\">\n" +
    "    <div class=\"field eight wide required\"><label>Employee No.</label><input name=\"employeeNo\" id=\"employeeNo\" type=\"text\" ng-model=\"member.employeeNo\"></input></div>\n" +
    "<div class=\"field four wide required\"><label>NSSF No.</label><input name=\"nssfNo\" id=\"nssfNo\" type=\"text\" ng-model=\"member.nssfNo\"></input></div>\n" +
    "<div class=\"field four wide required\"><label>NHIF No.</label><input name=\"nhifNo\" id=\"nhifNo\" type=\"text\" ng-model=\"member.nhifNo\"></input></div>\n" +
    "</div>\n" +
    "<div class=\"fields\">\n" +
    "    <div class=\"field eight wide required\"><label>PIN</label><input name=\"pin\" id=\"pin\" type=\"text\" ng-model=\"member.pin\"></input></div>\n" +
    "<div class=\"field four wide required\"><label>Inpatient</label><input name=\"inPatient\" id=\"inPatient\" type=\"text\" ng-model=\"member.inPatient\"></input></div>\n" +
    "<div class=\"field four wide required\"><label>Outpatient</label><input name=\"outPatient\" id=\"outPatient\" type=\"text\" ng-model=\"member.outPatient\"></input></div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"three fields\">\n" +
    "    <div class=\"field required\"><label>Dental</label><input name=\"dental\" id=\"dental\" type=\"text\" ng-model=\"member.dental\"></input></div>\n" +
    "<div class=\"field required\"><label>Optical</label><input name=\"optical\" id=\"optical\"  type=\"text\" ng-model=\"member.optical\"></input></div>\n" +
    "<div class=\"field required\"><label>Maternity</label><input name=\"maternity\" id=\"maternity\" type=\"text\" ng-model=\"member.maternity\"></input></div>\n" +
    "<button class=\"ui button right green icon\"><i class=\"icon ion-plus-round\"></i>Register</button>\n" +
    "</div>\n" +
    "<div class=\"ui error message\"></div>\n" +
    "</form>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"four wide column\">\n" +
    "    <div class=\"ui segment\">\n" +
    "        <div class=\"ui statistic\" id=\"total\">\n" +
    "            <div class=\"value\">\n" +
    "                {{records}}\n" +
    "            </div>\n" +
    "            <div class=\"label\">\n" +
    "                <i class=\"icon database\"></i>Total Records\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("../app/partials/members/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/members/index.html",
    "<header>\n" +
    "\n" +
    "</header>\n" +
    "<!-- Members Index.html -->\n" +
    "<nav class=\"ui inverted blue menu centered\">\n" +
    "    <div href=\"\" ui-sref=\"members\" class=\"item\">Members</div>\n" +
    "     <a is-active-nav class=\"item\" ui-sref=\"members.statistics\"><i class=\"icon ion-arrow-graph-up-right\"></i>Statistics</a>\n" +
    "    <a is-active-nav class=\"item\" ui-sref=\"members.list\"><i class=\"icon fa fa-list\"></i>List Members</a>\n" +
    "    <a is-active-nav class=\"item\" ui-sref=\"members.add\"><i class=\"icon fa fa-plus\"></i>Register Members</a>\n" +
    "</nav>\n" +
    "<div ui-view class=\"centered within\"></div>");
}]);

angular.module("../app/partials/members/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/members/list.html",
    "<!-- Members' List -->\n" +
    "<table class=\"ui table celled compact bordered\" st-safe-src=\"rowCollection\" st-table=\"displayedCollection\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th><i class=\"icon ion-pound\"></i>Member No.</th>\n" +
    "            <th><i class=\"icon ion-person\"></i>Member Name</th>\n" +
    "            <th><i class=\"icon ion-pound\"></i>NSSF No</th>\n" +
    "            <th><i class=\"icon ion-pound\"></i>NHIF No</th>\n" +
    "            <th><i class=\"icon ion-pound\"></i>ID No</th>\n" +
    "        </tr>\n" +
    "        \n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'memberNo'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'memberName'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'nssfNo'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'nhifNo'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        <td class=\"ui input\" ><input st-search=\"'idNo'\" placeholder=\"Search...\" type=\"search\"/></td>\n" +
    "        \n" +
    "        <td></td>\n" +
    "        </tr>\n" +
    "        <tr ng-repeat=\"row in displayedCollection\"  st-select-row=\"row\">\n" +
    "            <td>{{row.memberNo}}</td>\n" +
    "            <td>{{row.memberName}}</td>\n" +
    "            <td>{{row.nssfNo}}</td>\n" +
    "            <td>{{row.nhifNo}}</td>\n" +
    "            <td>{{row.idNo}}</td>\n" +
    "            <td width=\"150\">\n" +
    "            <button type=\"button\" ng-click=\"getMember(row)\" class=\"ui blue tiny button icon\">\n" +
    "				<i class=\"icon ion-more\">\n" +
    "				</i>\n" +
    "			</button>\n" +
    "            <button type=\"button\" ng-click=\"\" class=\"ui red tiny button icon\">\n" +
    "				<i class=\"icon ion-minus-circled\">\n" +
    "				</i>\n" +
    "			</button>\n" +
    "            <button type=\"button\" ng-click=\"\" class=\"ui green tiny button icon\">\n" +
    "                <i class=\"icon ion-flash\">\n" +
    "                </i>\n" +
    "            </button>\n" +
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

angular.module("../app/partials/members/statistics.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/members/statistics.html",
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
    "<form action=\"\" class='ui form segment centered'>\n" +
    "<h1 class=\"ui header\">Login</h1>\n" +
    "    <div class=\"sixteen wide field\">\n" +
    "        <div class=\"ui input left icon\">\n" +
    "            <i class=\"icon ion-person\"></i><input type=\"text\" name=\"username\" placeholder=\"Enter Username...\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"sixteen wide field\">\n" +
    "\n" +
    "            <div class=\"ui input left icon\">\n" +
    "                <i class=\"icon ion-lock-combination\"></i><input type=\"password\" name=\"password\" placeholder=\"Enter Password Here...\"></div>\n" +
    "            </div>\n" +
    "            <button class=\"ui icon button\"><i class='icon ion-log-in'></i>Login</button>\n" +
    "</form>");
}]);
