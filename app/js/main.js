$(document).ready(function() {

	if($('.popup').length) {
		Popup.init();
	}
	
	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	$('.form').on('submit', function(e) {
		e.preventDefault();
	});

	$('.slider').bxSlider({
	 	// controls: false,
	 	auto: true,
	 	autoHover: true,
	 	mode: 'fade',
	 	speed: 800,
 	});	

}); // --> end


// Модуль 
var Popup = (function() {
	var
		_popups = $('.popup');

	var _close = function() {
		_popups.hide();
	};

	return {
		init: function() {
			$('.').on('click', function(e) {
				e.preventDefault();
			});
		}
	};
})();
