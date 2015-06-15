// I control the main demo.
app.controller(
  "membersCtrl", ['$scope', '$rootScope', '$filter', '$timeout',
    'DMSRestangular', '$state', 'localStorageService', 'MySessionService',
    function(scope, rootScope, filter, timeout, DMSRestangular, state,
      localStorageService, MySessionService) {
      var Members = DMSRestangular.all('members');
      getMemberCount();
      rootScope.user = MySessionService.getLoggedUser();

      scope.getMember = function getMember(newMember) {
        scope.memberProfile = newMember;
        state.go('location.members.view');
      }

      scope.getMembers = function getMembers() {
        Members.customGET('').then(function(members) {
          scope.rowCollection = members;
          scope.displayedCollection = [].concat(scope.rowCollection);
        });
      }

      scope.login = function login() {
        rootScope.user = [];
        var user = DMSRestangular.one('user').one('username', scope.formData
          .username).one('password', scope.formData.password).one(
          'format', 'json');
        // This will query /accounts and return a promise.
        user.customGET('').then(function(userObj) {
          localStorageService.set('meds_user', userObj);
          state.go('users');

        });
      }

      function getMemberCount() {
        Members.customGET('').then(function(members) {
          scope.records = members.length;
          scope.recordsPerPage = 5;
          scope.pages = Math.ceil(scope.records / scope.recordsPerPage);
        });
      }

      scope.setStatus = function setStatus(status) {
        scope.status = status;
        if (status == 'add') {
          scope.memberProfile = [];
        }
      }
      scope.newMember = function newMember() {

      }

      scope.updateMember = function updateMember() {
        member = scope.memberProfile;
        updatedmember = DMSRestangular.one('memberes', member.id);
        updatedmember[0] = member;
        updatedmember.put(member);
      }

    }
  ]
);