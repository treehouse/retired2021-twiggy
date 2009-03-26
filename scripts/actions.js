// Hi there. Thanks for reading the source!

// Renew the favourites page
renewFavourites = function(){
  f = getFavourites();
  var list = $('<ul class="tweet_list" id="favourites_list">');
  $.each(f, function(i, text){
    if (text != ''){ // Blank favourites problem
      favourite   = '<a rel="'+text+'" href="#none-none" class="favourite">' + text + '</span>';
      delete_link = '<a href="#none" rel="'+text+'" class="delete"></a>';
      list.append('<li class="tweet favourite_li">' + favourite + delete_link + '</li>');
      list.children('li:odd').addClass('tweet_even');
      list.children('li:even').addClass('tweet_odd');
      list.children('li:first').addClass('tweet_first');
      list.children('li:last').addClass('tweet_last');
    }
  })
  $('#favourites').empty().append(list);
}

// Perform a search
search = function(text){
  if(text == ''){text = 'elliottkember'} // hehe - shameless!
  if (window && window.location) {
    window.location.hash = text;
  }
  // Swoosh the save button into the favourites button
  $('.save_button').animate({ 
    marginLeft: "5",
    width: "20px"
  }, 0);
  // Make the body background white
  $('body').addClass('white');
  // Open the search panel
  open_search();
  // Set the query in the title bar
  $('#query').text(text);
  // And propagate!
  $('#results_list').empty().tweet({
      avatar_size: 32,
      count: 50,
      query: text,
      loading_text: "Searching Twitter for '"+text+"'"
  });
  return false;
};

// Open the search panel
open_search = function(){
  $('#navigation, #searchbar, #results, .results-page-only').show();
  $('#favourites, #home, #search_again, .favourites-page-only').hide();
}

// Open the home panel
open_home = function(){
  $('#dock, #favourites, #navigation, #searchbar, #results, #search_again, .results-page-only, .home_button.favourites-page').hide();
  $('#home').show();
  $('#widget_wrapper').show();
  $('#search').focus();
}

// Show favourites panel
open_favourites = function(){
  $('body').addClass('white');
  $('#home, .results-page-only, .search-page-only, .results_page, #results').hide();
  $('#favourites, .favourites-page-only, .favourites-page').show();
}

$('document').ready(function(){

  if (typeof(widget) == 'undefined'){
    $('.close_button').remove();
  }else{
    // Close button
    $('.close_button').click(function(){window.close(); return false});
  }

  // Add search methods
  $('#small-search').submit(function(){ search($('#research').val()  )  ; return false });
  $('#main-search').submit( function(){ search($('#search').val()    )  ; return false ; return false});

  // Reload button
  $('#reload').click(function(){return search($('#query').text())});
    
  // "Search" button on results page
  $('.home_button').click(function(){
    $('body').removeClass('white');
    $('#search_again').show();
    $('#navigation, #searchbar').hide();
    $('#research').focus();
  });
  
  // Home button on favourites page
  $('#favourites_home_button').click(open_home);
  
  // Favourites button, anywhere
  $('.favourites_button').click(open_favourites);
  
  // Saving a favourite
  $('.save_button').click(function(){
    $(this).animate({
       marginLeft: "-20",
       width: 0
     }, 500 );
    addFavourite($('#query').text());
    renewFavourites();
  });
  
  // Clicking a "favourite"
  $('.favourite').live("click", function(el){
   query = this.innerHTML;
   search(query);
  });
  
  // Deleting a "favourite"
  $('.delete').live("click", function(el){
   query = this.getAttribute('rel');
   removeFavourite(query);
   $(this).parent().fadeOut();
  });

  renewFavourites();  
  open_home(); // required to hide the dock

  if (window.location.hash && window.location.hash != '#none'){
    query = window.location.hash.replace('#', '');
    search(query)
  }else{
    $('#search').focus();
  }
  
  
});
