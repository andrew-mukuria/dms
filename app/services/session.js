
// I act a repository for the remote header collection.
app.service("MySessionService",
            function( localStorageService ) {
    return({
        getLoggedUser: getLoggedUser
    });


    function getLoggedUser(){
        console.log(JSON.parse(localStorage.getItem('auth_headers')));
        return JSON.parse(localStorage.getItem('auth_headers'));
    }



}
           );
