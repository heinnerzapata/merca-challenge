angular.module('helloWorldApp')
.controller('HomeCtrl' , [
  '$scope',
  function($scope){

    $scope.message = 'heinner zapata';

    $scope.map;

    $scope.initMap = function() {

      var map_div = angular.element(document.querySelector('#map_div'));

      if(map_div.length){
        $scope.map = new google.maps.Map(document.getElementById('map_div'), {
           center: {lat: -34.397, lng: 150.644},
           zoom: 8
        });
      }

    }

    $scope.initMap();

    google.maps.event.addDomListener(window, 'load', $scope.initMap);

  }
]);
