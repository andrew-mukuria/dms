app.config(function ($routeProvider) {
    $routeProvider.
    when("/members", {
        templateUrl: "crud_partials/members.html",
        controller: "memberCtrl"
    }).
    when("/benefits", {
        templateUrl: "crud_partials/benefits.html",
        controller: "benefitsCtrl"
    }).
    when("/claims", {
        templateUrl: "crud_partials/claims.html",
        controller: "claimsCtrl"
    }).
    when("/provider", {
        templateUrl: "crud_partials/provider.html",
        controller: "providerCtrl"
    }).
    when("/services", {
        templateUrl: "crud_partials/services.html",
        controller: "servicesCtrl"
    }).
    otherwise({
        redirectTo: '/'
    }); });
