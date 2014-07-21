

$(function()
{

	//esta variable es igual al selector que se referencia mediante el id
	var $form = $('#formulario');
	var $titulo = $('#titulo');
	var $url = $('#link');
	var $primerPost = $('.item').first(); //hace referencia al primer item, clona el primer item
	//modificara una variable, la variable form
	var $lista = $('#contenido');
	
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
	$('#publicar_nav a').click(mostrarOcultarFormulario);
	//tenemos que escuchar el evento de submit, no se activa si el formualario no es valido
	$('#formulario').on('submit', agregarPost);

});

