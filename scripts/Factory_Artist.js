/**
  Author: Menard (Ren) Z. Soliven

  Returns a singleton to be bound to the input and display controllers.
  Elements of similarArtists should have the form:

  {
    name: "Adele",
    toptracks: ["21", "Hello"]
    ...
  }
**/
angular.module("similarArtistsApp").factory("Artist", ["lastFM",
 function(lastFM){
   // Map artist names to elements in similarArtists
   var privateMap = {};
   // Convoluted switch system to pass to the controller just so we can have
   // a damn glpyh. There should be a smarter way to do this.
   var toggleAccordionPanelByArtistName = {};
   // Instance to be returned.
   var singleton = {
     "seedArtist": "",
     "similarArtists": [],
   };
   singleton.getMap = function(){
     return privateMap;
   }
   singleton.clearMap = function(){
     privateMap = {};
   }
   singleton.getSwitchSystemForAccordion = function(){
     return toggleAccordionPanelByArtistName;
   }
   singleton.clearSwitchSystem = function(){
     toggleAccordionPanelByArtistName = {};
   }
   // Update similarArtists. similarArtists contains both similar artists and
   // top tracks of those similar artists.
   singleton.update = function(seed){
     if(this.seedArtist === seed){
       return;
     }
     this.seedArtist = seed;
     this.similarArtists = []; // Check that the controller is pointing to the same array
     this.clearMap();
     this.clearSwitchSystem();
     lastFM.artist_getSimilarArtist({"seedArtist": this.seedArtist},
       (function(rawResponse){
         /**
           Assert that rawResponse contains similarartists{artist:[]}
           console.log(rawResponse)
         **/

         var artists = rawResponse.similarartists;
         if(typeof artists === "undefined" || typeof artists.artist === "undefined"){
           return;
         }
         //rawResponse.similarartists.artist fails when similarartists is undefined.
         artists = artists.artist || undefined;
         for(var idx=0, ctr=0; idx<artists.length; ++idx){
           var artist = artists[idx];
           this.similarArtists.push(artist);
           this.getSwitchSystemForAccordion()[artist.name] = false;
           this.getMap()[artist.name] = ctr;
           ctr++;
           lastFM.artist_getTopTracks({"seedArtist": artist.name},
             (function(rawResponse){
               var tracks = rawResponse.toptracks.track,
                   reqArtist = rawResponse.toptracks["@attr"].artist;
               if(tracks && reqArtist){
                 var map = this.getMap();
                 this.similarArtists[map[reqArtist]].toptracks = tracks;
               }
             }).bind(this));
         }
       }).bind(this));
       return this.similarArtists;
   }
  return singleton;
}]);
