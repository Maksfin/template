$(document).ready(function() {

	if($('.popup').length) {
		Popup.init();
	}

	$('.form').on('submit', function(e) {
		e.preventDefault();

		var
			$this = $(this);

		if(validateThis($this)) {
			postFormData($this, function(data) {
				reqPopup = data.status ? '#success' : '#error';

				Popup.open(reqPopup);
			});
		}
		
		
	});

}); // --> end

// Модуль Попап
var Popup = (function() {
	var
		_popups = $('.popup');

	var _close = function() {
		_popups.hide();
	};

	return {
		init: function() {
			$('.popup__close, .popup__overlay').on('click', function(e) {
				e.preventDefault();

				_close();
			});
		},

		open: function(id) {
			var
				reqPopup = _popups.filter(id);

			_close();	
			reqPopup.fadeIn(300);
		}
	};
})();

// Устанавливаем маску ввода телефона
$(function(){
	$('.form__label-input[name="phone"]').mask("+7(999)999-99-99",{autoclear: false});
});

function postFormData(form, successFunction) {
	var
		host = form.attr('action'),
		reqFields = form.find('[name]'),
		dataObject = {};

	if(!host) {
		console.log('Set action attribute to ypur form!');
	}

	reqFields.each(function() {
		var
			$this = $(this),
			value = $this.val(),
			name = $this.attr('name');

		dataObject[name] = value;	
	})

	$.post(host, dataObject, successFunction);

}

// Проверка валидности формы
function validateThis(form) {
	var
		textType = form.find("[data-validation='text']"),
		mailType = form.find("[data-validation='mail']");
		phoneType = form.find("[data-validation='phone']");

	textType.each(function() {
		var
			$this = $(this),
			notEmptyField = !!$this.val();

		if(notEmptyField)	{
			$this.removeClass('error');
		}else {
			$this.addClass('error');
			$this.tooltip({
				content: 'Заполните обязательное поле',
				position: 'top'
			});
		}
	});
	phoneType.each(function() {
		var
			$this = $(this),
			notEmptyField = !!$this.val();

		if(notEmptyField)	{
			$this.removeClass('error');
		}else {
			$this.addClass('error');
			$this.tooltip({
				content: 'Введите телефон в заданном формате',
				position: 'left'
			});
		}	

	});

	mailType.each(function() {
		var
			$this = $(this),
			reqExp = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
			isMail = reqExp.test($this.val());

		if(isMail) {
			$this.removeClass('error');
		}else {
			$this.addClass('error');
			$this.tooltip({
				content: 'Введите правильную почту',
				position: 'bottom'
			});
		}	
	});

	return !(form.find('.error').length)

};

// Создает тултип
$.fn.tooltip = function(options) {

	this.each(function() {

		options = {
			position: options.position || 'right',
			content: options.content || 'Вы не заполнили поле'
		};


		var 
			markup = '<div class="tooltip tooltip_'+ options.position +'"> \
							<div class="tooltip__inner">'+ options.content + '</div> \
						</div>'

		var
			$this = $(this),
			body = $('body');

		$this
			.addClass('tooltipstered')
			.attr('data-tooltip-position', options.position);

		body.append(markup);	

		var 
			lastTooltip = body.find('.tooltip').last();

		_positionIt($this, lastTooltip, options.position);


		$(document).on('click', function() {
			$('.tooltip').remove();
			$('.tooltipstered').removeClass('error');
		});


		$(window).resize(function() {
			var
				tooltip = $('.tooltip'),
				tooltipsArray = [];

			tooltip.each(function() {
				tooltipsArray.push($(this));
			});

			$('.tooltipstered').each(function(index) {
				var
					position = $(this).data('tooltip-position');

				_positionIt($(this), tooltipsArray[index], position);	
			});
		});


		function _positionIt (elem, tooltip, position) {

			// измерим элемент
			var
				elemWidth = elem.outerWidth(true),
				elemHeight = elem.outerHeight(true),
				topEdge = elem.offset().top,
				bottomEdge = topEdge + elemHeight,
				leftEdge = elem.offset().left,
				rightEdge = leftEdge + elemWidth;

			// измеряем тултип
			var
				tooltipHeight = tooltip.outerHeight(true),
				tooltipWidht = tooltip.outerWidth(true),
				leftCentered = (elemWidth / 2) - (tooltipWidht / 2),
				topCentered = (elemHeight / 2) - (tooltipHeight / 2);

			
			var positions = {};

			switch (position) {
				case 'right' :
					positions = {
						left: rightEdge,
						top: topEdge + topCentered
					};
					break;
				case 'top' :
					positions = {
						left: leftEdge + leftCentered,
						top: topEdge - tooltipHeight
					};
					break;
				case 'bottom' :
					positions = {
						left: leftEdge + leftCentered,
						top: bottomEdge
					};
					break;
				case 'left': 
					positions = {
						left: leftEdge - tooltipWidht,
						top: topEdge + topCentered
					};
					break;	
			}

			tooltip
				.offset(positions);
		}

	});	
};

								