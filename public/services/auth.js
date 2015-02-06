angular.module('gitfitApp.service.auth', [])
  .factory('Auth', ['$q', '$http', '$cookieStore', 'gitfitUser', function ($q, $http, $cookieStore, gitfitUser) {
      var currentUser = {};
      if($cookieStore.get('token')) {
        gitfitUser.show('me')
        .then(function(user){
            currentUser = user;
        });
      }
      return {
        logout: function() {
          $cookieStore.remove('token');
          currentUser = {};
        },
        getCurrentUser: function() {
          return currentUser;
        },
        isLoggedIn: function() {
          return currentUser.hasOwnProperty('role');
        },
        isAdmin: function() {
          return currentUser.role === 'admin';
        },
        getToken: function() {
          return $cookieStore.get('token');
        }
      };
    }]);
