/*
  Author: Menard (Ren) Z. Soliven
*/
var artistsApp = angular.module("similarArtistsApp", ['ui.bootstrap', 'ngAnimate']);
/**
  Controllers
**/
artistsApp.controller("appCtrl", ["$scope", "$window", "Artist",
 function($scope, $window, artist){
  $scope.displayList = null;
  $scope.oneAtATime = true;
  $scope.ttHelp = false;
  $scope.onArtistSeedEnter = function(seedArtist){
    // Return a reference to the artist service's similarArtist instance.
    $scope.displayList = artist.update(seedArtist);
    // Complicated, convoluted, bad switch system for the accordion.
    $scope.status = artist.getSwitchSystemForAccordion();
    // Hide help" p tag..
    $scope.ttHelp = true;
  }
  // Open the argument url in a new tab.
  $scope.openInNewTab = function(url){
    $window.open(url, "_blank");
  };
}]);
