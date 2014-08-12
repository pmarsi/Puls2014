$(function()
{
	//vamos a crear una variable que nos permita realizar geolocalizacion
	var geo = navigator.geolocation;

	function geo_exito(position){
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;

		console.log(position.coords.accuracy);

		//vamos a crear un tipo especial de objeto
		var mapa = new Image(); //es un objeto de tipo image
		mapa.src = "http://maps.googleapis.com/maps/api/staticmap?center="+lat+","+lon+"&zoom=16&size=250x200&sensor=false&maptype=satellite";

		$('#geo').append(mapa);

		obtenerGeoInformacion(lat, lon);
	}

	function geo_error(){
		console.log("no se donde estas.");
	}
	geo.getCurrentPosition(geo_exito, geo_error, {
		enableHighAccuracy: true, //si hay info mas certera usa esa info
		timeout: 5000, //si pasados 5000 ms no has conseguido mejor informacion devuelve un error (geo_error)
		maximumAge: 0 //si ya hay info actual mas vieja que x segundos utilizarla, en este caso dame siempre una nueva
	});


	//pide la ubicacion actual
	//watchcurrentposition chequea constantemente la posicion


	//esta variable es igual al selector que se referencia mediante el id
	var $form = $('#formulario');
	var $titulo = $('#titulo');
	var $url = $('#link');
	var $primerPost = $('.item').first(); //hace referencia al primer item, clona el primer item
	//modificara una variable, la variable form
	var $lista = $('#contenido');
	var ss = sessionStorage;
	var ls = localStorage;

	if (ls.getItem('autosave'))
	{
		$titulo.val(ss.getItem('titulo'));
		$url.val(ss.getItem('url'));
	}
	
	var id = setInterval(function(){
		ss.setItem('titulo', $titulo.val());
		ss.setItem('url', $url.val())
		} ,1000);
	//Funcion que permite mostrar u ocultar el formulario
	function mostrarOcultarFormulario()
	{
		//también se encarga de que el evento no prosiga.

		//mira si esta visible, si no lo muestra y si esta visible lo oculta.
		$form.slideToggle(); //recuerda el estado
		$lista.slideToggle();
		
	}

	//interaccion con el fomulario

	function agregarPost(e)
	{
		//evita la accion por defecto del evento en cuestion
		e.preventDefault();
		//coge la informacion de los inputs
		var titulo = $titulo.val();
		var url = $url.val();

		//ahora vamos a clonar, clono un article para luego ir añadiendo
		//genera una replica de lo que clonamos. luego asignaremos propiedades
		var clone = $primerPost.clone();

		clone.find('.titulo_item a')
			.text(titulo)
			.attr('href', url) //para referencia href se hace mediante el atributo y le asignamos el valor con la variable url
		
		clone.hide()
		//agregar un elemento delante de todos
		$lista.prepend(clone);
		//$lista.append(clone); lo coloca al final de la lista
		mostrarOcultarFormulario();
		$titulo.val('');
		$url.val('');
		clone.fadeIn();

	}
	//añadimos la funcionalidad de localstorage y sessionstorage
	function grabarInformacion(e){
		e.preventDefault();
		//coge la informacion de los inputs
		var titulo = $titulo.val();
		var url = $url.val();

		//uso de localstorage y sessionstorage
		var ls = localStorage; //es un objeto javascript disponible en todos los contextos
		var ss = sessionStorage;

		ls.setItem('titulo', titulo);
		ls.setItem('url', url);

		ss.setItem('titulo', titulo);
		ss.setItem('url', url);

		mostrarOcultarFormulario();
		$titulo.val('');
		$url.val('');
	}

	$('#publicar_nav a').click(mostrarOcultarFormulario);
	//tenemos que escuchar el evento de submit, no se activa si el formualario no es valido
	$('#formulario').on('submit', agregarPost);

	loadLogos();
	loadUser();

});

