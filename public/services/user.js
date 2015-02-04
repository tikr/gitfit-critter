angular.module('gitfitApp.service.user', [])
  .factory('gitfitUser', ['$q', '$http', function ($q, $http) {
    return {
      show: function (username) {
        var defer = $q.defer();
        $http({
          method: 'GET',
          url: '/api/users/rvbsanjose'
        }).then(function (user) {
          defer.resolve(user.data);
        }, function () {
          defer.reject(false);
        });

        return defer.promise;
      }
    };
  }]);
