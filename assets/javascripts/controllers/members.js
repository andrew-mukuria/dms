// I control the main demo.
app.controller(
    "memberCtrl",['$scope','$filter','MembersRestangular',function( scope,filter, MembersRestangular ) {

        getMembers();


        function getMember(){
            var members = MembersRestangular.one('member/id',1);
            // This will query /accounts and return a promise.
            members.get().then(function(members) {
                scope.members = members.data[0];
            });
        }

        function getMembers(){
            var AllMembers = MembersRestangular.all('members');
            // This will query /accounts and return a promise.
            AllMembers.customGET('').then(function(members) {
                scope.rowCollection = members.data;
                scope.records = members.data.length;
                
            });
        }
    }]
);
