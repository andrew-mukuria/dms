
// I act a repository for the remote header collection.
app.service("MySessionService",
            function( localStorageService ) {
    return({
        getLoggedUser: getLoggedUser
    });


    function getLoggedUser(){
        console.log(localStorageService.get('meds_user'));
        return localStorageService.get('meds_user');
    }



}
           );
