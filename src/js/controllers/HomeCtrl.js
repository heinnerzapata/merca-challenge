angular.module('helloWorldApp')
.directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        } ])

.controller('HomeCtrl' , [
  '$scope', 'apiServices' , 'appConfig' ,
  function($scope , apiServices , appConfig){

    $scope.message = 'heinner zapata';
    $scope.map;
    $scope.formdata = new FormData();
    $scope.bounds = new google.maps.LatLngBounds();

    $scope.initMap = function() {
      var map_div = angular.element(document.querySelector('#map_div'));
      if(map_div.length){
        $scope.map = new google.maps.Map(document.getElementById('map_div'), {
           center: {lat: -34.397, lng: 150.644},
           zoom: 8
        });
      }
    }

    $scope.uploadFiles = function(){
      apiServices
            .uploadFiles($scope.formdata)
            .then(function(data){

                //for( i = 0; i < data.results.length; i++ ) {
                data.data.results.forEach(function(resu){
                  console.log(resu)
                     var position = new google.maps.LatLng(resu.data.location.lat,resu.data.location.lng);
                     $scope.bounds.extend(position);
                     var marker = new google.maps.Marker({
                         position: position,
                         map: $scope.map,
                         title: 'test'
                     });

                     // Allow each marker to have an info window
                     /*
                     google.maps.event.addListener(marker, 'click', (function(marker, i) {
                         return function() {
                             infoWindow.setContent(resu.data.formatted_address);
                             infoWindow.open($scope.map, marker);
                         }
                     })(marker, i));*/

                     // Automatically center the map fitting all markers on the screen
                     $scope.map.fitBounds($scope.bounds);
                 });

            })
            .catch(function(err){
              console.log(err);
            })
    }

    $scope.getTheFiles = function ($files) {
                angular.forEach($files, function (value, key) {
                    $scope.formdata.append(key, value);
                });
    };

    $scope.initMap();

    google.maps.event.addDomListener(window, 'load', $scope.initMap);

  }
]);
