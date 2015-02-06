angular.module('gitfitApp.service.user', [])
  .factory('gitfitUser', ['$q', '$http', function ($q, $http) {
    return {
      show: function (username) {
        var defer = $q.defer();
        $http({
          method: 'GET',
          url: '/api/users/'+username
        }).then(function (user) {
          defer.resolve(user.data);
        }, function () {
          defer.reject(false);
        });

        return defer.promise;
      },

      food: function (user) {
        return c3.generate({
          bindto: '#food',
          data: {
            columns: [
              [ 'Current', (user.critter.food.current / user.critter.food.needed) * 100 ],
              [ 'Needed', 100 - (user.critter.food.current / user.critter.food.needed) * 100 ]
            ],
            type : 'donut'
          },
          donut: {
            title: 'Bytes comsumption'
          },
          color: {
            pattern: ['#63BCB8', '#F56462']
          }
        });
      },

      schedule: function (user) {
        var plots = [];
        var patts = [];
        var patterns = [
          '#EFC94C', '#45B29D', '#E27A3F', '#DF5A49', '#FF436A', '#13DCF2',
          '#06ADBF', '#B9E366', '#7D4F7D', '#BBBEB5', '#9DA5A8', '#757E8E',
          '#F2E3B6', '#F28C8C', '#BEDB39', '#1C8442', '#6F92BF', '#B0D165'
        ];
        var langs = ['JavaScript', 'Ruby', 'Python', 'C++', 'Swift'];
        for (var i = 0; i < langs.length; i++) {
          var points = [langs[i]];
          patts.push(patterns[Math.floor(Math.random() * patterns.length)]);
          for (var j = 0; j < 24; j++) {
            points.push(Math.floor(Math.random() * 30));
          }
          plots.push(points);
        }
        console.log(patts);
        return c3.generate({
          bindto: '#schedule',
          data: {
            columns: plots,
            type : 'area'
          },
          color: {
            pattern: patts
          },
          axis: {
            x: {
              type: 'category',
              label: {
                text: 'Time of Day',
                position: 'outer-center'
              },
              categories: [
                '12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM',
                '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM',
                '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'
              ]
            },
            y: {
              label: {
                text: 'Commits per day',
                position: 'outer-middle'
              }
            }
          }
        });
      }
    }
  }]);
