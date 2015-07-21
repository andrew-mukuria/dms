app.controller("HomeCtrl", [ '$rootScope', '$scope' , function(rootScope, scope) {

      rootScope.title = 'DMS | Home';

    angular.extend(scope, {
      nairobi: {
        lat: -1.2833,
        lng: 36.8167,
        zoom: 12
      },
      markers: [],
      layers: {
        baselayers: {
           mapbox_dark: {
             name: 'Mapbox Dark',
             url: 'https://a.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
             type: 'xyz',
             layerOptions: {
               apikey: 'pk.eyJ1IjoidmljNzgiLCJhIjoiYjdkMzUwM2IyMjRiZWIxYzQ1Mjk5YTBjYmI2YzI2ZDMifQ.Tsm2SZhOm0IoY7aHzi0CAA',
               mapid: 'vic78.f679a5b4'
             }
          },
           mapbox_light: {
             name: 'Mapbox Satellite',
             url: 'https://a.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
             type: 'xyz',
             layerOptions: {
               apikey: 'pk.eyJ1IjoidmljNzgiLCJhIjoiYjdkMzUwM2IyMjRiZWIxYzQ1Mjk5YTBjYmI2YzI2ZDMifQ.Tsm2SZhOm0IoY7aHzi0CAA',
               mapid: 'vic78.mphf9k8h'
             }
          },
           mapbox_wheatpaste: {
             name: 'Mapbox Wheat Paste',
             url: 'https://a.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
             type: 'xyz',
             layerOptions: {
               apikey: 'pk.eyJ1IjoidmljNzgiLCJhIjoiYjdkMzUwM2IyMjRiZWIxYzQ1Mjk5YTBjYmI2YzI2ZDMifQ.Tsm2SZhOm0IoY7aHzi0CAA',
               mapid: 'vic78.mp1jp046'
             }
          }
        }
      }
    });
}]);


