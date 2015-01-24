// I control the main demo.
app.controller(
    "memberCtrl", ['$scope', '$filter','$timeout', 'MembersRestangular', function(scope, filter,timeout, MembersRestangular) {
        getMemberCount();
        getMembers();


        function getMember() {
            var members = MembersRestangular.one('member/id', 1);
            // This will query /accounts and return a promise.
            members.get().then(function(members) {
                scope.members = members.data[0];
            });
        }

        function getMembers() {
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
                scope.recordsPerPage = 10;
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
);