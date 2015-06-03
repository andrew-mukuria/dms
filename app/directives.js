// app.directive("head", function () {
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
