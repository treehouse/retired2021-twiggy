// Favourites are string delimited with | e.g. elliottkember|ryancarson|mikekus
// They're stored in the widget runtime. If you like, replace it with the widget system! Yay!

// Check whether the widget is defined!
get_key = function(key){
  if (typeof(widget) != 'undefined'){
    // It's a phone!
    return widget.preferenceForKey(key);
  }else{
    // It's a browser!
    c = $.cookie(key);
    if (c == null){
      $.cookie(key, '');
      return '';
    }
    return c;
  }
}

set_key = function(value, key){
  if (typeof(widget) != 'undefined'){
    return widget.setPreferenceForKey(value, key)
  }else{
    return($.cookie(key, value));
  }
}

// Add a favourite
addFavourite = function(query){
  fs = get_key('favourites');
  fs = fs.replace('|'+query+'|', '|');  // In case it already exists
  fs = fs+query+'|';                    // Concatenate favourite onto the end
  return set_key(fs, 'favourites')
}

// Remove a favourite
removeFavourite = function(query){
  favourites = get_key('favourites');
  favourites = favourites.replace(query+'|', '|');
  return set_key(favourites, 'favourites');
}

// Get the favourites out
getFavourites = function(){
  favs = get_key('favourites');
  return favs.split('|');
}