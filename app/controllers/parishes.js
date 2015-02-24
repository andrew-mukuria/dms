// I control the main demo.
app.controller(
    "parishesCtrl", ['$scope', '$rootScope', '$filter', '$timeout', 'DMSRestangular', '$state', 'localStorageService', 'MySessionService', function(scope, rootScope, filter, timeout, DMSRestangular, state, localStorageService, MySessionService) {

        getParishCount();
        rootScope.user = MySessionService.getLoggedUser();

        scope.getParish = function getParish(newParish) {
            console.log(newParish);
            scope.parishProfile = newParish;
            state.go('location.parishes.view');
        }

        scope.getParishes = function getParishes() {
            var Parishes = DMSRestangular.all('parishes');
            // This will query /accounts and return a promise.
            Parishes.customGET('').then(function(parishes) {
                //console.log(users);
                scope.rowCollection = parishes;
                scope.displayedCollection = [].concat(scope.rowCollection);
            });
        }

        scope.login = function login() {
            rootScope.user = [];
            var user = DMSRestangular.one('user').one('username', scope.formData.username).one('password', scope.formData.password).one('format', 'json');
            // This will query /accounts and return a promise.
            user.customGET('').then(function(userObj) {
                localStorageService.set('meds_user', userObj);
                state.go('users');

            });
        }

        function getParishCount() {
            var Parishes = DMSRestangular.all('parishes');
            // This will query /accounts and return a promise.
            Parishes.customGET('').then(function(parishes) {
                // console.log(users);
                scope.records = parishes.length;
                scope.recordsPerPage = 5;
                scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
            });
        }
    }]
);
