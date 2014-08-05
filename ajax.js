var base_url = "http://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat, lon){
	//dada una lat y una long yahoo nos da la informacion de ese lugar

	var query = "SELECT * FROM geo.placefinder WHERE text='"+lat+", "+lon+"'";
	query += "AND gflags='R'";
	query = encodeURIComponent(query);

	var opciones = {
		url : base_url + "q=" + query
		dataType = 'jsonp'
	}

	$.ajax(opciones);
}