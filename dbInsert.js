var Genre;
var SongName;

function onLoad() {
	//alert("In onLoad()");
	getGenre(false);
	getSong(false);
}

function insertSong() {
	var Genre,
	    SongName,
	    YoutubeLink;
	Genre = JSON.stringify($('#Genre').val());
	SongName = JSON.stringify($('#SongName').val());
	YoutubeLink = JSON.stringify($('#YoutubeLink').val());
	ajax = ajaxinsertSong("insertSong", Genre, SongName, YoutubeLink);
	ajax.done(insertSongCallback);
	ajax.fail(function() {
		alert("Failure");
	});
}

function ajaxinsertSong(method, Genre, SongName, YoutubeLink) {
	return $.ajax({
		url : 'dbInsert.php',
		type : 'POST',
		data : {
			method : method,
			Genre : Genre,
			SongName : SongName,
			YoutubeLink : YoutubeLink
		}
	});
}

function insertSongCallback(response_in) {
	response = JSON.parse(response_in);

	if (!response['success']) {
		$("#results").html("");
		alert("Insert failed on query:" + '\n' + response['querystring']);
		getSong(false);
		getGenre(false);
	} else {
		$("results").html(response['querystring'] + '<br>' + response['success'] + '<br>');
		getSong(false);
		getGenre(false);
	}
}

function showSong(SongName) {
	//alert("In showELements()");
	//alert(SongName);
	var songList = "";
	$.each(SongName, function(key, value) {
		var itemString = "";
		$.each(value, function(key, item) {
			itemString += item + "\t \t";
		});
		songList += itemString + '<br>';
	});
	$("#results").html(songList);
}

function getSong() {
	//alert("In getSong()");
	ajax = ajaxgetSong("getSong");
	ajax.done(getSongCallback);
	ajax.fail(function() {
		alert("Failure");
	});
}

function ajaxgetSong(method) {
	//alert("In ajaxgetSong()");
	return $.ajax({
		url : 'dbInsert.php',
		type : 'POST',
		data : {
			method : method
		}
	});
}

function getSongCallback(response_in) {
	//alert(response_in);
	var response = JSON.parse(response_in);
	SongName = response["SongName"];
	if (!response['success']) {
		$("#results").html("getSong() failed");
	} else {
		showSong(SongName);
	}
}

function getGenre() {
	//alert("In getGenre()");
	ajax = ajaxgetGenre("getGenre");
	ajax.done(getGenreCallback);
	ajax.fail(function() {
		alert("Failure");
	});
}

function ajaxgetGenre(method) {
	//alert("In ajaxgetGenre()");
	return $.ajax({
		url : 'dbInsert.php',
		type : 'POST',
		data : {
			method : method
		}
	});
}

function getGenreCallback(response_in) {
	//alert("In getGenreCallback()");
	//alert(response_in);
	response = JSON.parse(response_in);
	$Genre = response["Genre"];
	//alert($Genre);
	if (!response['success']) {
		alert('Failed in getGenreCallback');
		$("#results").html("getGenre failed");
	} else {
		$('#Genre').find('option').remove();
		//alert($Genre);
		$.each($Genre, function(key, columns) {
			$("#Genre").append($('<option>', {
				value : columns[0].toString(),
				text : columns[1].toString()
			}));
		});
	}
}