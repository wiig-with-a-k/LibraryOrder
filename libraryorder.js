var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;
var library = models.library;

exports.init = init;

function init() {
	console.log('init');
	
	fillViewWithData($('#ArtistsList'), library.artists);
	addClickEventToList($('#ArtistsList'), onClickedArtist);
	fillViewWithData($('#AlbumsList'), library.albums);
	fillViewWithData($('#SongsList'), library.tracks);
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
    	clickCallback($(this).text().toString());
	});
}

function onClickedArtist (artist) {
	var albumsMatchingArtist = getAlbumsMatchingArtist(artist);
	showOnlyListElementsInList($("#AlbumsList li"), albumsMatchingArtist);

	var tracksMatchingAlbum = getTracksMatchingAlbum(albumsMatchingArtist);
	showOnlyListElementsInList($("#SongsList li"), tracksMatchingAlbum);
}

function getAlbumsMatchingArtist(artist) {
	var albumsMatchingArtist = [];
	var allAlbums = library.albums;

	for(var i=0; i<allAlbums.length; i++)	{
		if (allAlbums[i].artist.name === artist) {
			console.log('Adding match: ' + allAlbums[i].name);
			albumsMatchingArtist.push(allAlbums[i]);
		};
	};	

	return albumsMatchingArtist;
}

function getTracksMatchingAlbum(albums) {
	var tracksMatchingAlbum = [];
	var tracks = [];

	for (var i = albums.length - 1; i >= 0; i--) {
		console.log('album: '+ albums[i].uri);

		models.Album.fromURI(albums[i].uri, function (album) {
			console.log('album loaded: ' + album.name);

			for (var t = album.tracks.length - 1; t >= 0; t--) {
				 console.log('Adding track match: ' + album.tracks[t].name);
				 tracksMatchingAlbum.push(album.tracks[t]);
			};
		});
	};

	return tracksMatchingAlbum; //doesent work because fromuri above is async
}

function showOnlyListElementsInList(listElements, list) {
	listElements.each(function(){
     	var match = false;
     	var liElement = $(this); 
     	var liText = liElement.text();
		
		for (var i = list.length - 1; i >= 0; i--) {
			if (liText === list[i].name) {
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