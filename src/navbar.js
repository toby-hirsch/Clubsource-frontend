import $ from 'jquery';

$(window).on('load', function(){
	$('#navdrop').click(function(){
		$('#closewrap').fadeIn(200);
		$('#fullnav').fadeIn(200);
	});
	$('#closewrap').hover(function(){
		$('#closebtn').css('border-color', 'hsl(0, 0%, 60%)');
	}, function(){
		$('#closebtn').css('border-color', 'hsl(0, 0%, 70%)');
	});
	
	$('#closewrap').click(function(){
		$('#fullnav').fadeOut(200);
		$(this).fadeOut(200);
	});
});