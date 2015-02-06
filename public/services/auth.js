angular.module('gitfitApp.service.user', [])
  .factory('Auth', ['$q', '$http', function ($q, $http, $cookieStore) {
      var currentUser = {};
      if($cookieStore.get('token')) {
        currentUser = User.get();
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
        isLoggedInAsync: function(cb) {
          if(currentUser.hasOwnProperty('$promise')) {
            currentUser.$promise.then(function() {
              cb(true);
            }).catch(function() {
              cb(false);
            });
          } else if(currentUser.hasOwnProperty('role')) {
            cb(true);
          } else {
            cb(false);
          }
        },
        isAdmin: function() {
          return currentUser.role === 'admin';
        },
        getToken: function() {
          return $cookieStore.get('token');
        }
      };
    });
