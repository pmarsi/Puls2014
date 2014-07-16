$(function(){
	var $form = $('#formulario');
	var $titulo = $('#titulo');
	var $url = $('#Link');
	var $primerPost = $('.item').first();
	var $lista = $('#contenido');

	function mostrarOcultarFormulario(){
		$form.slideToggle();
		return false;
	}

	function agregarPost(){
		var titulo = $titulo.val();//obtengo el valor de ese elemento
		var url = $url.val();
		var clone = $primerPost.clone();

		clone.find('.titulo_item a')
			.text(titulo)
			.attr('href', url)
			
		clone.hide()

		$lista.prepend(clone)
		clone.slideDown()



	}
	$('#publicar_nav a').click( mostrarOcultarFormulario )
	$('#formulario').on('submit', agregarPost)

});

