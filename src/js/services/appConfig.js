angular.module('helloWorldApp')
.service('appConfig' , function(){
  return {
    api : {
      geolocationByAddresss : 'http://localhost:3002/api/geolocationByAddresss',
      uploadFiles : 'http://localhost:3002/api/uploadFiles',
      getDistanceTwoPoints : 'http://localhost:3002/api/getDistanceTwoPoints'
    }
  }
});
