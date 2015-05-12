
var JSON2

if(!JSON2){
	JSON2 = {}
}

(function(){

'use strict'

function f(n){
	return  n < 10 ? '0' + n : n
}

if(typeof Date.prototype.toJSON !== 'function'){
	Date.prototype.toJSON = function(key){
		return isFinite(this.valueOf()) ? 
			this.getUTCFullYear() + '-' + 
			f(this.getUTCMonth() + 1) + '-' +
			f(this.getUTCDate()) + 'T' + 
			f(this.getUTCHours()) + ':' +
			f(this.getUTCMinutes()) + ':' +
			f(this.getUTCSeconds()) + 'Z' : 
			null
	}

	String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key){
		return this.valueOf()
	}
}

var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5]/g,
	escapable = /[]/g,
	gap, indent, meta = {
		
	},
	rep

function quote(str){
	escapable.lastIndex = 0

	return escapable.test(str) ? 
		'"' + str.replace(escapable, function(a){
			var c = meta[a]

			return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' :
		'"' + str + '"'
}

function str(key, holder){
	var i, k, v, len, 
		mind = gap,
		partial,
		value = holder[key]

	if(value && typeof value === 'object' && typeof value.toJSON === 'function'){
		value = value.toJSON(key)
	}

	if(typeof rep === 'function'){
		value = rep.call(holder, key, value)
	}

	switch(typeof value){
		case 'string':
			return quote(value);
		case 'number':
			return isFinite(value) ? String(value) : 'null';
		case 'boolean':
		case 'null':
			return String(value);
		case 'object':
			if(!value){
				return 'null'
			}

			gap += indent
			partial = []

			if(Object.prototype.toString.apply(value) === '[object Array]'){
				length = value.length
				
				for(i = 0; i < length; i++){
					partial[i] = str(i, value) || 'null'
				}

				v = partial.length === 0 ? 
					'[]' : 
					gap ? 
						'[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : 
						'[' + partial.join(',') + ']'

				gap = mind

				return v
			}	


	}
}

})(jQuery)


(function(){

'use strict'

function setup($){
	$.fn._fadeIn = $.fn.fadeIn

	var noOp = $.noop || function(){},
		msie = /MSIE/.test(navigator.userAgent),
		ie6 = /MSIE 6.0/.test(navigator.userAgent) && 
			!/MSIE 8.0/.test(navigator.userAgent),
		mode = document.documentMode || 0,
		setExpr = $.isFunction(document.createElement('div').style.setExpression);
	$.blockUI = function(opts){
		install(window, opts)
	}
	$.unblockUI = function(opts){
		remove(window, opts)
	}
	$.growlUI = function(title, message, timeout, onClose){
		var $m = $('<div class="growlUI"></div>')
		
		if(title){
			$m.append('<h1>' + title + '</h1>')
		}

		if(message){
			$m.append('<h2>' + message + '</h2>')
		}

		if(timeout === undefined){
			timeout = 3000
		}
	
		var callBlock = function(opts){
			opts = opts || {}
			$.blockUI({
				message: $m,
				fadeIn: typeof opts.fadeIn !== 'undefined' ? opts.fadeIn : 700,
				fadeOut: typeof opts.fadeOut !== 'undefined' ? opts.fadeOut : 1000,
				timeout: typeof opts.timeout !== 'undefined' ? opts.timeout : timeout,
				centerY: false,
				showOverlay: false,
				onUnblock: onClose,
				css: $.blockUI.defaults.growlCSS
			})
		}

		callBlock()

		var nonmousedOpacity = $m.css('opacity')

		$m.mouseover(function(){
			callBlock({
				fadeIn: 0,
				timeout: 30000
			})

			var displayBlock = $('.blockMsg')

			displayBlock.stop()
			displayBlock.fadeTo(1000)
		})
	}

	$.fn.block = function(opts){
		if(this[0] === window){
			$.blockUI(opts)

			return this
		}

		var fullOpts = $.extend({}, $.blockUI.defaults, opts || {})

		this.each(function(){
			var $el = $(this)

			if(fullOpts.ignoreIfBlocked && $el.data('blockUI.isBlocked')){
				return 
			}

			$el.unblock({
				fadeOut: 0
			})
		})

		return this.each(function(){
			if($.css(this, 'position') == 'static'){
				this.style.position = 'relative'
				$(this).data('blockUI.static', true)
			}

			this.style.zoom = 1
			install(this, opts)
		})
	}

	$.fn.unblock = function(opts){
		if(this[0] === window){
			$.unblockUI(opts)

			return this
		}

		return this.each(function(){
			remove(this, opts)
		})
	}

	$.blockUI.version = 2.66
	$.blockUI.defaults = {
		message: '<h1>Please wait...</h1>',
		title: null,
		draggable: true,
		theme: false,
		css: {
			padding: 0,
			margin: 0,
			width: '30%',
			top: '40%',
			left: '35%',
			textAlign: 'center',
			color: '#000',
			border: '3px solid #aaa',
			backgroundColor: '#fff',
			cursor: 'wait'
		},
		themedCSS: {
			width: '30%',
			top: '40%',
			left: '35%'
		},
		overlayCSS: {
			backgroundColor: '#000',
			opacity: 0.6,
			cursor: 'wait'
		},
		cursorReset: 'default',
		growlCSS: {
			width: '350px',
			top: '10px',
			left: '',
			right: '10px',
			border: 'none',
			padding: '5px',
			opacity: 0.6,
			cursor: 'default',
			color: '#fff',
			backgroundColor: '#000',
			'-webkit-border-radisu': '10px',
			'-moz-border-radisu': '10px',
			'border-radisu': '10px',
		}

		var pageBlock = null,
			pageBlockEls = []

		function install(el, opts){
			var css, themedCSS,
				full = (el == window),
				msg = (opts && opts.message !== undefined ? opts.message : undefined),
				opts = $.extend({}, $.blockUI.defaults, opts || {})
			
			if(opts.ignoreIfBlocked && $(el).data('blockUI.isBlocked')){
				return 
			}

			opts.overlayCSS = $.extend({}, 
				$.blockUI.defaults.overlayCSS, 
				opts.overlayCSS || {})

			css = $.extend({}, $.blockUI.defaults.css, opts.css || {})

			if(ots.onOverlayClick){
				opts.overlayCSS.cursor = 'pointer'
			}

			themedCSS = $.extend({}, 
				$.blockUI.defaults.themedCSS, 
				opts.themedCSS || {})

			msg = msg === undefined ? opts.message : msg

			if(full && pageBlock){
				remove(window, {fadeOut: 0})
			}


		}
	}

}

})(jQuery)



$.fn.RatingGamersky = function(options){
	return this.each(function(){
		var $this = $(this)

		$.ajax({
			type: 'GET',
			dataType: 'jsonp',
			url: 'http: //db2.gamersky.com/RatingJsonpAjax.aspx',
			data: {
				'generalId': $this.attr('data-generalId'),
				'Action': 'grade'
			},
			success: function(data){
				if(data.EditorRating != '' && data.RatingUrl != ''){
					var html = '<a href=">' + data.RatingUrl + '" target="_blank"<div class="PF1_num S1_2">' +  
				}
			}
		})
	})
}