// I control the main demo.
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
);