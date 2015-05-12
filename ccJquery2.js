/*

2015-2-3 by hotaru

开始之前先讲一下 jQuery 1.11.1 源代码的代码风格，

1. function( a, b ){}， arr[ 1 ] 这样的括号中的参数前后都有一个空格，更美观但是占用屏幕空间较大

2. 正则表达式应用非常多，例如 rneedsContext，rsingleTag，都以 r开头且后面跟标准的小驼峰式命名

3. 用到非常之多的  a ? b : c， 且可能会嵌套很多次

4. 用到非常多的 || &&，且可能会嵌套很多次，代码难以阅读，但是减少了代码量，加快运行速度，所以遇到这样的情况，由于本人暂时能力有限......


BAT: 百度 阿里 腾讯 三大互联网巨头

正则表达式教程，非常详细，需要时间，BAT 面试必考
http://deerchao.net/tutorials/regex/regex.htm

*/

(function(global, factory){
	if(typeof module === 'object' && typeof module.exports === 'object'){
		module.exports = global.document ?
			factory(global, true) :
			function(w){
				if(!w.document){
					throw new Error('jQuery requires a window with a document')
				}

				return factory(w)
			}
	}else{
		factory(global)	
	}
}(typeof window !== 'undefined' ? window : this, function(window, noGlobal){
	
var deletedIds = [],
	slice = deletedIds.slice,
	concat = deletedIds.concat,
	push = deletedIds.push,
	indexOf = deletedIds.indexOf,
	class2type = {},
	toString = class2type.toString,
	hasOwn = class2type.hasOwnProperty,
	support = {},

	version = '1.11.1', // jquery版本咯

	jQuery = function(selector, context){
		// jquery 对象正好是初始化构造函数的增强型
		// 需要被初始化如果jQuery被调用了的话
		return new jQuery.fn.init(selector, context)
	},

	/*
	支持 安卓 < 4.1 , IE < 9
	确保我们去除 BOM 和 NBSP(&nbsp; 在HTML中表示空格)
	\s 表示匹配任意空白符
	^ 匹配字符串开始 
	$ 匹配字符串结束 
	+ 表示匹配次数一次或多次
	\uFEFF 其实是 Unicode空白分隔符，可以认作为空白符的一种
	\A0 具体应该也是空白符，解释在网上是一句英文，目测和拉丁问有关
	\xa0 is actually non-breaking space in Latin1 (ISO 8859-1), also chr(160)
	*/
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,  



	/* 
	匹配带有 ‘-’ 的字符串，使其可以转换为 驼峰型，例如 my-cc转换为 myCc，由于 原生js 在css设置的时候只能这样写
	
	div.style.backgroundColor = 'red'

	而在jQuery中的有的时候会写的不太规范

	$('div').css('background-color', 'red')

	这时候jQuery就帮你把这个不规范的地方给修正了，其他还有很多类似的例子
	*/
	rmsPrefix = /^-ms-/,


	// \d表示匹配所有数字 a-z表示匹配小写 a-z
	rdashAlpha = /-([\da-z])/gi,
	
	// 在 jQuery 中被用作 jQuery.camelCase 的回调函数，
	// 用来替换驼峰型的字母大小写
	fcamelCase = function(all, letter){
		return letter.toUpperCase()
	}


/*
source 89 - 172

重头戏之一，jQuery.fn = jQuery.prototype = {}, 
即所有的 .fn 拓展函数都是添加在jQuery的原型上面的
其实 .fn 只是 .prototype 的缩写，写起来比较简单罢了,
在写jQuery插件的时候经常见到的第一种形式
*/
jQuery.fn = jQuery.prototype = {
	// current version of jQuery being used
	jQuery: version,

	// 构造函数指向，原生JS的 Object对象的一个属性
	constructor: jQuery,

	selector: '',
	
	// 默认jQuery对象的长度为 0 
	length: 0,
	
	/* 
	.call() 这个是原生 JS 的高级用法，
	具体来说就是数组的slice方法强行用到 this上面去，不过具体原理我也不是特别清楚，类似的还有一个是 .apply() 

	BAT 面试必考 .call() 和 .apply()的区别和联系
	*/
	toArray: function(){
		return slice.call(this)
	},

	get: function(num){
	
	},

	pushStack: function(elems){
	
	},

	each: function(callback, args){
	
	},

	map: function(callback){
	
	},

	slice: function(){
	
	},
	
	// 这个最简单了，调用了内部的 .eq()
	first: function(){
		return this.eq(0)
	},
	
	/*
	具体为啥 -1 是跳出最后一个，就要看 .eq() 是怎么处理的了
	eq(i) 会判断 i 的值是否大于 0 ，如果小于0 返回 this.length
	正好 j = +i + this.length; 那么数组最后一个的下标正好也是 this.length - 1，
	所以 eq(-1) 就会返回数组中的最后一个了
	*/
	last: function(){
		return this.eq(-1)
	},

	eq: function(i){
		var len = this.length,
			j = +i + (i < 0 ? len : 0) 
		
		/* 
		后面这句用到的 pushStack， 
		其实jquery对象存储方式只是类似于数组，但并不是数组，
		这个有点难解释了，我也只是有个概念而已
		*/
		return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
	},

	end: function(){
		return this.prevObject || this.constructor(null)
	},
	
	// 最开始定义了 deletedIds = []， 所以这里直接使用原生JS数组对象的一些函数了
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
}


/* 
source 174 - 237

重头戏之二，jQuery内部使用的函数，jQuery.extend = jQuery.fn.extend = function(){}
同时所有的对jQuery对象的拓展也被拓展到了 jQuery 的原型下面去了，所以这里的函数对外开放，
可能会比较面熟
写jQuery插件经常见到的第二种形式，在jQuery对象上拓展插件
*/
jQuery.extend = jQuery.fn.extend = function(){
	
}

/*
source 239 - 563

重头戏之三， jquery.extend({})
jQuery的内置函数，即只在 jQuery内部使用的函数，
不对外开放，应该不太面熟，不过命名都是差不多的
*/
jQuery.extend({
	/* 
	上来就给每个页面上copy的jQuery做了一个不同的标记
	\D 用来匹配不是数字的字符，
	即expando最后会返回一个 jQuery12392813878的未知字符串
	*/
	expando: 'jQuery' + (version + Math.random()).replace(/\D/g, '')
	
	// 先假设 jQuery 已经加载完成了即使没有通过 jQuery 的 ready module
	isReady: true,
	
	/* 
	把错误抛出, 具体效果可以在 firebug 里测试一下，其实就是红色警告字体而已，这里的 msg 没有固定，说明以后会用到这个函数的
	*/
	error: function(msg){
		throw new Error(msg)
	},
	
	noop: function(){}, // 用处不明， noop（等待，空语句，等候）
	
	/* 
	这里有一个注释说明从 1.3 版本开始，jQuery不再封装简单的 alert() 之类的函数了
	*/
	
	// jQuery.type() 被封装了，做了一些兼容，返回一个对象的类型，在稍后可以找到的
	isFunction: function(obj){
		return jQuery.type(obj) === 'function'
	},

	isArray: Array.isArray || function(obj){
		return jQuery.type(obj) === 'array'
	},

	isWindow: function(obj){
		return obj!= null && obj == obj.window
	},
	
	// 不明
	isNumeric: function(obj){
		return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0
	},

	isEmptyObject: function(obj){
		var name
		
		for(name in obj){
			return false
		}

		return true
	},
	
	/*
	这个Plain的意思 平白无故的，具体可以百度一下，其实是说这个对象是自身的而不是通过继承而来的
	*/
	isPlainObject: function(obj){
		var key

		/* 
		参数必须是 Object 
		为了兼容 IE， 必须检查 构造函数的属性和方法
		确保这是 DOM 节点，然后不是 window 对象
		*/
		if(!obj || jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj)){
			return false
		}

		try{
			if(obj.constructor && 
				!hasOwn.call(obj, 'constructor') &&
				!hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')){
				return false
			}
		}catch(e){
			return false
		}

		// support IE < 9
		// 处理迭代继承下来的属性方法？
		if(support.ownLast){
			for(key in obj){
				return hasOwn.call(obj, key)
			}
		}

		for(key in obj){}

		return key === undefined || hasOwn.call(obj, key)
	},
	
	// 刚刚用到过了
	type: function(obj){
		if(obj == null){
			return obj + '' // 这里用到 js的强制转换字符串了，一个小技巧
		}
		
		/*
		判断obj 的type 是否为 object 或者 obj 的type是function?，
		是就把 typeof obj 转成字符串返回，不是则直接返回 typeof obj
		*/
		return typeof obj === 'object' || typeof obj === 'function' ?
			class2type[toString.call(obj)] || 'object' :
			typeof obj
	},
	
	// 用处不明
	globalEval: function(){
		if(data && jQuery.trim(data)){
			(window.execScript || function(data){
				window['eval'].call(window, data)
			})()
		}
	},

	// 用于 my-cc 转 myCc的驼峰法，以便原生 js 的调用
	camelCase: function(){
		return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase)
	},
	
	/*
	用于返回 jQuery对象的节点名字，例如 $('div') 返回 'div', $('ul li') 返回 'li'，只在内部使用
	*/
	nodeName: function(elem, name){
		return elem.nodeName && 
			elem.nodeName.toLowerCase() === name.toLowerCase()
	},
	
	// 不明
	each: function(obj, callback, args){
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike(obj)

		if(args){
			if(isArray){
				for(; i < length; i++){
					value = callback.apply(obj[i], args)

					if(value === false){
						break
					}
				}
			}else{
				for(i in obj){
					value = callback.apply(obj[i], args)

					if(value === false){
						break
					}
				}
			}
		}else{
			if(isArray){
				for(; i < length; i++){
					value = callback.call(obj[i], i, obj[i])

					if(value === false){
						break
					}
				}
			}else{
				for(i in obj){
					value = callback.call(obj[i], i, obj[i])

					if(value === false){
						break
					}
				}
			}
		}

		return obj
	},
	
	// 简单，出去字符串前后空格
	trim: function(text){
		return text == null ? 
			'' :
			(text + '').replace(rtrim, '') 
			// 这个技巧很常见，强制转换 text 为字符串
	},
	
	/*
	把两个数组合并，如果第二个参数不存在，就新建一个数组，把第一个参数的数组push到这个新的数组里并且返回
	*/
	makeArray: function(arr, results){
		var ret = results || []

		if(arr != null){
			if(isArraylike(Object(arr))){
				jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr)
			}else{
				push.call(ret, arr)
			}
		}

		return ret
	},
	
	inArray: function(elem, arr, i){
		var len

		if(arr){
			if(indexOf){
				return indexOf.call(arr, elem, i)
			}

			len = arr.length
			i = i ? (i < 0 ? Math.max(0, len + i) : i ) : 0

			for(; i < len; i++){
				if(i in arr && arr[i] === elem){
					return i
				}
			}
		}

		return -1
	},
	
	// merge(合并)，把第二个数组添加到第一个数组末尾后面
	merge: function(first, second){
		var len = +second.length,	
			j = 0,
			i = first.length
		
		while(j < len){
			first[i++] = second[j++] 
			// 即把 second这个数组的元素一个个添加到first数组中去
		}
		
		// 修复一个 IE678 的bug， 具体不明
		if(len !== len){
			while(second[j] !== undefined){
				first[i++] = second[j++]
			}
		}

		first.length = i // 这句好像略多余

		return first
	},
	
	// grep(在字符串中查找), invert(反转)
	grep: function(elems, callback, invert){
		var callbackInverse, 
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert // expect（期望）

		// 遍历数组，只保留通过条件的元素
		for(; i < length; i++){
			callbackInverse = !callback(elems[i], i)

			if(callbackInverse !== callbackExpect){
				matches.push(elems[o])
			}
		}

		return matches
	},

	map: function(elems, callback, arg){
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike(elems),
			ret = []
		
		/*
		遍历数组，把每个元素都进行转化成新的值，如果只是类数组的对象，那么也执行这个方法，只是条件改变而已
		*/
		if(isArray){
			for(; i < length; i++){
				value = callback(elems[i], i, arg)

				if(value != null){
					ret.push(value)
				}
			}
		}else{
			for(i in elems){
				value = callback(elems[i], i, arg)

				if(value != null){
					ret.push(value)
				}
			}
		}

		// flatten any nested arrays, 把内嵌的数组都展开
		/*
			var a = [1,2,3],
				b = [4,5,6]

			var c = [].concat.apply(a, b)
			alert(c) // [1,2,3,4,5,6]
		*/
		return concat.apply([], ret)
	},
	
	// guid(标示符)
	guid: 1,
	
	// proxy(委托), context(上下文，执行环境)
	proxy: function(fn, context){
		var args, proxy, tmp
		
		if(typeof context === 'string'){
			tmp = fn[context]
			context = fn
			fn = tmp
		}

		if(!jQuery.isFunction(fn)){
			return undefined
		}

		// 模拟绑定
		args = slice.call(arguments, 2)
		proxy = function(){
			return fn.apply(context || this, args.concat(slice.call(arguments)))
		}

		proxy.guid = fn.guid = fn.guid || jQuery.guid++

		return proxy
	},	
	
	// 返回当前时间
	now: function(){
		return +(new Date())
		// 又是一个强制转换格式的技巧，这次是转换为数字
		/*
		var a = '1'
		alert(typeof a) // string
		a = +a
		alert(typeof a) // number
		*/
	},
	
	// 这个support在 jquery核心中并不用，但是其他部分会需要用到
	support: support
})


// 填充 class2type 映射
jQuery.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function(i, name){
	class2type['[object ' + name + ']'] = name.toLowerCase()
})


// jQuery里面封装的一个判断是否是类似数组的函数
function isArraylike(obj){
	var length = obj.length,
		type = jQuery.type(obj)

	if(type === 'function' || jQuery.isWindow(obj)){
		return false
	}

	if(obj.nodeType === 1 && length){
		return true
	}

	return type === 'array' || 
		length === 0 ||
		typeof length === 'number' && 
		length > 0 && 
		(length - 1) in obj
}


/* 
source 587 - 2622

重头戏之四，Sizzle选择器， jQuery选择器的真面目，其实是用了 Sizzle.js 
这个号称全宇宙速度最快的DOM选择器，具体实现原理可百度
*/
var Sizzle = (function(window){

	// code here.....

	return Sizzle;
})(window)

/* 
这段代码可以看出jQuery里面用到了不少 Sizzle 写好的函数，
所以其实jQuery后期是由很多人的努力才写出来的，一个jQuery的代码风格也有很多细节不太一样的
*/
jQuery.find = Sizzle
jQuery.expr = Sizzle.selectors
jQuery.expr[':'] = jQuery.expr.pseudos
jQuery.unique = Sizzle.uniqueSort
jQuery.text = Sizzle.getText
jQuery.isXMLDoc = Sizzle.isXML
jQuery.contains = Sizzle.contains

var rneedsContext = jQuery.expr.match.neesContext,
	
	// 匹配单个的tag， 例如<br />, <hr /> 之类的
	rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>)$/), 

	risSimple = /^.[^:#\[\.,]*$/


// 实现功能相同的函数，用于 filter（过滤） 和 not
function winnow(elements, qualifier, not){

}

jQuery.filter = function(expr, elems, not){

}

jQuery.fn.extend = ({
	find: function(selector){
	
	},

	filter: function(selector){
	
	},

	not: function(selector){
	
	},
	
	is: function(selector){
	
	}
})


/* 
source 2739 - 2858

初始化一个jQuery对象
*/

// 一个 root jQuery 核心应用
var rootjQeury,
	
	document = window.document,

	rquickExpr = //,

	init = jQuery.fn.init = function(selector, context){
	
	}

init.prototype = jQuery.fn

rootjQuery = jQuery(document)

var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	}

/* 
jQuery里面设置的选择器另一种写法

$('a').dir()
	.sibling()
*/
jQuery.extend({
	dir: function(elem, dir, until){
	
	},

	sibling: function(n, elem){
	
	}
})

// jQuery对象选择器的拓展
jQuery.fn.extend({
	has: function(target){
		
	},

	closest: function(selectors, context){
	
	},

	index: function(elem){
	
	},

	add: function(selector, context){
	
	},

	addBack: function(selector){
	
	}
})

function sibling(cur, dir){

}

// 把选择器添加到jquery对象中
jQuery.each({
	parent: function(elem){
	
	},

	parents: function(elem){
	
	},

	parentsUntil: function(elem, i, until){
	
	},

	next: function(elem){
	
	},

	prev: function(elem){
	
	},

	nextAll: function(elem){
	
	},

	prevAll: function(elem){
	
	},

	nextUntil: function(elem, i, until){
	
	},

	prevUntil: function(elem, i, until){
	
	},

	siblings: function(elem){
	
	},

	children: function(elem){
	
	},
	
	// content(内容)， 就是 <a>hello</a> 中的 'hello'
	contents: function(elem){
	
	}
}, function(name, fn){
	jQuery.fn[name] = function(until, selector){
		
	}
})

// 匹配非空白符一次或多次，其实就是用来确认这个字符串不是空的或者只是空格
// 例如 '' 或 '     '
var rnotwhite = (/\S+/g)

// 字符串到对象转换时的 格式缓存
var optionsCache = {}

// 转换字符串格式的选项到对象格式一次，并且存到缓存中
function createOptions(options){

}

jQuery.Callbacks = function(options){

}


// jQuery中设置的延迟，貌似用在 DOM ready 中的？
jQuery.extend({
	Deferred: function(func){
	
	},
	
	// Deferred helper
	// subordinate(下属)
	when: function(subordinate){
	
	}
})

// 延迟被用在 DOM ready 中， 不明
var readyList

jQuery.fn.ready = function(fn){
	jQuery.ready.promise().done(fn)
	
	return this
}

jQuery.extend({
	isReady: false,

	readyWait: 1,

	holdReady: function(hold){
	
	},
	
	// handle(处理) when the DOM is ready	
	ready: function(wait){
	
	}
})

/*
用来清除为了知道 DOM 已经 ready 所用的方法, detach(分离)
又是经典的 IE678 事件解除绑定兼容
*/
function detach(){
	if(document.addEventListener){
		document.removeEventListener('DOMContentLoaded', completed, false)
		window.removeEventListener('load', completed, false)
	}else{
		document.detachEvent('onreadystatechange', completed)
		window.detachEvent('onload', completed)
	}
}

/*
清除 ready event 处理，清除所用的方法
*/
function completed(){
	if(document.addEventListener || event.type === 'load' || document.readyState === 'complete'){
		detach()
		jQuery.ready()
	}
}
	
// 这里又兼容了一大堆IE问题
jQuery.ready.promise = function(obj){

}

// 在上面出现过了，后面还要用到，其实就是字符串 'undefined'
var strundefined = typeof undefined 


// 兼容 IE9， 作用不明
var i
for(i in jQuery(support)){
	break
}
support.ownLast = i !== '0'

// 不明
support.inlineBlockNeedsLayout = false

/*
source 3558 - 3592

这里为了兼容IE678的各种 css 没有 haslayout的 bug，
先为 body 添加了一个DIV来触发 IE678的haslayout了，
处理完成之后又把这个 DIV 给去掉了

注释原文：  Execute ASAP in case we need to set body.style.zoom

BAT 面试加分项
*/
jQuery(function(){
	var val, div, body, container
	
	// 获取 body，如果没有 body就直接返回咯
	body = document.getElementsByTagName('body')[0]
	
	if(!body || body.stype){
		return 
	}

	//设置DIV，经典的触发 IE haslayout 的方法
	div = document.createElement('div')
	container = document.createElement('div')
	container.style.cssText = 'position:absolute;border:0;width:0;height:0;top:;left:-9999px'
	body.appendChild(container).appendChild(div)
	// 原生 JS 的添加子节点

	if(typeof div.style.zoom !== strundefined){
		// 支持IE < 8
		div.style.cssText = 'display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1'

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3
		if(val){
			body.style.zoom = 1
		}
	}
	
	body.removeChild(container) // 用完就丢，真是醉了
})

// 用于兼容 IE < 9的, 原理不明
(function(){
	var div = document.createElement('div')

	if(support.deleteExpando == null){
		// Support: IE<9
		support.deleteExpando = true
		
		try{
			delete div.test
		}catch(e){
			support.deleteExpando = false
		}
	}

	div = null
})()

// 用于检验 DOM对象有没有 data 属性， html5 中的 data-
jQuery.acceptData = function(elem){
	var noData = jQuery.noData[(elem.nodeName + '').toLowerCase()],
		nodeType = +elem.nodeType || 1 // 格式转换为数字
	
	// nodeType 是 DOM 元素的一个隐藏属性， 1是DOM节点， 9好像是注释节点
	return nodeType !== 1 && nodeType !== 9 ?
		false:
		!noData || noData !== true && elem.getAttribute('classid') === noData
}

// brace(大括号)  \{，\[，\] 转义符 
// multi(多个的)，dash(破折号)
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g









/*
source 3959 - 4096

重头戏之五，.css(), .animate()到来， 其中 .animate()用到的 队列原理是个大头，处理动画执行顺序
*/









/* 
source 4271 - 5271 

重头戏之六 jQuery.event = {}, jQuery的事件机制大部分都在这儿了
*/





/*
source 6000 - 

jQuery css 详细处理在这里可以找到
*/
var iframe,
	elemdisplay = {}

function actualDisplay(name, doc){

}

function defaultDisplay(nodeName){

}

(function(){

})()

var rmargin = (/^margin/), //匹配以 margin 开头
	
	rnumonpx = new RegExp('^(' + pnum + ')(?!px)[a-z%]+$', 'i'), 
	// 匹配字符串结尾是否不存在 px，这里通过新建 RegExp对象来创建正则

	getStyles, curCSS,

	rposition = /^(top|right|bottom|left)$/  
	// 匹配 top 或 right 或 bottom 或 left 这四个字符串

if(window.getComputedStyle){
	
}else if(document.documentElement.currentStyle){

}

function addGetHookIf(conditionFn, hookFn){

}

(function(){

})()

/*
一个方法，用来快速交换 当前 css 和 准备的 css，使其得到正确的结果，目测用到 toggle 比较多
*/
jQuery.swap = function(elem, options, callback, args){

}

// 一大堆正则
var 

/*
不明
return a css property mapped to a potentially vendor prefixed property
*/
function vendorPropName(style, name){

}

function showHide(elements, show){

}

function setPositiveNumber(elem, value, substruct){

}

// augment(增大)
function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles){

}

function getWidthOrHeight(elem, name, extra){

}
// 这里到 6596 行位置





/*
source 8471 - 8544 

jQuery处理JSON 和XML 所封装的 $.parseJSON() 和 $.parseXML() 就在这儿，
其实是把 表单查询语句 转换为 JSON格式或 XML格式 ，
查询语句就是 url 后面的 ?a=1&&b=2 这样的东西
*/ 
var nonce = jQuery.now(), 
	// 返回当前 new Date()，是一个数字，从1970到现在的秒数
	
	rquery = (/\?/), 
	// url从 ? 开始的后面的字符串

	rvalidtokens = /  /g

jQuery.parseJSON = function(data){
	if(window.JSON && window.JSON.parse){
		return window.JSON.parse(data + '')
	}

	var requireNonComma, // comma(逗号)
		depth = null,
		str = jQuery.trim(data + '')

	return str && !jQuery.trim(str.replace(rvalidtokens, function(token, comma, open, close){
		if(requireNonComma && comma){
			depth = 0
		}

		if(depth === 0){
			return token
		}

		requireNonComma = open || comma

		depth += !close - !open

		return ''
	})) ? 
		(Function('return ' + str))() :
		jQuery.error('Invalid JOSN: ' + data) 
		// jQuery.error在最开始就已经定义了， throw new Error(msg)
}

jQuery.parseXML = function(data){
	var xml, tmp

	if(!data || typeof data !== 'string'){
		return null
	}

	try{
		if(window.DOMParser){
			tmp = new DOMParser()
			xml = tmp.parseFromString(data, 'text/xml')
		}else{
			// IE
			xml = new ActiveXObject('Microsoft.XMLDOM')
			xml.async = 'false'
			xml.loadXML(data)	
		}
	}catch(e){
		xml = undefined
	}

	if(!xml || !ml.documentElement || xml.getElementsByTagName('parsererror').length){
		jQuery.error('Invalid XML: ' + data)
	}
}








/*
source 8547 - 9899

重头戏之七，$.ajax， jQuery非常重要的 ajax 模块从这儿开始,
封装各种原生js的 ajax操作，并且对浏览器兼容做了最大限度处理
*/












/*
source 9904 - 9932

$.parseHTML() 不知道为什么不和 parseJSON, parseXML放一起，接受三个参数
data: html字符串
context(可填可不填): 如果有必要，会新建一个 iframe 来实现
keepScripts(可填可不填): 是布尔值，如果为 true, script标签的内容会被过滤不使用
*/
jQuery.parseHTML = function(data, context, keepScripts){
	// 如果 data 没有给定或者 data 不是字符串，直接返回 null
	if(!data || typeof data !== 'string'){
		return null
	}

	if(typeof context === 'boolean'){
		keepScripts = context
		context = false
	}

	context = context || document

	var parsed = rsingleTag.exec(data),
		scripts = !keepScripts && []

	// single tag 例如 <br /> <img>
	if(parsed){
		return [context.createElement(parsed[1])]
	}

	parsed = jQuery.buildFragment([data], context, scripts)

	if(scripts && scripts.length){
		jQuery(scripts).remove()
	}
		
	return jQuery.merge([], parsed.childNodes)
}


/*
source 9935 - 9996

jQuery的 $(document).ready(function(){}，
针对不同浏览器对 ECMAScript的 DOMContentLoaded 支持，
保证了最大限度了 DOM 加载完成才执行JS
*/
var _load = jQuery.fn.load

// params(参数个数)
jQuery.fn.load = function(url, params, callback){

}







jQuery.fn.size = function(){
	return this.length
}

jQuery.fn.andSelf = jQuery.fn.addBack

/*
source 10270 - 10286

对于 $ 符号被其他的框架例如 prototype.js之类的公共的时候，做出的让步
*/

/* 
方便amd加载，在jQuery最开始也有提到的,不过对于 AMD 和 CMD我知道的不是很多，好像是模块加载规范还是啥的？
*/
if(typeof define === 'function' && define.amd){
	define('jquery', [], function(){
		return jQuery
	})
}

/* 
如果在全局变量中 jQuery， $ 这两个变量名被占用了，
就使用 _jQuery， _$ 来代替 
*/
var _jQuery = window.jQuery,

	_$ = window.$

jQuery.noConflict = function(deep){
	if(window.$ === jQuery){
		window.$ = _$
	}

	if(deep && window.jQuery === jQuery){
		window.jQuery = _jQuery
	}

	return jQuery
}

/* 
这里这句的作用看不懂
在源代码 638 行
strundefined = typeof undefined 
其实 strundefined 就是字符串形式的 'undefined' 

alert(typeof (typeof undefined)) 返回就是 string
*/
if(typeof noGlobal === strundefined){
	window.jQuery = window.$ = jQuery
}


// 最后的最后返回 jQuery对象, 
return jQuery

}))

// 以上就是 jQuery 的框架分析了，虽然只是最初步的结构分析，里面很多的兼容和处理都没有详细解释，这只是第一步