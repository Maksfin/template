$(document).ready(function() {

	if($('.popup').length) {
		Popup.init();
	}

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