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
          },
          size: {
            height: 300,
            width: 300
          }
        });
      },

      level: function (user) {
        var patterns = [
          '#EFC94C', '#45B29D', '#E27A3F', '#DF5A49', '#FF436A', '#13DCF2',
          '#06ADBF', '#B9E366', '#7D4F7D', '#BBBEB5', '#9DA5A8', '#757E8E',
          '#F2E3B6', '#F28C8C', '#BEDB39', '#1C8442', '#6F92BF', '#B0D165'
        ];
        return c3.generate({
          bindto: '#level',
          data: {
            columns: [
              [ 'Current', 61.8 ]
            ],
            type : 'gauge'
          },
          color: {
            pattern: [ '#06ADBF' ]
          }
        });
      },

      schedule: function (user) {
        var plots = [];
        var patts = [];
        var colors = $http({
          method: 'GET',
          url: '/api/languages'
        }).then(function (data) {
          var langs = ['JavaScript', 'Ruby', 'Python', 'C++', 'PowerShell', 'Rust', 'Pascal', 'Swift'];
          for (var i = 0; i < langs.length; i++) {
            var points = [langs[i]];
            var pat = data.data[langs[i]];
            patts.push(pat.color);
            for (var j = 0; j < 24; j++) {
              points.push(Math.floor(Math.random() * 30));
            }
            plots.push(points);
          }
          return c3.generate({
            bindto: '#schedule',
            data: {
              columns: plots,
              type: 'step'
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
        });
      }
    }
  }]);
