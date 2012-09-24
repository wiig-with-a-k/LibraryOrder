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
	var albumsMatchingArtist = getAlbumsMatchingArtist(artist);

	showOnlyAlbumElementsInList(albumsMatchingArtist);
}

function getAlbumsMatchingArtist(artist) {
	var albumsMatchingArtist = [];
	var allAlbums = library.albums;

	for(var i=0; i<allAlbums.length; i++)	{
		if (allAlbums[i].artist.name === artist.toString()) {
			console.log('Adding match: ' + allAlbums[i].name);
			albumsMatchingArtist.push(allAlbums[i].name);
		};
	};	

	return albumsMatchingArtist;
}

function showOnlyAlbumElementsInList(albumsList) {
	$("#AlbumsList li").each(function(){
     	var match = false;
     	var liElement = $(this); 
     	var liText = liElement.text();
		
		for (var i = albumsList.length - 1; i >= 0; i--) {
			if (liText === albumsList[i]) {
				match = true;
				break;
			};
		};

		if(match) {
			liElement.show();
		} 
		else {
	    	liElement.hide();	 
		}
    });
}