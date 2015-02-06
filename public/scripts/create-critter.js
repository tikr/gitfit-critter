angular.module('gitfitApp.controller.CritterCreateCtrl', [])
  .controller('CritterCreateCtrl', function($scope, $timeout, $http, $window, gitfitUser){

    $scope.fireImgURL = 'images/fireDefault.png';
    $scope.waterImgURL = 'images/waterDefault.png';
    $scope.airImgURL = 'images/airDefault.png';
    $scope.earthImgURL = 'images/earthDefault.png';

    $scope.earthIcon = 'images/earth.svg';
    $scope.airIcon = 'images/air.svg';
    $scope.fireIcon = 'images/fire.svg';
    $scope.waterIcon = 'images/water.svg';

    $scope.fireShowing = true;
    $scope.earthShowing = true;
    $scope.waterShowing = true;
    $scope.airShowing = true;

    $scope.critterHasBeenChosen = false;

    $scope.showChosenCritterImage = function(critterType){
      if (critterType === 'fire'){
        //$scope.fireImgURL = 'images/fire-chosen.jpg';
        //hide other images
        $scope.waterShowing = false;
        $scope.airShowing = false;
        $scope.earthShowing = false;
      } else if (critterType === 'water'){
        //hide other images
        //$scope.waterImgURL = 'images/water-chosen.jpg';
        $scope.fireShowing = false;
        $scope.airShowing = false;
        $scope.earthShowing = false;
      } else if (critterType === 'air'){
        //$scope.airImgURL = 'images/air-chosen.jpg';
        //hide other images
        $scope.waterShowing = false;
        $scope.fireShowing = false;
        $scope.earthShowing = false;
      } else if (critterType === 'earth'){
        //$scope.earthImgURL = 'images/earth-chosen.jpg';
        //hide other images
        $scope.waterShowing = false;
        $scope.airShowing = false;
        $scope.fireShowing = false;
      }
      $scope.critterHasBeenChosen = true;
    };

    $scope.githubAuth = function(type){
		//get encodedId for logged in user
		gitfitUser.show('me')
		.then(function(user){
			var id = user.fitbit.user.encodedId;
		  $window.location.href = '/auth/github?encodedId='+id+'&type='+type;
		})
	};

    $scope.loginWithGithub = function(critterType){
      //show kickass new picture for user's critter type
      $scope.showChosenCritterImage(critterType);
      $timeout(function(){
        //put the user's chosen critter type in the database
        //used $timeout so the user gets to see the awesome image
        return $scope.updateUserModelWithNewCritter();
      }, 2000)
      .then(function(val){
        //then redirect to /auth/github for github authentication
        // $window.location.href = '/auth/github?userID=jofiwjef';
        $scope.githubAuth(critterType);
        console.log(val);
      });
    };

    $scope.updateUserModelWithNewCritter = function(username, critterType){
      //$http.put username model
      //gitfitUser.show('me') //returns a promise
      //.then(function(user){
      //  return $http.put('/api/user/'+user);
      //});
      return 'success';
    };

    $scope.critterShowing = function(critterType){
      if (critterType === 'fire'){
        if ($scope.fireShowing){
          return true;
        } else {
          return false;
        }
      } else if (critterType === 'water'){
        if ($scope.waterShowing){
          return true;
        } else {
          return false;
        }
      } else if (critterType === 'air'){
        if ($scope.airShowing){
          return true;
        } else {
          return false;
        }
      } else if (critterType === 'earth'){
        if ($scope.earthShowing){
          return true;
        } else {
          return false;
        }
      }
    }
  })