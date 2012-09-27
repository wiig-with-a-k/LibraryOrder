var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;
var library = models.library;

exports.init = init;

function init() {
	console.log('init');
	
	fillViewWithData($('#ArtistsList'), getArtistsFromAlbums(library.albums), true);
	addClickEventToList($('#ArtistsList'), onClickedArtist, 1);
	
	fillViewWithData($('#AlbumsList'), library.albums, true);
	addClickEventToList($('#AlbumsList'), onDoubleClickedAlbum, 2);

	fillViewWithData($('#SongsList'), library.tracks, false);
	addClickEventToList($('#SongsList'), onDoubleClickedSong, 2);
}

function getArtistsFromAlbums (albums) {
	var artists = [];

	for (var i = albums.length - 1; i >= 0; i--) {
		artists.push(albums[i].artist);
	};

	return artists;
}

function fillViewWithData (view, data, sort) {
  if (sort) {
  	data.sort();
  };

  for(var i=0; i<data.length; i++) {
		console.log(data[i].name);

		view.append('<li>' + data[i].name + '</li>');	
	}
}

 function addClickEventToList (list, clickCallback, numberOfClicks) {
 	var click;

 	if (numberOfClicks === 1) {
 		click = 'click';
 	} else {
 		click = 'dblclick';
 	};

 	list.delegate('li', click, function () {
    	console.log(click + ' : '+ $(this).text());
    	clickCallback($(this).text().toString());
	});
}

function onClickedArtist (artist) {
	var albumsMatchingArtist = getAlbumsMatchingArtist(artist);
	showOnlyListElementsInList($("#AlbumsList li"), albumsMatchingArtist);

	var tracksMatchingArtist = getTracksMatchingArtist(artist);
	showOnlyListElementsInList($("#SongsList li"), tracksMatchingArtist);
}

function onDoubleClickedAlbum (album) {
	console.log(album);

	loadAlbum(album);
}

function onDoubleClickedSong (song) {
	var libraryTrack = getMatchingFromLibrary(song, library.tracks);

	playTrack(libraryTrack);
}

function loadAlbum (album) {
	var libraryAlbum = getMatchingFromLibrary(album, library.albums);

	playAlbum(libraryAlbum);
}

function getMatchingFromLibrary (name, library) {
	for(var i=0; i<library.length; i++)	{
		if (library[i].name === name) {
			console.log('Adding match: ' + library[i].name);
			
			return library[i];
		};
	};	
}

function playAlbum (album) {
	models.Album.fromURI(album.uri, function (album) {
		console.log('album loaded from backend: ' + album.name);

		player.play(album.get(0), album);
	});
}

function playTrack (track) {
	console.log('Playing track: '+ track);
	player.play(track);
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

function getTracksMatchingArtist(artist) {
	var tracksMatchingArtist = [];
	var allTracks = library.tracks;
	var artists = [];

	for (var i = allTracks.length - 1; i >= 0; i--) {
		artists = allTracks[i].artists;
		for (var j = artists.length - 1; j >= 0; j--) {
			if(artists[j].name === artist) {
				console.log('Adding match: ' + allTracks[i].name);
				tracksMatchingArtist.push(allTracks[i]);
			}
			break;
		};
	};

	return tracksMatchingArtist;
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