angular.module('gitfitApp.service.user', [])
  .factory('gitfitUser', ['$q', '$http', function ($q, $http) {
    return {
      // todo: need $cookieStore 'token'
      show: function (username) {
        var defer = $q.defer();
        $http({
          method: 'GET',
          url: '/api/users/'+username
        }).then(function (user) {
          defer.resolve(user.data);
          console.log('ok', user);
        }, function () {
          defer.reject(false);
        });

        return defer.promise;
      }
    }
  }]);
