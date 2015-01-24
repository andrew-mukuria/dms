app.directive("ng-head", function () {
    return {
        templateUrl: "partials/head.html"
    }
});

app.directive("header", function () {
    return {
        templateUrl: "partials/global/header.html"
    }
});

//app.directive("header_crud", function () {
//    return {
//        templateUrl: "partials/header-crud.html"
//    }
//});
app.directive("sidemenu", function () {
    return {
        templateUrl: "partials/global/side-menu.html"
    }
});
app.directive("rails", function () {
    return {
        templateUrl: "partials/global/rails.html"
    }
});
