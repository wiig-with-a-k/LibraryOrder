var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;
var library = models.library;

exports.init = init;

function init() {
	console.log('Booting');
	
	var header = document.getElementById("header");
	
	fillArtistView();
	/*
	for(var i=0; i<library.albums.length; i++) {
		console.log(library.albums[i].name);
	
		header.innerHTML += library.albums[i].name + '\n';
	}

	

	player.observe(models.EVENT.CHANGE, function (e) {
		// Only update the page if the track changed
		if (e.data.curtrack == true) {
			updatePageWithTrackDetails();
		}
	});
	*/
}

function fillArtistView() {
	var artistView;
	
	artistView = document.getElementById('ArtistView');
	
	$('#ArtistView').append("<ul id ='artistList'></ul>");
	
	
	
	for(var i=0; i<library.artists.length; i++) {
		console.log(library.artists[i].name);
		
		$('#artistList').append('<li>' + library.artists[i].name + '</li>');
		
	}
	/*
	    $('#myDiv').append("<ul id='newList'></ul>");
    for (cnt = 0; cnt < someList.length; cnt++) {
          $("#newList").append("<li>"+someList[cnt].FirstName + ":" + someList[cnt].LastName+"</li>");
    }
	*/
}

function updatePageWithTrackDetails() {
	
	var header = document.getElementById("header");

	// This will be null if nothing is playing.
	var playerTrackInfo = player.track;

	if (playerTrackInfo == null) {
		header.innerText = "Nothing playing!";
	} else {
		var track = playerTrackInfo.data;
		header.innerHTML = track.name + " on the album " + track.album.name + " by " + track.album.artist.name + ".";
	}
}