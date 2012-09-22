var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;
var library = models.library;

exports.init = init;

function init() {
	console.log('init');
	
	fillViewWithData($('#ArtistsList'), library.artists);
	addClickEventToList($('#ArtistsList'), filterAlbumsList);
	fillViewWithData($('#AlbumsList'), library.albums);
	//fillViewWithData($('#SongsList'), library.tracks);
}

function fillViewWithData (view, data) {
  data.sort();

  for(var i=0; i<data.length; i++) {
		console.log(data[i].name);

		view.append('<li>' + data[i].name + '</li>');	
	}
}

 function addClickEventToList (list, clickCallback) {
 	list.delegate('li', 'click', function () {
    	console.log('clicked: '+ $(this).text());
    	clickCallback($(this).text());
	});
}

function filterAlbumsList (artist) {
	$("#AlbumsList li").each(function(){
     var liText = $(this).text();
     console.log(liText);

     if ()
    // if(liText.indexOf(letter) == 0)  
      //   $(this).show();
    });     

}