var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;
var library = models.library;

exports.init = init;

function init() {
	console.log('init');
	
	$('#ArtistsList').flexigrid(
	{
//	url: 'staff.php',
		dataType: 'json',
		colModel : [
		{display: 'Name', name : 'name', width : 250, sortable : true, align: 'left'},
		],
		
		sortname: "Name",
		sortorder: "asc",
		usepager: false,
		title: "Artists",
		useRp: false,
		rp: 100000,
		showTableToggleBtn: false,
		resizable: false,
		//width: 700,
		//height: 370,
		singleSelect: true
	});
	
	$('#ArtistsList').flexAddData(parseArrayToJson(library.artists));//change to single table, now its just an ordered list inside the table
}

function parseArrayToJson(data){
     var rows = Array();

     for (i = 0; i < data.length; i++) {
     	rows.push({ cell: [data[i].name]});
     }
     
	console.log(data[3].name);
      
    return {
         total: data.length,
         page: 1,
         rows: rows
     }
}