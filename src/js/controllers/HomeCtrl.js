angular.module('helloWorldApp')
.controller('HomeCtrl' , [
  '$scope',
  function($scope){
    $scope.message = 'Awesome HZ 3';
  }
]);
