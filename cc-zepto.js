


(function($){
	
var _zid = 1,
	undefined,
	slice = Array.prototype.slice,
	isFunction = $.isFunction,
	isString = function(obj){
		return typeof obj == 'string'
	},
	handlers = {},
	specialEvents = {},
	focusinSupported = 'onfocusin' in window,
	focus = {
		focus: 'focusin',
		blur: 'focusout'
	},
	hover = {
		mouseenter: 'mouseover',
		mouseleave: 'mouseout'
	}

specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvent

function zid(ele){
	return ele._zid || (ele._zid = _zid++)
}

function findHandlers(ele, ev, fn, selector){
	ev = parse(ev)

	if(ev.ns){
		var matcher = matcherFor(ev.ns)
	}

	return (handlers[zid(ele)] || []).filter(function(handler){
		return handler && 
			(!ev.e || handler.e == ev.e) && 
			(!ev.ns || matcher.test(handler.ns)) && 
			(!fn || zid(handler.fn) === zid(fn)) &&
			(!selector || handler.sel == selector)
	}) 

	function parse(ev){
		var parts = ('' + event).split('.')

		return {
			e: parts[0],
			ns: parts.slice(1).sort().join(' ')
		}
	}

	function matcherFor(ns){
		return new RegExp('')
	}

	function eventCapture(){
		return handler.del && 
			(!focusinSupported && (handler.e in focus)) ||
			!!captureSetting
	}

	function remove(el, events, fn, selector, capture){
		var id = zid(el)

		(events || '').split(/\s/).forEach(function(event){
			findHandlers(el, event, fn, selector).forEach(function(handler){
				delete handlers[is][handler.i]

				if('removeEventListener' in el){
					el.removeEventListener(realEvent(handler.e), handler.proxy,		eventCapture(handler, capture))
				}
			})
		})
	}	

	$.event = {
		add: add,
		remove: remove
	}

	$.proxy = function(fn, context){
		var args = (2 in arguments) && slice.call(arguments, 2)

		if(isFunction(fn)){
			var proxyFn = function(){
				return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments)
			}

			proxyFn._zid = zid(fn)

			return proxyFn
		}else if(isString(context)){
			if(args){
				args.unshift(fn[context], fn)
				
				return $.proxy.apply(null, args)
			}else{
				return $.proxy(fn[context], fn)
			}
		}else{
			throw new TypeError('expected function')
		}
	}
	
	$.fn.bind = function(event, data, callback){
		return this.on(event, data, callback)
	}

	$.fn.unbind = function(event, callback){
		return this.off(event, callback)
	}

	$.fn.one = function(event, selector, data, callback){
		return this.on(event, selector, data, callback, 1)
	}

	var returnTrue = function(){
			return true
		},

		returnFalse = function(){
			return false
		},

		ignoreProperties = /^[A-Z]|returnValue$|layer[XY]$/,
		
		eventMethods = {
			preventDefault: 'isDefaultPrevented',
			stopImmediatePropagation: 'isImmediatePropagationStopped',
			stopPropagation: 'isPropagationStopped'
		}

	function compatible(ev, source){
	
	}

		




}











})(Zepto)
