var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;
var library = models.library;

exports.init = init;

function init() {
	console.log('init');
	
	fillViewWithData($('#ArtistsList'), library.artists);
	fillViewWithData($('#AlbumsList'), library.albums);
	fillViewWithData($('#SongsList'), library.tracks);
}

function fillViewWithData (view, data) {
  for(var i=0; i<data.length; i++) {
		console.log(data[i].name);
		
		view.append('<li>' + data[i].name + '</li>');
	}
}
