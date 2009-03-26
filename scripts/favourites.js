// Favourites are string delimited with | e.g. elliottkember|ryancarson|mikekus

// Add a favourite
addFavourite = function(query){
  var fs = widget.preferenceForKey('favourites');
  fs = fs.replace('|'+query+'|', '|'); // In case it already exists
  // Concatenate favourite onto the end
  fs = fs+query+'|';
  widget.setPreferenceForKey(fs, 'favourites')
}

// Remove a favourite
removeFavourite = function(query){
  favourites = widget.preferenceForKey('favourites');
  favourites = favourites.replace(query+'|', '|');
  widget.setPreferenceForKey(favourites, 'favourites');
}

// Get the favourites out
getFavourites = function(){
  return widget.preferenceForKey('favourites').split('|');
}