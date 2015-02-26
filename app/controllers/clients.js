// I control the main demo.
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
);