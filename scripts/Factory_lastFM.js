/**
  Author: Menard (Ren) Z. Soliven

  Data Access Layer for the LastFM api. Returns an object with lastFM methods.
  Validation logic should be in the calling function.

  lastFM REST methods are named "package.method",
  method names in this layer will be "package_method".

  I currently pass an object with properties in case we want to extend the
  functionality and do more than just pass an artist to the endpoint(s).
**/
angular.module("similarArtistsApp").factory("lastFM", ["$http",
 function($http){
  // Vulnerable to a deny of service attack. Bad!!!
  var apiEndpoint =  "http://ws.audioscrobbler.com/2.0/",
      // Don't abuse this, please.
      apiKey = "&api_key=9934cbfa947e071d88273213df68ec4c";

  return {
    artist_getSimilarArtist: function(objArgs, cb){
      if(typeof objArgs.seedArtist === "undefined")
        return;
      $http({
        method: "JSONP",
        url: apiEndpoint + "?method=artist.getSimilar&format=json&callback=JSON_CALLBACK&autocorrect=1&limit=6&artist="
         + encodeURIComponent(objArgs.seedArtist) + apiKey,
        cache: true
      }).then(function cbSuccess(response){
        cb(response.data);
      }, function cbError(response){
        cb(response.data || "Request failed");
      });
    },
    artist_getTopTracks: function(objArgs, cb){
      if(typeof objArgs.seedArtist === "undefined")
        return;
      $http({
        method: "JSONP",
        url: apiEndpoint + "?method=artist.getTopTracks&format=json&callback=JSON_CALLBACK&autocorrect=1&limit=6&artist="
        + encodeURIComponent(objArgs.seedArtist) + apiKey,
         cache: true
      }).then(function cbSuccess(response){
        cb(response.data);
      }, function cbError(response){
        cb(response.data || "Request failed");
      });
    }
  }
}]);
