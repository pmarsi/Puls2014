//todas las llamadsa a yql se hace a una misma url, lo unico que cambia son los parametros
//se pone el simbolo de pregunta porque siempre le vamos a pasar parametros
var base_url = "http://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat, lon){
	//dada una lat y una long yahoo nos da la informacion de ese lugar.
	//pasamos lat y lon como parametros de la funcion que estamos llamando
	//dame toda la informacion de esta tabla
	var query = "SELECT * FROM geo.placefinder WHERE text='"+lat+", "+lon+"'";
	query += "AND gflags='R'";//es para que el tipo de info no este limitada a un unico tipo de informacion, nos daria todo
	//codifica la cadena de texto para que se pueda utilizar sin problemas en la url
	//reemplaza los espacios por caracteres
	query = encodeURIComponent(query);

	//ahora procedemos a hacer la consulta mediante $.ajax(), recibe un solo parametro
	//dicho parametro es un objeto, ese objeto lo guardamos en una variable llamada opciones
	var opciones = {
		url : base_url + "q=" + query,
		dataType : 'jsonp',
		//nos aseguramos que la respuesta qque se recibe se procesa mediante una funcion
		//que esta dentro del codigo
		jsonpCallback : "geocallback",
		data: {
			format: "json"
		}
	}

	$.ajax(opciones);
}

function geocallback(datos){
	//yahoo tiene una variable llamada woeid el cual es un numero unico para ser usado
	var info = datos.query.results.Result;
	var pais = info.country;
	var ciudad = info.city;
	var postal = info.postal;
	var woeid = info.woeid;

	var tmp = "<p><strong>"+postal+"</strong><br>"+ciudad+", "+pais+" ("+woeid+")</p>";
	$("#geo").prepend(tmp);

	obtenerClima(woeid);
}

function obtenerClima(woeid){
	var query = "SELECT * FROM weather.forecast WHERE woeid='"+woeid+"'";
	query += " AND u='c'";
	query = encodeURIComponent(query);
	//modificamos la query para que nos de la info como queramos
	var opciones = {
		url : base_url + "q=" + query,
		dataType : 'jsonp',
		jsonpCallback : "climacallback",
		data: {
			format: "json"
		}
	}

	$.ajax(opciones);

}

function climacallback(datos){
	var clima = datos.query.results.channel;
	var temp = clima.item.condition.temp;
	var unit = clima.units.temperature;
	var code = clima.item.condition.code;
	var img = new Image();
	img.src = "http://l.yimg.com/a/i/us/we/52/"+code+".gif";
	$("#clima").html('<strong>'+temp+'</strong> '+unit+'º');
	$("#clima").prepend(img);
}