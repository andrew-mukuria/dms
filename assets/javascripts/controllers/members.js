// I control the main demo.
app.controller(
    "memberCtrl",
    function( $scope, memberService ) {

        // I contain the list of members to be rendered.
        $scope.members = [];
        $scope.filters = [];
        // I contain the ngModel values for form interaction.
        $scope.form = {
            name: ""
        };
        $scope.base_url='http://localhost/hmis/';
        var criteria = 'Member Name';
        var value ='Rufus';
        loadRemoteData(base_url,criteria,value);
        loadCriteria(base_url);
        // ---
        // PUBLIC METHODS.
        // ---


        // I process the add-member form.
        $scope.addMember = function() {

            // If the data we provide is invalid, the promise will be rejected,
            // at which point we can tell the user that something went wrong. In
            // this case, I'm just logging to the console to keep things very
            // simple for the demo.
            memberService.addMember( $scope.form.name )
            .then(
                loadRemoteData,
                function( errorMessage ) {

                    console.warn( errorMessage );

                }
            )
            ;

            // Reset the form once values have been consumed.
            $scope.form.name = "";

        };


        // I remove the given member from the current collection.
        $scope.removeMember = function( member ) {

            // Rather than doing anything clever on the client-side, I'm just
            // going to reload the remote data.
            memberService.removeMember( member.id )
            .then( loadRemoteData )
            ;

        };


        // ---
        // PRIVATE METHODS.
        // ---


        // I apply the remote data to the local scope.
        function applyRemoteData( newMembers ) {

            $scope.members = newMembers;

        }

        // I apply the remote data to the local scope.
        function applyFilters( newFilters ) {

            $scope.filters = newFilters;

        }


        // I load the remote data from the server.
        function loadRemoteData(base_url,criteria,value) {

            // The memberService returns a promise.
            memberService.getMembers(base_url,criteria,value)
            .then(
                function( members ) {

                    applyRemoteData( members.data[0] );


                }
            )
            ;

        }

        // I load the remote data from the server.
        function loadCriteria(base_url) {

            // The memberService returns a promise.
            memberService.getCriteria(base_url)
            .then(
                function( filters ) {
                    applyFilters( filters );

                }
            )
            ;

        }

    }
);


// -------------------------------------------------- //
// -------------------------------------------------- //


// I act a repository for the remote member collection.
app.service(
    "memberService",
    function( $http, $q ) {

        // Return public API.
        return({
            addMember: addMember,
            getMembers: getMembers,
            removeMember: removeMember,
            getCriteria: getCriteria
        });


        // ---
        // PUBLIC METHODS.
        // ---


        // I add a member with the given name to the remote collection.
        function addMember( name ) {

            var request = $http({
                method: "post",
                url: "api/index.cfm",
                params: {
                    action: "add"
                },
                data: {
                    name: name
                }
            });

            return( request.then( handleSuccess, handleError ) );

        }


        // I get all of the members in the remote collection.
        function getMembers(base_url,criteria,value) {

            var request = $http({
                method: "get",
                url: base_url + "members/read/"+criteria+'/'+value,
                params: {
                    action: "get"
                }
            });

            return( request.then( handleSuccess, handleError ) );

        }


        // I remove the member with the given ID from the remote collection.
        function removeMember( id ) {

            var request = $http({
                method: "delete",
                url: "api/index.cfm",
                params: {
                    action: "delete"
                },
                data: {
                    id: id
                }
            });

            return( request.then( handleSuccess, handleError ) );

        }
        function getCriteria(base_url) {

            var request = $http({
                method: "get",
                url: base_url + "members/getCriteria",
                params: {
                    action: "get"
                }
            });

            return( request.then( handleSuccess, handleError ) );

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
