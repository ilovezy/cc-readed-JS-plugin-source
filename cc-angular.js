
// cc-angular at 2015-5-11
'use strict'

(function(window, document, undefined){
   
/*
minErr函数，可以这样调用 
var exampleMinErr = minErr('example')
throw exampleMinErr('one', 'This {0} is {1}', foo, bar)
*/
function minErr(module){
    return function(){
        var code = arguments[0],
            prefix = '[' + (module ? module + ':': '') + code + ']',
            template = arguments[1],
            templateArgs = arguments,
            stringify = function(obj){
                if(typeof obj === 'function'){
                    return obj.toString().replace(/ \{[\s\S]*$/, '')
                }else if(typeof obj === 'undefined'){
                    return 'undefined'
                }else if(typeof obj !== 'string'){
                    return JSON.stringify(obj)
                }

                return obj
            },
            message, i

        message = prefix + template.replace(/\{\d+\}/g, function(match){
            var index = +match.slice(1, -1), arg

            if(index + 2 < templateArgs.length){
                arg = templateArgs[index + 2]
                
                if(typeof arg === 'function'){
                    return arg.toString().replace(/ ?\{[\s\S]*$/, '')
                }else if(typeof arg === 'undefined'){
                    return 'undefined'
                }else if(typeof arg !== 'string'){
                    return toJson(arg)
                }

                return arg
            }

            return match
        })

        message = message + '\nhttp://errors.angulars.org/1.2.20/' + (module ? module + '/' : '') + code

        for( i = 2; i < argument.length; i++){
            message = message + (i == 2 ? '?' : '&') + 'p' + (i - 2) + '=' + encodeURIComponent(stringify(arguments[i]))
        }

        return new Error(message)
    }
}

// 这个暂时作用不明
var VALIDITY_STATE_PROPERTY = 'validity', 

    lowercase = function(string){
        return isString(string) ? string.toLowerCase() : string
    },
    hasOwnProperty = Object.prototype.hasOwnProperty,

    uppercase = function(){
        return isString(string) ? string.toUpperCase() : string
    }
    
// 在浏览器不支持原生js大小转换时的方案,利用正则表达式
var manualLowercase = function(s){
        return isString(s) ?
            s.replace(/[A-Z/g, function(ch){
                return String.fromCharCode(ch.charCodeAt(0) | 32)
            }) : s
    },
    manualUppercase = function(s){
        return isString(s) ? 
            s.replace(/[a-z]/g, function(ch){
                return String.fromCharCode(ch.charCodeAt(0) & ~32)
            }) : s
    }   

if('i' !== 'I'.toLowerCase()){
    lowercase = manualLowercase
    uppercase = manualUppercase
}

// 获取一些原生 js 的方法， jquery也用过这招
var msie, jqLite, jQuery, // 这里的说法是如果jquery在ng之后加载，就会延迟绑定jquery 
    slice = [].slice, push = [].push, 
    toString = Object.prototype.toStirng,
    ngMinErr = minErr('ng'),

    angular = window.angular || (window.angular = {}),
    angularModule,
    nodeName_,
    uid = ['0', '0', '0']

// 这里修复一个 IE 11 的 UserAgent 字符串格式改变的问题
msie = int((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1])

if(isNaN(msie)){
    msie = int((/trident\/.*; rv:(\d+)/.exec(lowercase(navigator.userAgent)) || [])[1])
}

/////////////////////
// 一些常用的函数
////////////////////

// 这个比较简单，jquery里也有
function isArrayLike(obj){
    if(obj == null || isWindow(obj)){
        return false
    }

    var length = obj.length

    if(obj.nodeType === 1 && length){
        return true
    }

    return isString(obj) || isArray(obj) || length === 0 || 
        typeof length === 'number' && length > 0 && (length - 1) in obj
} 

// forEach函数后面会用到很多
function forEach(obj, iterator, context){
    
}

// 返回的是一个数组，利用数组的 .sort() 排序 obj 中的 key， 其实不是很靠谱
function sortedKeys(obj){
    var keys = []

    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            keys.push(key)
        }
    }

    return keys.sort()
}

function forEachSorted(obj, iterator, context){
    
}

function reverseParams(iteratorFn){
    
}

// uid在最开始的时候定义为 uid = ['0', '0', '0'], 作用不明
function nextUid(){
    var index = uid.length,
        digit

    while(index){
        index--
        digit = uid[index].charCodeAt(0)

        if(digit == 57 /* '9' */){
            uid[index] = 'A'    
            return uid.join('')
        }

        if(digit == 90 /* 'Z' */){
            uid[index] = '0'
        }else{
            uid[index] = String.fromCharCode(digit + 1)
            return uid.join('')
        }
    }    

    uid.shift('0')

    return uid.join('')
}

// 为一个 obj 设置 hashkey， 如果没有第二个参数，就删除原有的 hashkey 
function setHashKey(obj, h){
    if(h){
        obj.$$hashKey = h
    }else{
        delete obj.$$hashKey
    }
}

function extend(dst){
    
}

// 转换字符串为 10 进制整数
function int(str){
    return parseInt(str, 10)  
}

function inherit(parent, extra){
  
}

// noop (等待，无操作)
function noop(){}
noop.$inject= []

// 用于返回一个函数的第一个参数，感觉没啥用
function identity($){
    return $
}

identity.$inject = []

// 给一个参数，返回一个函数，这个函数只会返回这个给定的参数，目的不明
function valueFn(value){
    return function(){
        return value
    }
}

// 以下都是利用原生js typeof 函数封装而已
function isUndefined(value){
    return typeof value === 'undefined'
}

function isDefined(value){
    return typeof value !== 'undefined'
}

function isObject(value){
    return typeof value != null && typeof value === 'object'
}

function isString(value){
    return typeof value === 'string'
}

function isNumber(value){
    return typeof value === 'number'
}

// 这个稍微特殊一点，
function isDate(value){
    return toString.call(value) === '[object Date]'
}

var isArray = (function(){
    if(!isFunction(Array.isArray)){
        return function(){
            return toString.call(value) === '[object Array]'  
        } 
    }

    return Array.isArray
})()

function isFunction(value){
    return typeof value === 'function'
}

function isRegExp(value){
    return toString.call(value) === '[object RegExp]'
}

// 这个比较特殊
function isWindow(obj){
    return obj && obj.document && obj.location && obj.alert && obj.setInterval
}

// 这个用到了 ng 自带的函数了 
function isScope(obj){
    return obj && obj.$evalAsync && obj.$watch
}

function isFile(obj){
    return toString.call(obj) === '[object File]'
}

// blob （二进制）
function isBlob(obj){
    return toString.call(obj) === '[object Blob]'
}

function isBoolean(value){
    return typeof value === 'boolean'
}

// 看看这里怎么封装的
var trim = (function(){
    // 原生 js trim方法，IE不支持
    if(!String.prototype.trim){
        return function(value){
            /* ^ 匹配0次或多次
              \s 匹配空格符
              $ 匹配尾部  */
            return isString(value) ? value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : value
        }
    }
    
    return function(value){
        return isString(value) ? value.trim() : value
    }
})()

// 判断一个参数是否为 DOM element，这里用到了 jquery 方法
// !! 其实用来把数值强行转换为 Boolean 类型而已
function isElement(node){
    return !!(node && (node.nodeName || (node.prop && node.attr && node.find)))
}

function makeMap(str){
    
}

if(msie < 9){
    
}else{

}

function map(obj, iterator, context){
        
}

// 封装了一下,如果是 obj 的话就会返回 obj 的 key 的数量
function size(obj, ownPropsOnly){
    var count = 0, key

    if(isArray(obj) || isString(obj)){
        return obj.length
    }else if(isObject(obj)){
        for(key in obj){
            if(!ownPropsObly || obj.hasOwnProperty(key)){
                count++
            }
        }
    }

    return count
}

function includes(array, obj){

}

function indexOf(array, obj){
    
}

function arrayRemove(array, value){
    
}

function isLeafNode(node){
    
}

///////////////////
// 有点angular自己的味道了, 这里开始就比较难了
///////////////////
function copy(source, destination, stackSource, stackDest){
    
}

function shallowCopy(src, dst){
    
}

function equals(o1, o2){
    
}

function csp(){
    return (document.securityPolicy && document.securityPolicy.isActive) ||
        (document.querySelector && 
         !!(document.querySelector('[ng-csp]') || document.querySelector('[data-ng-csp]')))
}

// slice.call(array2, index) 就是 array2.slice(index),
// 只有一个参数时，array2.slice(index) 返回 arry2 从 index 开始的后面的项
function concat(array1, array2, index){
    return array1.concat(slice.call(array2, index))
}

function sliceArgs(args, startIndex){
    return slice.call(args, startIndex || 0)
}

function bind(self, fn){
    
}

function toJsonReplacer(key, value){
    
}

function toJson(obj, pretty){
    
}

function fromJson(json){
    
}

function toBoolean(value){
    if(typeof value === 'function'){
        value = true
    }else if(value && value.length !== 0){
        var v = lowercase('' + value)

        value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]')
    }else{
        value = false
    }

    return value
}

function startingTag(element){
    
}

function tryDecodeURIComponent(value){
    try{
        return decodeURIComponent(value)
    }catch(e){
        // 如果value不能被decode也不返回错误信息
    }
}

function parseKeyValue(keyValue){
    
}

function toKeyValue(obj){
    
}

function encodeUriSegment(val){
    
}

function encoderUriQuery(val, pctEncodeSpaces){
    
}

//////////////
// angular指令开始
//////////////
function angualrInit(element, bootstrap){
    
}

// 这里的bootstrap指的是 引导程序，不是 twitter bootstrap 
function bootstrap(element, modules){
    
}

// 把驼峰法转换为 _ 连接，例如 helloJqueryImissYou -> hello_jquery_imiss_you
var SNAKE_CASE_REGEXP = /A-Z/g

function snake_case(name, separator){
    separator = separator || '_'

    return name.replace(SNAKE_CASE_REGEXP, function(letter, pos){
        return (pos ? separator : '') + letter.toLowerCase()
    })
}

// 用于绑定jquery，如果jquery没有引用，则启用angular内部的jqLite做替代
function bindJQuery(){
    jQuery = window.jQuery

    if(jQuery && jQuery.fn.on){
        jqLite = jQuery
        
        extend(jQuery.fn, {
            scope: JQLitePrototype.scope,
            isolateScope: JQLitePrototype.isolateScope,
            controller: JQLitePrototype.controller,
            injector: JQLitePrototype.injector,
            inheritedData: JQLitePrototype.inheritedData
        })

        jqLitePatchJQueryRemove('remove', true, true, false)
        jqLitePatchJQueryRemove('empty', false, false, false)
        jqLitePatchJQueryRemove('html', false, false, true)
    }else{
        jqLite = JQLite
    }

    angular.element = jqLite
}

// assert (维护，断言，主张) 
function assertArg(arg, name, reason){
    
}

function assertArgFn(arg, name, acceptArrayAnnotation){
    
}

function assertNotHasOwnProperty(name, context){
    
}

function getter(obj, path, bindFnToScope){
    
}

function getBlockElements(nodes){
    
}

//////////////////
// 重头戏 angular 模组加载器
//////////////////
function setupModuleLoader(window){
    
}

// global
var version = {
    full: '1.2.20',
    major: 1,
    minor: 2,
    dot: 20,
    codeName: 'accidental-beautification'
}

// 对外提供出来的 API
function publishExternalApi(angular){
    extend(angular, {
        'bootstrap': bootstrap,
        'copy': copy,
        'extend': extend,
        'equals': equals,
        'element': jqLite,
        'forEach': forEach,
        'injector': createInjector,
        'noop': noop,
        'bind': bind,
        'toJson': toJson,
        'fromJson': fronJson,
        'identity': identity,
        'isUndefined': isUndefined,
        'isDefined': isDefined,
        'isString': isString,
        'isFunction': isFunction,
        'isObject': isObject,
        'isNumber': isNumber,
        'isElement': isElement,
        'isArray': isArray,
        'version': version,
        'isDate': isDate,
        'lowercase': lowercase,
        'uppercase': uppercase,
        'callbacks': {counter: 0},
        '$$minErr': minErr,
        '$$csp': csp
    })
}

///////////////////////
// JQLite ng会检测是否加载jquery，如果没有，会启用内置的 jqLite 做替代
//////////////////////

JQLite.expando = 'ng339'

var jqCache = JQLite.cache = {},
    jqId = 1,
    
    // 这个最常见了,jquery里也有
    addEventListenerFn = (window.document.addEventListener ?
        function(element, type, fn){
            element.addEventListener(type, fn, false)
        } : 
        function(element, type, fn){
            element.attachEvent('on' + type, fn)
        }
    )

    removeEventListenerFn = (window.document.removeEventListener ?
        function(element, type, fn){
            element.removeEventListener(type, fn, false)
        } :
        function(element, type, fn){
            element.detachEvent('on' + type, fn)
        }
    )

	jqData = JQLite._data = function(node){
        return this.cache[node[this.expando]] || {}
    }

function jqNextId(){
	return ++jqId
}

var SPECIAL_CHARS_REGEXO = /([\:\-\_] + (.))/g,
	MOZ_HACK_REGEXP = /^moz([A-Z])/,
	jqLiteMinErr = minErr('jqLite')

// spearator(分隔符)，把 _ 命名改为驼峰式, 例如 hello_cc_world -> helloCcWorld，
// 与之前的 function snake_case() 正好相反
function camelCase(name){
    return name.replace(SPECIAL_CHARS_REGEXP, function(_, spearator, letter, offset){
        return offset ? letter.toUpperCase() : letter
    }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

// 开启jqLite
function jqLitePatchJQueryRemove(name, dispatchThis, filterElems, getterIfNoArguments){

}

var SINGLE_TAG_REGEXP = /^(\w+)\s*\/?>(?:<\/\1>|)$/,
	HTML_REGEXP = /<|&#?\w+;/,
	TAG_NAME_REGEXP = /<([\w:]+)/,	
	XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)([\w:]+)[^>]*)\/>/gi,

var wrapMap = {
	
}

wrapMap.optgroup = wrapMap.option
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead
wrapMap.th = wrapMap.td

function jqLiteIsTextNode(html){
    return !HTML_REGEXP.test(html)
}

// fragment（碎片）
function jqLiteBuildFragment(html, context){

}

function jqLiteParseHTML(html, context){
    context = context || document

    var parsed

    if(parsed = SINGLE_TAG_REGEXP.exec(html)){
        return [context.createElement(parsed[1])]
    }

    return jqLiteBuildFragment(html, context)
}

function jqLite(element){
    if(element instanceof JQLite){
        return element
    }

    if(isString(element)){
        element = trim(element)
    }

    if(!(this instanceof JQLite)){
        
    }
}

function jqLiteHasClass(element, selector){
    if(!element.getAttribute){
        return false
    }

    return (' ' + (element.getAttribute('class') || '') + ' ')
        .replace(/[\n\t/g, ' ')
        .indexOf(' ' + selector + ' ') > -1
}

function jqLiteRemoveClass(element, cssClasses){

}

function createEventHandler(element, events){
    var eventHandler = function(event, type){
        if(!event.preventDefault){
            event.preventDefault = function(){
                event.returnValue = false // IE
            }
        }
        
        // 防止事件冒泡
        if(!event.stopPropagation){
            event.stopPropagation = function(){
                event.cancelBubble = true // IE 
            }
        }

        if(!event.target){
            event.target = event.srcElement || document
        }
    }
}

forEach({
    removeData: jqLiteRemoveData,

    dealoc: jqLiteDealoc,

    on: function onFn(element, type, fn, unsupported){
        
    },

    off: jqLiteOff,

    one: function(element, type, fn){
        element = jqLite(element)
        element.on(type, function onFn(){
            element.off(type, fn)
            element.off(type, onFn)
        })
        element.on(type, fn)
    },

    replaceWith: function(element, replaceNode){
        
    },

    chidlren: function(element){
        
    },

    contents: function(element){
        return element.contentDocument || element.childNodes || []
    },

    append: function(element, node){
        
    },

    prepend: function(element, node){
        
    },

    wrap: function(element, wrapNode){
        
    },

    remove: function(element){
        
    },

    after: function(element, newElement){
        
    },

    addClass: jqLiteAddClass,
    
    removeClass: jqLiteRemoveClass,

    toggleClass: function(element, selector, condition){
        
    },

    parent: function(element){
        
    },

    next: function(element){
        
    },

    find: function(element, selector){
        
    },

    clone: jqLiteClone,

    triggerHandler: function(element, eventName, eventData){
        
    }
}, function(fn, name){
    // chaining function 学的jquery链式操作 
    JQLite.prototype[name] = function(arg1, arg2, arg3){
        
    }
        
    // 把遗留的 bind/unbind 绑定到 on/off 上去，其实和jquery一样
    JQLite.prototype.bind = JQLite.prototype.on
    JQLite.prototype.unbind = JQLite.prototype.off
})

///////////////////////////
// Injector(modulesToLoad)
//////////////////////////
function createInjector(modulesToLoad){
    
}

function $AnchorScrollProvider(){
    var autoScrollingEnabled = true

    this.disableAutoScrolling = function(){
        autoScrollingEnabled = false
    }


}

var $animateMinErr = minErr('$animate'),
    
    $AnimateProvider = ['$provide', function($provide){
        
    }]

function $$AsyncCallbackProvider(){
    
}

function Browser(window, document, $log, $sniffer){
    
}

function $BrowserProvider(){
    
}

function $CacheFactroyProvider(){
    
}

function $TemplateCacheProvider(){
    
}

var $compileMinErr = minErr('$compile')

$CompileProvider.$inject = ['$provide', '$$sanitizeUriProvider']

function $CompileProvider($provide, $$sanitizeUriProvider){
    
}

var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i

function directiveNormalize(name){
    
}

function nodesetLinkingFn(){
    
}

function directiveLinkingFn(){
    
}

function tokenDifference(str1, str2){
    
}

function $ControllerProvider(){
    
}

function $DocumentProvider(){
    
}

function $ExceptionHandlerProvider(){
    
}

function parseHeaders(headers){
    
}

function headersGetter(headers){
    
}

function transformData(data, headers, fn){
    
}

// ajax 响应状态码
function isSuccess(status){
    return 200 <= status && status < 300 
}

function $HttpProvider(){
    
}

function createXhr(method){
    
}

function $HttpBackendProvider(){
    
}

function createHttpBackend($browser, createXhr, $browserDefer, callbacks, rawDocument){
    
}

var $interpolateMinErr = minErr('$interpolate')

function $InterpolateProvider(){
    
}

function $IntervalProvider(){
    
}

function $LocaleProvider(){
    
}

var PATH_MATCH = /^(\?#]*)(\?([^#]*))?(#(.*))?$/,
    DEFAULT_PORTS = {
        'http': 80,
        'https': 443,
        'ftp': 21
    },
    $locationMinErr = minErr('$location')

function encodePath(path){
    
}

function parseAbsoluteUrl(absoluteUrl, locationObj, appBase){
    
}

function parseAppUrl(relativeUrl, locationObj, appBase){
    
}

function beginsWith(begin, whole){
    
}

function stripHash(url){
    
}

function stripFile(url){
    
}

function serverBase(url){
    
}

function LocationHtml5Url(appBase, basePrefix){
    
}

function LocationHashbangUrl(appBase, hashPrefix){
    
}

function LocationHashbangInHtml5Url(appBase, hashPrefix){
    
}

LocationHashbangInHtml5Url.prototype = 

function locationGetter(prototype){
    
}

function locationGetterSetter(property, preprocess){
    
}

function $LocationProvider(){
    
}

function $LogProvider(){
    
}

var $parseMinErr = minErr('$parse'),
    promiseWarningCache = {},
    promiseWarning

function ensureSafeMemberName(name, fullExpression){
    
}

function ensureSafeObject(obj, fullExpression){
    
}

var CALL = Function.prototype.call,
    APPLY = Function.prototype.apply,
    BIND = Function.prototype.bind

function ensureSafeFunction(obj, fullExpression){
    
}

var OPERATORS = {},

    ESCAPE = {}

var Lexer = function(options){
    
}

Lexer.prototype = {}

var Parser = function(lexer, $filter, options){
    
}

Parser.ZERO = extend(function (){
    
}, {})

Parser.prototype = {}

function setter(obj, path, setValue, fullExp, options){
    
}

var getterFnCache = {}

function cspSafeGetterFn(){
    
}

function getterFn(path, options, fullExp){
    
}

function $ParseProvider(){
    
}

function $QProvider(){
    
}

function qFactory(nextTick, exceptionHandler){
    
}

function $$RAFProvider(){
    
}

function $RootScopeProvider(){
    
}

function $$SanitizeUriProvider(){
    
}

var $sceMinErr = minErr('$sce')

var SCE_CONTEXTS = {}

function escapeForRegexp(s){
    
}

function adjustMatcher(matcher){
    
}

function adjustMatchers(matchers){
    
}

function $SceDelegateProvider(){

}

function $SceProvider(){
    
}

function $SnifferProvider(){
    
}

function $TimeoutProvider(){
    
}

var urlParsingNode = document.createElement('a'),
    originUrl = urlResolve(window.location.href, true)

// resolve (分解)
function urlResolve(url, base){
    
}

function urlIsSameOrigin(requestUrl){
    
}

function $WindowProvider(){
    
}
///////////////
// ng filter
//////////////
$FilterProvider.$inject = ['$provide']

// 这里提供了 9 个在最开始文档中提到的过滤器
function $FilterProvider($provide){
    var suffix = 'Filter'    // suffix (后缀)

    function register(name, factory){
        if(isObject(name)){
            var filters = {}

            forEach(name, function(filter, key){
                filters[key] = register(key, filter)
            })

            return filters
        }else{
            return $provide.factory(name + suffix, factory)
        }
    }

    this.register = register
    this.$get = ['$injector', function($injector){
        return function(name){
            return $injector.get(name + suffix)
        }
    }]
    
    // 文档中提到的 9 中自带的 Filter 都住在这里了
    register('currency', currencyFilter)
    register('date', dateFilter)
    register('filter', filterFilter)
    register('json', jsonFilter)
    register('limitTo', limitToFilter)
    register('lowercase', lowercaseFilter)
    register('number', numberFilter)
    register('orderBy', orderByFilter)
    register('uppercase', uppercaseFilter)
}

function filterFilter(){
    
}

currencyFilter.$inject = ['$locale']

function currencyFilter($locale){
    
}

numberFilter.$inject = ['$locale']

function numberFilter($locale){
    
}

var DECIMAL_SEP = '.'

function formatNumber(){
    
}

function padNumber(){
    
}

function dateGetter(){
    
}

function dateStrGetter(name, shortForm){
    
}

function timeZoneGetter(date){
    
}

function ampmGetter(date, formats){
    
}

var DATE_FORMATS = {
    yyyy: dateGetter('FullYear', 4),
      yy: dateGetter('FullYear', 2, 0, true)    
}

var DATE_FORMATS_SPLIT = //,
    NUMBER_STRING = /^\-?\d+$/  // \- 匹配负号出现一次或不出现，\d+ 匹配数字出现一次或多次

dateFilter.$inject = ['$locale']

function dateFilter($locale){
    
}

function jsonFilter(){
    
}

/*
function valueFn(value){
    return function(value){
        return value
    }
}
即给定一个参数，返回一个函数，这个返回的函数执行的话就会返回最开始那个参数了，可能是用来缓存数据？
*/  

var lowercaseFilter = valueFn(lowsercase),

    uppercaseFilter = valueFn(uppercase)

// 目测用来限制字符串长度，或者数字大小
function limitToFilter(){
    return function(init, limit){
        if(!isArray(input) && !isString(input)) return input

        if(Math.abs(Number(limit)) === Infinity){
            limit = Number(limit)
        }else{
            limit = int(limit)
        }
    
        if(isString(input)){
            if(limit){
                return limit >= 0 ? input.slice(0, limit) : input.slice(limit, input.length)
            }else{
                return ''
            }
        }         
        
        var out = [], i, n
            
        if(limit > input.length){
            limit = input.length
        }else if(limit < -input.length){
            limit = -input.length
        }

        if(limit > 0){
            i = 0 
            n = limit   
        }else{
            i = input.length + limit
            n = input.length
        }

        for( ; i < n; i++) out.push(input[i])

        return out
    }
}

orderByFilter.$inject = ['$parse']

function orderByFilter($parse){
    
}

function ngDirective(directive){
    
}

var htmlAnchorDirective = valueFn({}),

    ngAttributeAliasDirectives = {}

forEach(BOOLEAN_ATTR, function(propName, attrName){
    
})

forEach(['src', 'srcset', 'href'], function(attrName){
    
})

var nullFormCtrl = {}

FormController.$inject = ['$element', '$attrs', '$scope', '$animate']

function FormController(element, attrs, $scope, $animate){
    
}

var formDirectiveFactory = function(isNgForm){
    
    },

    formDirective = formDirectiveFactory(),

    ngFormDirective = formDirectiveFactory(true),

    URL_REGEXP = //,
    
    EMAIL_REGEXP = //i,

    NUMBER_REGEXP = //

    inputType = {}

///////////////////
// 表单验证
//////////////////
function validate(){
    
}

function testFlags(){
    
}

function addNativeHtml5Validators(){
    
}

function textInputType(){
    
}

var numberBadFlags = ['badInput']

function numberInputType(){
    
}

function urlInputType(){
    
}

function emailInputType(){
    
}

function radioInputType(){
    
}

function checkboxInputType(){
    
}

///////////////////////
// Angular的内置指令
/////////////////////
var inputDirective = ['$browser', '$sniffer', function($browser, $sniffer){
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function(scope, element, attr, ctrl){
            if(ctrl){
                (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer, $browser)
            }
        }
    }
}]

var VALID_CLASS = 'ng-valid',
    INVALID_CLASS = 'ng-invalid',
    PRISTINE_CLASS = 'ng-pristine',
    DIRTY_CLASS = 'ng-dirty'

var NgModelController = ['$scope', '$exceptionHandler', '$attrs', '$element', '$parse', '$animate', 
    function($scope, $exceptionHandler, $attr, $element, $parse, $animate){
        this.$viewValue = Number.NaN
        this.$modelValue = Number.NaN
        this.$parsers = []
        this.$formatters = []
        this.$viewChangeListeners = []
        this.$pristine = true
        this.$dirty = false
        this.$valid = true
        this.$invalid = false
        this.$name = $attr.name

        var ngModelGet = $parse($attr.ngModel)
            ngModelSet = ngModelGet.assign
    }]

var ngModelDirective = function(){
    return {
        require: ['ngModel', '^>form']
        controller: NgModelController,
        link: function(scope, element, attr, ctrls){
            var modelCtrl = ctrls[0],
                formCtrl = ctrls[1] || nullFormCtrl

            formCtrl.$addControl(modelCtrl)

            scope.$on('$destory', function(){
                formCtrl.$removeControl(modelCtrl)
            })
        }
    }
}

var ngChangeDirective = valueFn({
    require: 'ngModel',
    link: function(scope, element, attr, ctrl){
        ctrl.$viewChangeListeners.push(function(){
            scope.$eval(attr.ngChange)
        })
    }
})

var requiredDirective = function(){
    return {
        require: '?ngModel',
        link: function(scope, elm, attr, ctrl){
            if(!ctrl){
                return 
            }

            attr.require = true

            var validator = function(value){
                if(attr.required && ctrl.$isEmpty(value)){
                    ctrl.$setValidity('require', false)
                    return 
                }else{
                    ctrl.$setValidity('required', true)
                    return value
                }
            }

            ctrl.$formatters.push(validator)
            ctrl.$parsers.unshift(validator)
            attr.$observe('required', function(){
                validator(ctrl.$viewValue)
            })
        }
    }
}

var ngListDirective = function(){
        
}
    
var CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/ var ngValueDirective = function(){ } 
var ngBindDirective = function(){
            
}
    
var ngBindTemplateDirective = ['$interpolate', function($interpolate){
        
}]
    
var ngBindHtmlDirective = ['$sce', '$parse', function($sce, $parse){

}]

function classDirective(name, selector){
    
}

var ngClassDirective = classDirective('', true)

var ngClassOddDirective = classDirective('Odd', 0)

var ngClassEvenDirective = classDirective('Even', 1)

var ngCloakDirective = ngDirective({})

var ngControllerDirective = [function(){
    
}]

var ngEventDirectives = {}

forEach()

var ngIfDirective = ['$animate', function($animate){
    
}]

var ngIncludeDirective = ['$http', '$templateCache', '$anchorScroll', '$animate', '$sce']

var ngIncludeFillContentDirective = ['$compile', ]

var ngInitDirective = ngDirective({})

var ngNonBindableDirective = ngDirective({terminal: true, priority: 1000})

var ngPluralizeDirective = ['$locale', '$interpolate', function($locale, $interpolate){
    
}]

var ngRepeatDirective = ['$parse', '$animate', function($parse, $animate){
    
}]

var ngShowDirective = ['$animate', function($animate){
    
}]

var ngHideDirective = ['$animate', function($animate){
    
}]

var ngStyleDirective = ['$animate', function($animate){
    
}]

var ngSwitchDirective = ['$animate', function($animate){
    
}]

var ngSwitchWhenDirective = ngDirective({

})

var ngSwitchDefaultDirective = ngDirective({})

var ngTranscludeDirective = ngDirective({})

var scriptDirective = ['$templateCache', function($templateCache){
    return {
        restict: 'E',
        terminal: true,
        compile: function(element, attr){
            if(attr.type == 'text/ng-template'){
                var templateUrl = attr.id,
                    text = element[0].text
                
                $templateCache.put(templateUrl, text)
            }
        }
    } 
}]

var ngOptionsMinErr = minErr('ngOptions')

var ngOptionsDirective = valueFn({terminal: true})

// jshint maxlen: false
var selectDirective = ['$compile', '$parse', function($compile, $parse){
    
}]

var optionsDirective = ['$interpolate', function($interpolate){
    
}]i

var styleDirective = valueFn({
    restrict: 'E',
    terminal: true
})

if(window.angular.bootstrap){
    console.log('WARNING: Tried to load angular more than once.')

    return 
}

bindJQuery()

publishExternalAPI(angular)

jqLite(document).ready(function(){
    angularInit(document, bootstrap)
})

})(window, document)


