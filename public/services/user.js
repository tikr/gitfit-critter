angular.module('gitfitApp.service.user', [])
  .factory('gitfitUser', ['$q', '$http', function ($q, $http) {
    return {
      show: function (username) {
        var defer = $q.defer();
        $http({
          method: 'GET',
          url: '/api/users/' + username
        }).then(function (user) {
          defer.resolve(user.data);
        }, function () {
          defer.reject(false);
        });

        return defer.promise;
      },

      food: function (user) {
        var math = (user.critter.food.current / user.critter.food.needed) || 0;
        return c3.generate({
          bindto: '#food',
          data: {
            columns: [
              [ 'Current', math * 100 ],
              [ 'Needed', 100 - math * 100 ]
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
        $http({
          method: 'GET',
          url: '/api/users/' + user.github.login + '/dailyCommits'
        }).then(function (commits) {
          var commits = commits.data;
          var plots = {};
          var patterns = [
            '#45B29D', '#EFC94C', '#E27A3F', '#DF5A49', '#FF436A', '#13DCF2',
            '#06ADBF', '#B9E366', '#7D4F7D', '#BBBEB5', '#9DA5A8', '#757E8E',
            '#F2E3B6', '#F28C8C', '#BEDB39', '#1C8442', '#6F92BF', '#B0D165'
          ];
          for (var i = 0; i < commits.length; i++) {
            var commit = commits[i];
            var repo = commit.repoName;
            if (plots[repo]) {
              plots[repo][commit.hour] += commit.numCommits;
            } else {
              plots[repo] = [];
              for (var j = 0; j < 24; j++) {
                plots[repo].push(0);
              }
            }
          }
          var cnt = 0;
          var columns = [];
          for (var repo in plots) {
            columns[cnt] = [repo].concat(plots[repo]);
            cnt++;
          }
          return c3.generate({
            bindto: '#schedule',
            data: {
              columns: columns.length > 0 ? columns : [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ],
              type: 'step'
            },
            color: {
              pattern: patterns
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
