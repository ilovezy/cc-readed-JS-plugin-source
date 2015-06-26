
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
// iterator(迭代器) context(上下文)
/*
//js 例子
var values = {name: 'misko', gender: 'male'},
    log = []
angular.forEach(values, function(value, key){
    this.push(key + ': ' + value)
}, log)
expect(log).toEqual(['name: misko', 'gender: male'])

基本上看做和jquery $.each() 使用,
如果是一个对象，那么让对象下的所有的属 key ：value 都执行一个函数
如果是数组，那么以数组下标和值为参数执行 iterator 迭代操作
最后返回一个迭代完成的 对象 或是 数组
*/
function forEach(obj, iterator, context){
    var key

    if(obj){
        if(isFunction(obj)){
            for(key in obj){
                if(key != 'prototype' && key != 'length' && key != 'name' &&
                    (!obj.hasOwnProperty || obj.hasOwnProperty(key))){
                    iterator.call(context, obj[key], key)
                    // 类似于执行了这样的步骤
                    /*
                    context.iterator(obj[key], key)
                    */
                }
            }
        }else if(obj.forEach && obj.forEach !== forEach){
            obj.forEach(iterator, context)
        }else if(isArrayLike(obj)){
            for(key = 0; key < obj.length; key++){
                iterator.call(context, obj[key], key)
            }
        }else{
            for(key in obj){
                if(obj.hasOwnProperty(key)){
                    iterator.call(context, obj[key], key)
                }
            }
        }
    }

    return obj
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
    var i,
        keys = sortedKeys(obj),
        len = keys.length

    for(var i = 0; i < len; i++){
        iterator.call(context, obj[keys[i]], keys[i])
    }

    return keys
}

// reverse (翻转)  params (参数) iterator(迭代),
// 看代码来说就是会返回一个函数，这个函数的参数正好是给定的时候两个参数位置互换，用处不明
function reverseParams(iteratorFn){
    return function(value, key){
        iteratorFn(key, value)
    }
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

// 把所有 src object 的属性拓展到 destination object 中区
// dst 是 destination (目标) 的简写
function extend(dst){
    var h = dst.$$hashKey

    forEach(arguments, function(obj){
        if(obj !== dst){
            forEach(obj, function(value, key){
                dst[key] = value
            })
        }
    })

    setHashKey(dst, h)

    return dst
}

// 转换字符串为 10 进制整数
function int(str){
    return parseInt(str, 10)
}

// inherit(继承)，不明
function inherit(parent, extra){
    return extend(new (extend(function(){}, {prototype: parent}))(), extra)
}

// noop (等待，无操作)
// 预先设置一个没有操作的函数，在以 function 形式写代码的时候用，用处不明
/* js 例子
function foo(callback){
    var result = calculateResult()
    (callback || angular.noop)(result)
}
*/
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
    if(o1 === o2) return true
    if(o1 === null || o2 === null) return false
    if(o1 !== o1 && o2 !== o2) return true // NaN === NaN

    var t1 = typeof o1, t2 = typeof o2, length, key, keySet

    if(t1 == t2){
        if(t1 == 'object'){
            if(isArray(o1)){
                if(!isArray(o2)) return false

                if((length = o1.length) == o2.length){
                    for( key = 0; key < length; key++){
                        if(!equals(o1[key], o2[key])) return false
                    }

                    return true
                }
            }else if(isDate(o1)){
                return isDate(o2) && o1.getTime() == o2.getTime()
            }else if(isRegExp(o1) && isRegExp(o2)){
                return o1.toString() == o2.toString()
            }else{
                if(isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2)) return false

                keySet = {}

                for(key in o1){
                    if(key.charAt(0) === '$' || isFunction(o1[key])) continue
                    if(!euqals(o1[key], o2[key]) return false

                    keySet[key] = true
                }

                for(key in o2){
                    if(!keySet.hasOwnProperty(key) && key.charAt(0) !== '$' && 
                        o2[key] !== undefined && !isFunction(o2[key])){
                        return false
                    }
                }

                return true
            }
        }
    }

    return false
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
    var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : []

    if(isFunction(fn) && !(fn instanceof RegExp)){
        return curryArgs.length ? 
            function(){
                return arguments.length ?
                    fn.apply(self, curryArgs.concat(slice.call(arguments, 0))) :
                    fn.apply(self, curreyArgs)
            } :
            function(){
                return arguments.length ?
                    fn.apply(self, arguments) :
                    fn.call(self)
            }
    }else{
        
    }
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
    var doBoostrap = function(){
        element = jqLite(element)

        if(element.injector()){
            var tag = (element[0] === document) ? 'document' : startingTag(element)
        }
    }

    var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/

    if(){

    }

    window.name =
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

    // 所以其实可以把 angular.element 当成 jQuery，即 $, 在手动启动angular的时候会见到的
    angular.element = jqLite
}

// assert (维护，断言，主张)
function assertArg(arg, name, reason){
    if(!arg){
        throw ngMinErr('areq', 'Argument "{0}" is {1}', (name || '?'), (reason || 'required'))
    }
    return arg
}

function assertArgFn(arg, name, acceptArrayAnnotation){

}

function assertNotHasOwnProperty(name, context){
    if(name === 'hasOwnProperty'){
        throw ngMinErr('badname', 'hasOwnProperty is not a valid {0} name', context)
    }
}

function getter(obj, path, bindFnToScope){
    if(!path) return obj

    var keys = path.split('.'), key, lastInstance = obj, len = keys.length

    for(var i = 0; i < len; i++){
        key = keys[i]
        if(obj){
            obj = (lastInstance = obj)[key]
        }
    }

    if(!bindFnToScope && isFunction(obj)){
        return bind(lastInstance, obj)
    }

    return obj
}

function getBlockElements(nodes){
    // 参数nodes是个 dom 元素数组
    var startNode = nodes[0], 
        endNode = nodes[nodes.length - 1]
    
    if(startNode === endNode){
        return jqLite(startNode)
    }

    var element = startNode, 
        elements = [element]

    do{
        element = element.nextSibling
        if(!element) break
        elements.push(element)
    }while(element !== endNode)

    return jqLite(elements)
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

// 对外提供出来的 API, 非常重要的一步
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

    angularModule = setupModuleLoader(window)

    try{
        angularModule('ngLocale')
    }catch(e){
        angularModule('ngLocale', []).provider('$locale', $LocaleProvider)
    }

    angularModule('ng', ['ngLocale'], ['$provide', function ngModule($provide){
        $provide.provider({ $$sanitizeUri: $$SanitizeUriProvider })

        $provide.provider('$compile', $CompileProvider)
            .directive({
                
            })
            .directive({

            })
            .directive()
            .directive()

        $provide.provider({
            $anchorScroll: $AnchorScrollProvider, 
            $animate: $AnimateProvider, 
            $browser: $BrowserProvider, 
            $cacheFactory: $CacheFactoryProvider, 
            $controller: $ControllerProvider, 
            $document: $DocumentProvider, 
            $exceptionHandler: $ExceptionHandlerProvider, 
            $filter: $FilterProvider, 
            $interpolate: $InterpolateProvider, 
            $interval: $IntervalProvider, 
            $http: $HttpProvider, 
            $httpBackend: $HttpBackendProvider, 
            $location: $LocationProvider, 
            $log: $LogProvider, 
            $parser: $ParseProvider, 
            $rootScope: $RootScopeProvider, 
            $q: $QProvider, 
            $sce: $SceProvider, 
            $sceDelegate: $SceDelegateProvider, 
            $sniffer: $SnifferProvider, 
            $templateCache: $TemplateCacheProvider, 
            $timeout: $TimeoutProvider, 
            $window: $WindowProvider, 
            $$raF: $$RAFProvider, 
            $$asyncCallback: $$AsyncCallbackProvider
        })
    }])
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
    var self = this,
        rawDocument = document[0],
        location = window.location,
        history = window.history,
        setTimeout = window.setTimeout,
        clearTimeout = window.clearTimeout,
        pendingDeferIds = {}

    self.isMock = false

    var outstandingRequestCount = 0,
        outstandingRequestCallbacks = []

    self.$$completeOutstandingRequest = completeOutstandingRequest
    self.$$incOutstandingRequestCount = function(){ outstandingRequestCount++ }

    function completeOutstandingRequest(fn){
        try{
            fn.apply(null, sliceArgs(arguments, 1))
        }finally{
            outstandingRequestCount--

            if(outstandingRequestCount === 0){
                while(outstandingRequestCallbacks.length){
                    try{
                        outstandingRequestCallbacks.pop()()
                    }catch(e){
                        $log.error(e)
                    }
                }
            }
        }
    }


}

function $BrowserProvider(){
    this.$get = ['$window', '$log', '$sniffer', '$document', 
        function($window, $log, $sniffer, $document){
            return new Browser($window, $document, $log, $sniffer)
        }]
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
    var JSON_START = /^\s*(\[|\{[^\{])/,  
        JSON_END = /[\}\]]\s*$/,     
        PROTECTION_PREFIX = /^\)\]\}',?\n/, 
        CONTENT_TYPE_APPLICATION_JSON = {'Content-Type': 'application/json;charset=utf-8'}

    var defaults = this.defaults = {
        // transform incoming response data
        transformResponse: [function(data){
            if(isString(data)){
                // strip json vulnerability protection prefix
                data = data.replace(PROTECTION_PREFIX, '')
                if(JSON_START.test(data) && JSON_END.test(data)){
                    data = fromJson(data)
                }
            }
            return data
        }], 

        headers: {
            common: {'Accept': 'application/json, text/plain, */*'}, 
            post: shallowCopy(CONTENT_TYPE_APPLICATION_JSON), 
            put: shallowCopy(CONTENT_TYPE_APPLICATION_JSON), 
            patch: shallowCopy(CONTENT_TYPE_APPLICATION_JSON)
        }, 

        xsrfCookieName: 'XSRF-TOKEN', 
        xsrfHeaderName: 'X-XSRF-TOKEN'
    }

    var interceptorFactories = this.interceptors = []
    
    var repsonseInterceptorFactories = this.responseInterceptors = []

    this.$get = ['$httpBackend', '$browser', '$cacheFactory', '$rootScope', '$q', '$injector', 
        function($httpBackend, $browser, $cacheFactory, $rootScope, $q, $injector){
            var defaultCache = $cacheFactory('$http'), 
                reversedInterceptors = []

            forEach(interceptorFactories, function(interceptorFactory){
                
            })
            
        }]
    
    
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

// angular 对原生 setInterval 的封装
function $IntervalProvider(){
    this.$get = ['$rootScope', '$window', '$q', function($rootScope, $window, $q){
        var intervals = {}
        
        function interval(fn, delay, count, invokeApply){
            var setInterval = $window.setInterval, clearInterval = $window.clearInterval, 
                deferred = $q.defer(), // 注意这个 $q 其实jquery里好像也有哦，一个不知名但是很重要的js框架
                prommise = deferred.promise, 
                iteration = 0, 
                skipApply = (isDefined(invokeApply) && !invokeApply)

            count = isDefined(count) ? count : 0
            promise.then(null, null, fn)
            promise.$$intervalId = setInterval(function tick(){
                defered.resolve(iteration++)

                if(count > 0 && iteration >= count){
                    deferred.resolve(iteration)
                    clearInterval(promise.$$intervalId)
                    delete intervals[promise.$$intervalId]
                }

                if(!skipApply) $rootScope.$apply()
            }, delay)

            itervals[promise.$$intervalId] = deferred

            return promise
        }

        iterval.cancel = function(promise){
            if(promise && promise.$$intervalId in intervals){
                intervals[promise.$$intervalId].reject('canceled')
                $window.clearInterval(promise.$$intervalId)
                delete intervals[promise.$$intervalId]

                return true
            }

            return false
        }

        return interval
    }]
}

function $LocaleProvider(){
    this.$get = function(){
        return {
            id: 'en-us', 

            NUMBER_FORMATS: {
                DECIMAL_SEP: '.',  // decimal 小数点
                GROUP_SEP: ', ', 
                PATTERNS: [{ // decimal 模式，即 小数点模式
                    minInt: 1, 
                    minFrac: 0, 
                    maxFrac: 3, 
                    posPre: '', 
                    negPre: '-', 
                    negSuf: '', 
                    gSize: 3, 
                    lgSize: 3
                }, { //  currency 模式，即 货币模式
                    minInt: 1, 
                    minFrac: 2, 
                    maxFrac: 2, 
                    posPre: '\u00A4', 
                    posSuf: '', 
                    negPre: '(\u00A4', 
                    negSuf: ')', 
                    gSize: 3, 
                    lgSize: 3
                }],  // pattern 模式
                CURRENCY_SYM: '$'
            }, 

            DATETIME_FORMATS: {
            
            }, 

            pluralCat: function(num){ // plural 复数, 这个命名蛋疼
                if(num === 1){
                    return 'one'
                }
                return 'other'
            }
        }
    }
}

var PATH_MATCH = /^(\?#]*)(\?([^#]*))?(#(.*))?$/,
    DEFAULT_PORTS = {
        'http': 80,
        'https': 443,
        'ftp': 21
    },
    $locationMinErr = minErr('$location')

// 把参数的用 / 分割的每一部分都 encode 一下再重新连接
function encodePath(path){
    var segments = path.split('/'), 
        i = segments.length

    while(i--){
        segments[i] = encodeUriSegment(segments[i])    
    }
    return segments.join('/')
}

function parseAbsoluteUrl(absoluteUrl, locationObj, appBase){

}

function parseAppUrl(relativeUrl, locationObj, appBase){

}

function beginsWith(begin, whole){
    if(whole.indexOf(begin) === 0){
        return whole.substr(begin.length)
    }
}

// 把 参数 的 # 后面的一串包括 # 都剪切掉
function stripHash(url){
    var index = url.indexOf('#')
    return index == -1 ? url : url.substr(0, index)
}

function stripFile(url){
    return url.substr(0, stripHash(url).lastIndexOf('/') + 1)
}

function serverBase(url){
    return url.substring(0, url.indexOf('/', url.indexOf('//') + 2))
}

function LocationHtml5Url(appBase, basePrefix){
    this.$$html5 = true
    basePrefix = basePrefix || ''

    var appBaseNoFile = stripFile(appBase)

    parseAbsoluteUrl(appBase, this, appBase)

    this.$$parse = function(url){
        var pathUrl = beginsWith(appBaseNoFile, url)

        if(!isString(pathUrl)){
            throw
        }
        parseAppUrl(pathUrl, this, appBase)

        if(!this.$$path) this.$$path = '/'

        this.$$compose()
    }

    this.$$compose = function(){
        var search = toKeyValue(this.$$search), 
            hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : ''
        
        this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash
        this.$$absUrl = appBaseNoFile + this.$$url.substr(1)
    }

    this.$$rewrite = function(url){
        var appUrl, prevAppUrl
        
        if((appUrl = beginsWith(appBase, url)) !== undefined){
            prevAppUrl = appUrl

            if((appUrl = beginsWith(basePrefix, appUrl)) !== undefined){
                return appBaseNoFile + (beginsWith('/', appUrl) || appUrl)
            }else{
                return appBase + prevAppUrl
            }
        }else if((appUrl = beginsWith(appBaseNoFile, url)) !== undefined){
            return appBaseNoFile + appUrl
        }else if(appBaseNoFile == url + '/'){
            return appBaseNoFile
        }
    }
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
    var hashPrefix = '',
        html5Mode = false

    this.hashPrefix = function(prefix){
        if(isDefined(prefix)){
            hashPrefix = prefix
            return this
        }else{
            return hashPrefix
        }
    }

    this.html5Mode = function(mode){
        if(isDefined(mode)){
            html5Mode = mode
            return this
        }else{
            return html5Mode
        }
    }

    // sniffer（探测器）
    this.$get = ['$rootScope', '$browser', '$sniffer', '$rootElement',
        function($rootScope, $browser, $sniffer, $rootElement){
            var location, locationMode,
                baseHref = $browser.baseHref(), // 如果 base[href] 是 undefined, 就把它设置为 ''
                initialUrl = $browser.url(),
                appBase

            if(html5Mode){
                appBase = serverBase(initialUrl) + (baseHref || '/')
                locationMode = $sniffer.history ? LocationHtml5Url : LocationHashbangInHtml5Url
            }else{
                appBase = stripHash(initialUrl)
                LocationMode = LocationHashbangUrl
            }

            $location = new LocationMode(appBase, '#' + hashPrefix)
            $location.$$parse($location.$$rewrite(initialUrl))

            $rootElement.on('click', function(event){
                // TODO: rewrite link when opening in new tab/window (in legacy browser)
                // currently we open nice url link and redirect then
                if(event.ctrlKey || event.mataKey || event.which == 2) return


            })
        }]
}

// 封装console.log info warn error，感觉没什么鸟用
function $LogProvider(){
    var debug = true, self = this

    this.debugEnabled = function(flag){
        if(isDefined(flag)){
            debug = flag
            return this
        }else{
            return debug
        }     
    }

    this.$get = ['$window', function($window){
        return {
            log: consoleLog('log'), 
            info: consoleLog('info'), 
            warn: consoleLog('warn'), 
            error: consoleLog('error'), 
            debug: (function(){
                var fn = consoleLog('debug')
                return function(){
                    if(debug){
                        fn.apply(self, arguments)
                    }
                }
            })()
        }

        function formatError(arg){
            if(arg instanceof Error){
                if(arg.stack){
                    arg = (arg.message && arg.stack.indexOf(arg.message) === -1) ?
                        'Error: ' + arg.message + '\n' + arg.stack : arg.stack
                }else if(arg.sourceURL){
                    arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line
                }
            }

            return arg
        }

        function consoleLog(type){
            var console = $window.console || {}, 
                logFn = cosole[type] || console.log || noop, 
                hasApply = false

            try{
                hasApply = !!logFn.apply
            }catch(e){}

            if(hasApply){
                return function(){
                    var args = []
                    forEach(arguments, function(arg){
                        args.push(formatError(arg))
                    })
                    return logFn.apply(console, args)
                }
            }
        }

        return function(arg1, arg2){
            logFn(arg1, arg2 == null ? '' : arg2)
        }
    }]
}

var $parseMinErr = minErr('$parse'),
    promiseWarningCache = {},
    promiseWarning

/////////////////
// 这下面的都好像是为了过滤 Angular {{expression}} 表达式
////////////////
function ensureSafeMemberName(name, fullExpression){
    // nifty check if obj is function that is fast and works across iframes and other contexts
    if(obj){
        if(obj.constructor === obj){ // constructor (构造函数)
            throw $parseMinErr('isecfn', 
                'Referencing Function in Angular expressions is disallowed! Expression: {0}', 
                fullExpression)
        }else if(obj.document && obj.location && obj.alert && obj.setInterval){ // isWindow(obj) 
            throw $parseMinErr('isecwindow', 
                'Referencing the Window in Angular expressions is disallowed! Expression: {0}', 
                fullExpression)    
        }else if(obj.children && (obj.nodeName || (obj.prop && obj.attr && obj.find))){ // isElement(obj)
            throw $parseMinErr('isecdom', 
                'Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}', 
                fullExpression)
        }else if(obj === Object){ // block Object so that we can't get hold of dangerous Object.*methods
            throw $parseMinErr('isecobj', 
                'Referencing Object in Angular expressions is disallowed! Expression: {0}', 
                fullExpression)
        } 
    }

    return obj
}

function ensureSafeObject(obj, fullExpression){
    if(name === '__defineGetter__' || name === '__defineSetter__' ||
        name === '__lookupGetter__' || name === '__lookupSetter__' ||
        name === '__proto__'){
        throw $parseMinErr('isecfld', 
            'Attempting to access a disallowed field in Angular expressions! Expression: {0}', 
            fullExpression)
    }

    return name
}

var CALL = Function.prototype.call,
    APPLY = Function.prototype.apply,
    BIND = Function.prototype.bind

function ensureSafeFunction(obj, fullExpression){
    if(obj){
        if(obj.constructor === obj){
            
        }else if(obj === CALL || obj === APPLY || (BIND && obj === BIND)){
            
        }
    }
}

// operators (运算符)
var OPERATORS = {},

    ESCAPE = {'n': '\n', 'f': '\f', 'r': '\r', 't': '\t', 'v': '\v', "'": "'", '"': '"'}

// lexer (词法分析程序), 为 Lexer 添加一个属性，属性名和值都是给定的参数
var Lexer = function(options){
    this.options = options
}

Lexer.prototype = {
    constructor: Lexer, 

    lex: function(text){
        this.text = text
        this.index = 0
        this.ch = undefined
        this.lastCh = ':' // can start regexp
        this.tokens = []

        while(this.index < this.text.length){
            this.ch = this.text.charAt(this.index)
            
            if(this.is('"\'')){
                this.readString(this.ch)
            }
        }
    }, 

    is: function(chars){
        return chars.indexOf(this.ch) !== -1
    }, 

    was: function(chars){
        return chars.indexOf(this.lastCh) !== -1
    }, 

    peek: function(i){
        var num = i || 1
        return (this.index + num < this.text.length) ? this.text.charAt(this.index + num) : false
    }, 

    isNumber: function(ch){
        return '0' <= ch && ch <= '9'
    }, 

    isWhitespace: function(ch){
        // IE treats non-breaking space as \u00A0  IE 会把空格当成 \u00A0
        return ch === ' ' || ch === '\r' || ch === '\t' || ch === '\n' || ch === '\v' || ch === '\u00A0'
    }, 

    isIdent: function(ch){
        return 'a' < ch && ch <= 'z' || 
            'A' <= ch && ch <= 'Z' || 
            '_' === ch || ch === '$'
    }, 

    isExpOperator: function(ch){
        return ch === '-' || ch === '+' || this.isNumber(ch)
    }, 

    throwError: function(error, start, end){
        end = end || this.index
        
        var colStr = isDefined(start) ? 
            's ' + start + '-' + this.index + ' [' + this.text.substring(start, end) + ']' :
            ' ' + end

        throw $parseMinErr('lexerr', 'Lexer Error: {0} at column{1} in expression [{2}].', error, colStr, this.text)
    },

    readNumber: function(){
        var number = '', start = this.index

        while(this.index < this.text.length){
            var ch = lowercase(this.text.charAt(this.index))

            if(ch == '.' || this.isNumber(ch)){
                number += ch
            }else{

            }

            this.index++
        }

        number = 1 * number // 常用，转化格式为 number
        this.tokens.push({
            index: start, 
            text: number, 
            literal: true, 
            constant: true, 
            fn: function(){ return number }
        })
    }, 

    readIdent: function(){
        
    }, 

    readString: function(quote){
        
    }
}

// parser (语法分析器), 就是用在 {{}}，用来解析里面的 expression, 
// 可以说 angular 用 js 实现了一个语法编译器，非常nb
// 但是不支持 if while 等比较高级的语法，只能支持 加减乘除等简单的
var Parser = function(lexer, $filter, options){
    this.lexer = lexer
    this.$filter = $filter
    this.options = options
}

Parser.ZERO = extend(function(){
    return 0
}, {
    constant: true
})

Parser.prototype = {
    curstructor: Parser, 

    parse: function(text){
        this.text = text
        this.tokens = this.lexer.lex(text)
        
        var value = this.statements()

        if(this.tokens.length !== 0){
            this.throwError('is an unexcepted token', this.tokens[0])
        }

        value.literal = !!value.literal
        value.constant = !!value.constant

        return value
    }, 

    primary: function(){
        
    }, 

    throwError: function(msg, token){
        
    }, 

    peekToken: function(){
        
    }, 
    
    peek: function(e1, e2, e3, e4){
        
    }, 
    
    expect: function(e1, e2, e3, e4){
        
    }, 

    consume: function(e1){
        
    }, 

    unaryFn: function(fn, right){
        
    }, 
    
    // ternary (三元的)
    ternaryFn: function(left, middle, right){
        
    }, 
    
    // binary (二进制的，二元的)
    binaryFn: function(left, fn, right){
        
    }, 

    statements: function(){
        
    }, 

    filterChain: function(){
        var left = this.expression(), token

        while(true){
            if(token = this.expect('|')){
                left = this.binaryFn(left, token.fn, this.filter)
            }else{
                return left
            }
        }
    }, 

    filter: function(){
        
    }, 

    expression: function(){
        
    }, 

    assignment: function(){
        
    }, 

    ternary: function(){
        
    }, 

    logicalOR: function(){
        
    }, 

    logicalAND: function(){
        
    }, 

    equality: function(){
        
    }, 

    relational: function(){
        
    }, 

    additive: function(){
        
    }, 

    muliplicative: function(){
        
    }, 

    unary: function(){
        
    }, 

    fieldAccess: function(object){
        
    }, 

    objectIndex: function(obj){
        
    }, 

    functionCall: function(fn, contextGetter){
        
    }, 

    arrayDeclaration: function(){
        
    }, 

    object: function(){
        
    }
}

/////////////////////
// Parrser helper functions,  Parser 函数的辅助函数
////////////////////
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

// 非常复杂蛋疼
function $RootScopeProvider(){
    var TTL = 10,
        $rootScopeMinErr = minErr('$rootScope'),
        lastDirtyWatch = null

    this.disgestTtl = function(value){
        if(arguments.length) TTL = value

        return TTL
    }

    this.$get = ['$injector', '$expectionHandler', '$parse', '$browser', function('$injector', '$expectionHandler', '$parse', '$browser'){
        function Scope(){
            this.$id = nextUid()
            this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling =
                this.$$prevSibling = this.$$childHead = this.$$childTail = null
            this['this'] = this.$root = this
            this.$$destoryed = false
            this.$$asyncQueue = []
            this.$$postDigestQueue = []
            this.$$listeners = {}
            this.$$listenerCount = {}
            this.$$isolateBindings = {}
        }

        Scope.prototype = {
            constructor: Scope,

            $new: function(isolate){
                var ChildScope, child

                if(isolate){
                    child = new Scope()
                    child.$root = this.$root
                    child.$$asyncQueue = this.$$asyncQueue
                    child.$$postDigestQueue = this.$$postDigestQueue
                }else{
                    if(!this.$$childScopeClass){
                        this.$$childScopeClass = function(){
                            this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null
                            this.$$listeners = {}
                            this.$$listenerCount = {}
                            this.$id = nextUid()
                            this.$$childScopeClass = null
                        }
                        this.$$childScopeClass.prototype = this
                    }

                    child = new this.$$childScopeClass()
                }

                child['this'] = child
                child.$parent = this
                child.$$prevSibling = this.$$childTail

                if(this.$$childHead){
                    this.$$childTail.$$nextSibling = child
                    this.$$childTail = child
                }else{
                    this.$$childHead = this.$$childTail = child
                }

                return child
            },

            $watch: function(watchExp, listener, objectEquality){

            },

            $watchCollection: function(obj, listener){

            },

            // digest (消化)
            $digest: function(){

            },

            $destory: function(){

            },

            $eval: function(expr, locals){

            },

            $evalAsync: function(expr){

            },

            $$postDigest: function(fn){

            },

            $apply: function(expr){

            },

            $on: function(name, listener){

            },

            $emit: function(name, args){

            },

            $broadcast: function(name, args){

            }
        }

        var $rootScope = new Scope()

        return $rootScope

        function beginPhase(phase){

        }

        function clearPhase(){

        }

        function compileToFn(){

        }

        function decrementListenerCount(current, count, name){

        }

        function initWatchVal(){

        }
    }]
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
    var formats = $locale.NUMBER_FORMATS
    return function(amount, currencySymbol){
        if(isUndefined(currencySymbol)) currencySymbol = formats.CURRENCY_SYM
        return formatNumber(amout, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, 2).replace(/\u00A4/g, currencySymbol) // \u00A4 指的是货币符号
    }
}

numberFilter.$inject = ['$locale']
function numberFilter($locale){
    var formats = $locale.NUMBER_FORMATS
    return function(number, fractionSize){
        return formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize)
    }
}

var DECIMAL_SEP = '.'

function formatNumber(){

}

function padNumber(){

}

function dateGetter(name, size, offset, trim){
    offset = offset || 0

    return function(date){
        var value = date['get' + name]()

        if(offset > 0 || value > -offset) value += offset
        if(avlue === 0 && offset == -12) value = 12
        
        return padNumber(value, size, trim)
    }
}

function dateStrGetter(name, shortForm){
    return function(date, formats){
        var value = date['get' + name](),
            get = uppercase(shortForm ? ('SHORT' + name) : name)
    }
}

// 时区咯，跟国际化有关
function timeZoneGetter(date){
    var zone = -1 * date.getTimezoneOffset(), 
        paddedZone = (zone >= 0) ? '+' : ''

    paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) + padNumber(Math.abs(zone %60), 2)
}

// 转换 am pm 的格式咯
function ampmGetter(date, formats){
    return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1]
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

// 直接调用的原生 js 的 toJson
function jsonFilter(){
    return function(obj){
        return toJson(obj, true)
    }
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
        // 首先如果不是数组和 string就立刻返回了
        if(!isArray(input) && !isString(input)) return input

        if(Math.abs(Number(limit)) === Infinity){
            limit = Number(limit)
        }else{
            limit = int(limit)
        }
        
        // 切割字符串咯
        if(isString(input)){
            if(limit){
                return limit >= 0 ? input.slice(0, limit) : input.slice(limit, input.length)
            }else{
                return ''
            }
        }
        
        // 处理数组咯，也很简单
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

// 相对比较复杂的 orderBy
orderByFilter.$inject = ['$parse']
function orderByFilter($parse){
    if(!isArray(array)) return array
    if(!sortPredicate) return array
    
    sortPredicate = isArray(sortPredicate) ? sortPredicate: [sortPredicate]
    sortPredicate = map(sortPredicate, function(predicate){
        var descending = false, get = predicate || identity

        if(isString(predicate)){
            if((predicate.charAt(0) == '+' || predicate.charAt(0) == '-')){
                descending = predicate.charAt(0) == '-'
                predicate = predicate.substring(1)
            }
            get = $parse(predicate)
            if(get.constant){
                var key = get()
                return reverseComparator(function(a, b){
                    return compare(a[key], b[key])
                }, descending)
            }
        }
        return reverseComparator(function(a, b){
            return compare(get(a), get(b))
        }, rescending)
    })
    
    var arrayCopy = []
    for(var i = 0; i < array.length; i++){ arrayCopy.push(array[i]) }
    return arrayCopy.sort(reverseComparator(comparator, reverseOrder))

    function comparator(o1, o2){
        for(var i = 0; i < sortPredicate.length; i++){
            var comp = sortPredicate[i](o1, o2)
            if(comp !== 0) return comp
        }
        return 0
    }
    
    function reverseComparator(comp, descending){
        return toBoolean(descending) ? function(a, b){return comp(b, a)} : comp
    }

    function compare(v1, v2){
        var t1 = typeof v1, t2 = typeof v2

        if(t1 == t2){
            if(t1 == 'string'){
                v1 = v1.toLowerCase()
                v2 = v2.toLowerCase()
            }
            
            if(v1 === v2) return 0
            return v1 < v2 ? -1 : 1
        }else{
            return t1 < t2 ? -1 ：1
        }
    }
}

function ngDirective(directive){
    if(isFunction(directive)){
        directive = { link: directive }
    }

    directive.restrict = directive.restrict || 'AC'
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

    URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1})\w*@)?(\S+)(: [0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,

    EMAIL_REGEXP = //i,
    
    // 前面有 + - 号，后面有小数点咯
    NUMBER_REGEXP = /^\s*(\-\+)?(\d+|(\d*(\.\d*)))\s*$/ 

    inputType = {}


///////////////////
// 表单验证
//////////////////
function validate(ctrl, validatorName, validity, value){
    ctrl.$setValidity(validatorName, validity)

    return validity ? value : undefined
}

// 用处不明
function testFlags(validity, flags){
    var i, flag,
        len = flags.length

    if(flags){
        for( i = 0; i < len; i++){
            flag = flags[i]

            if(validity[flag]){
                return true
            }
        }
    }

    return false
}

function addNativeHtml5Validators(ctrl, validatorName, badFlags, ignoreFlags, validity){
    if(isObject(validity)){
        ctrl.$$hasNativeValidators = true

        var validator = function(value){
            if(!ctrl.$error[validatorName] &&
                !tsetFlags(validity, ignoreFlags) &&
                testFlags(validity, badFlags)){
                ctrl.$setValidity(validatorName, false)

                return
            }

            return value
        }

        ctrl.$parsers.push(validator)
    }
}

function textInputType(scope, element, attr, ctrl, $sniffer, $browser){
    var validity = element.prop(VALIDITY_STATE_PROPERTY),
    // 第183行记载 var VALIDITY_STATE_PROPERTY = 'validity',
    // 貌似就只用到这一次诶
        placeholder = element[0].placeholder,
        noevent = {}

    ctrl.$$validityState = validity

    if(!$sniffer.android){
        var composing = false

        element.on('compositionstart', function(data){
            composing = true
        })

        element.on('compositionend', function(){
            composing = false
            listener()
        })
    }

    var listener = function(ev){
        if(composing){
            return
        }

        var value = element.val()

        if(msie && (ev || noevent).type === 'input' && element[0].placeholder !== placeholder){
            placeholder = element[0].placeholder
            return
        }

        if(toBoolean(attr.ngTrim || 'T')){
            value = trim(value)
        }

        var revalidate = validity && ctrl.$$hasNativeValidators

        if(ctrl.$viewValue !== value || (value === '' && revalidate)){
            if(scope.$$phase){
                ctrl.$setViewValue(value)
            }else{
                scope.$apply(function(){
                    ctrl.setViewValue(value)
                })
            }
        }
    }

    if($sniffer.hasEvent('input')){
        element.on('input', listener)
    }else{
        var timeout,
            deferListener = function(){
                if(!timeout){
                    timeout = $browser.defer(function(){
                        listener()
                        timeout = null
                    })
                }
            }

        element.on('keydown', function(event){
            var key = event.keyCode

            // 这里感觉是要去查一下键盘的对应表
            if(key === 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                return
            }

            deferListener()
        })

        if($sniffer.hasEvent('paste')){
            element.on('paste cut', deferListener)
        }
    }

    element.on('change', listener)

    ctrl.$render = function(){
        element.val(ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue)
    }
    
    // pattern validator,  ng-pattern
    var pattern = attr.ngPattern, patternValidator, match
    if(pattern){
        var validateRegex = function(regexp, value){
            return validate(ctrl, 'pattern', ctrl.$isEmpty(value) || regexp.test(value), value)
        }

        match = pattern.match(/^\/(.*)\/([gim]*)$/)
        if(match){
            pattern = new RegExp(match[1], match[2])
            patternValidator = function(value){
                return validateRegex(pattern, value)
            }
        }else{
            patternValidator = function(value){
                var patternObj = scope.$eval(pattern)

                if(!patternObj || !patternObj.test){
                    
                }
                return validateRegex(patternObj, value)
            }
        }

        ctrl.$formatters.push(patternValidator)
        ctrl.$parsers.push(patternValidator)
    }

    // minlength
    if(attr.ngMinlength){
        var minlength = int(attr.ngMinlength), 
            minLengthValidator = function(value){
                return validate(ctrl, 'minlength', ctrl.$isEmpty(value) || value.length >= minlength, value)
            }

        ctrl.$parsers.push(minLengthValidator)
        ctrl.$formatters.push(minLengthValidator)
    }

    // maxlength
    if(attr.ngMaxlength){
        var maxlength = int(attr.ngMaxlength), 
            maxLengthValidator = function(value){
                return validate(ctrl, 'maxlength', ctrl.$isEmpty(value) || value.length <= maxlength, value)
            }

        ctrl.$parsers.push(maxLengthValidator)
        ctrl.$formatters.push(maxLengthValidator)
    }
}

var numberBadFlags = ['badInput']

function numberInputType(){

}

function urlInputType(scope, elem, attr, ctrl, $sniffer, $browser){
    textInputType(scope, elem, attr, ctrl, $sniffer, $browser)

    var urlValidator = function(value){
        return validate(ctrl, 'url', ctrl.$isEmpty(value) || URL_REGEXP.test(value), value)
    }

    ctrl.$formatters.push(urlValidator)
    ctrl.$parsers.push(urlValidator)
}

function emailInputType(scope, elem, attr, ctrl, $sniffer, $browser){
    textInputType(scope, elem, attr, ctrl, $sniffer, $browser)

    var emailValidator = function(value){
        return validate(ctrl, 'email', ctrl.$isEmpty(value) || EMAIL_REGEXP.test(value), value)
    }

    ctrl.$formatters.push(emailValidator)
    ctrl.$parsers.push(emailValidator)
}

function radioInputType(scope, elem, attr, ctrl){
    // make the name unique, if not defined
    if(isUndefined(attr.name)){
        elem.attr('name', nextUid())
    }

    elem.on('click', function(){
        if(elem[0].checked){
            scope.$apply(function(){
                ctrl.$setViewValue(attr.value)
            })
        }
    })

    ctrl.$render = function(){
        var value = attr.value
        
        elem[0].checked = (value == ctrl.$viewValue)
    }

    attr.$observe('value', ctrl.$render)
}

function checkboxInputType(scope, elem, attr, ctrl){
    var trueValue = attr.ngTrueValue, 
        falseValue = attr.ngFalseValue

    if(!isString(trueValue)) trueValue = true
    if(!isString(falseValue)) falseValue = false

    elem.on('click', function(){
        scope.$apply(function(){
            ctrl.$setViewValue(elem[0].checked)
        })
    })

    ctrl.$render = function(){
        elem[0].checked = ctrl.$viewValue
    }

    // override the standard '$isEmpty' because a value of 'false' means empty in a checkbox
    ctrl.$isEmpty = function(value){
        return value !== trueValue
    }

    ctrl.$formatters.push(function(value){
        return value === trueValue
    })

    ctrl.$parsers.push(function(value){
        return value ? trueValue : false
    })
}

/*
表单指令有许多
属于 textarea 的有：
ngModel, name, required, ngRequired, ngMinlength, ngMaxlenght, ngPattern (模式), ngChange, [ngTrim=true]

属于 input 的有
ngModel, name, required, ngRequired, ngMinlength, ngMaxlength, ngPattern, ngChange
*/





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
    PRISTINE_CLASS = 'ng-pristine', // pristine （原始的）
    DIRTY_CLASS = 'ng-dirty'

var NgModelController = ['$scope', '$exceptionHandler', '$attrs', '$element', '$parse', '$animate',
    function($scope, $exceptionHandler, $attr, $element, $parse, $animate){
        this.$viewValue = Number.NaN
        this.$modelValue = Number.NaN
        // 这个 $parsers 和 formatters 在后面很多用，就是空数组啊
        this.$parsers = []
        this.$formatters = []
        this.$viewChangeListeners = []
        this.$pristine = true // $pristine 指没有输入过内容
        this.$dirty = false // $dirty 指输入过内容，内容发生变化 
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

// \d+ 匹配任意数字一次或多次 constant value (不变的数)
var CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/
 
// ng-value 指令  
var ngValueDirective = function(){
    return {
        priority: 100, 
        compile: function(tpl, tplAttr){
            if(CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue)){
                return function ngValueConstantLink(scope, elm, attr){
                    attr.$set('value', scope.$eval(attr.ngValue))
                }
            }else{
                return function ngValueLink(scope, elm, attr){
                    scope.$watch(attr.ngValue, function valueWatchAction(value){
                        attr.$set('value', value)
                    })
                }
            }
        }
    }
}

// ng-bind 指令
var ngBindDirective = function(){
    compile: function(templateElement){
        templateElement.addClass('ng-binding')

        return function(scope, elem, attr){
            elem.data('$binding', attr.ngBind)
            scope.$watch(attr.ngBind, function ngBindWatchAction(value){
                elem.text(value == undefined ? '' : value)
            })
        }
    }
}

// ng-bind-template 指令，可以在里面写多个 {{ }} 解释器
var ngBindTemplateDirective = ['$interpolate', function($interpolate){
    return function(scope, elem, attr){
        var interpolateFn = $interpolate(elem.attr(attr.$attr.ngBindTemplate))

        elem.addClass('ngBindTemplate', function(value){
            elem.text(value)
        })
    }
}]

// ng-bind-html 指令，可以把 html 字符串当做 html dom 来写到页面上
// 需要引入 angular-sanitize.js
var ngBindHtmlDirective = ['$sce', '$parse', function($sce, $parse){
    return function(scope, elem, attr){
        elem.addClass('ng-binding').data('$binding', attr.ngBindHtml)

        var parsed = $parse(attr.ngBindHtml)

        function getStringValue(){
            return (parsed(scope) || '').toString()
        }

        scope.$watch(getStringValue, function ngBindHtmlWatchAction(value){
            elem.html($sce.getTrustedHtml(parsed(scope)) || '')
        })
    }
}]

// ngClass指令
function classDirective(name, selector){
    name = 'ngClass' + name

    return ['$animate', function($animate){
        return {
            restrict: 'AC',  // restrict (限制，约束)
            link: function(scope, elem, attr){
                var oldVal

                scope.$watch(attr[name], ngClassWatchAction, true)

                attr.$observe('class', function(value){
                    ngClassWatchAction(scope.$eval(attr[name]))
                })

                if(name !== 'ngClass'){
                    scope.$watch('$index', function($index, old$index){
                        var mod = $index & 1

                        if(mode !== (old$index & 1)){
                            var classes = arrayClasses(scope.$eval(attr[name]))

                            mod === selector ? addClasses(classes) : removeClass(classes)
                        }
                    })
                }

                function addClass(classes){
                    var newClasses = digestClassCounts(classes, 1)
                    attr.$addClass(newClasses)
                }

                function removeClass(classes){
                    var newClasses = digestClassCounts(classes, -1)
                    attr.$removeClass(newClasses)
                }

                function digestClassCounts(classes, count){
                    var classCounts = elem.data('$classCounts') || {}, 
                        classesToUpdate = []

                    forEach(classes, function(className){
                        if(count > 0 || classCounts[className]){
                            classCounts[className] = (classCounts[className] || 0) + count

                            if(classCounts[className] === +(count > 0)){
                                classesToUpdate.push(className)
                            }
                        }
                    }){}

                    elem.data('$classCounts', classCounts)

                    return classesToUpdate.join(' ')
                }
                
                function updateClasses(oldClasses, newClasses){
                    var toAdd = arrayDifference(newClasses, oldClasses), 
                        toRemove = arrayDifference(oldClasses, newClasses)

                    toRemove = digestClassCounts(toRemove, -1)
                    toAdd = digestClassCounts(toAdd, 1)

                    if(toAdd.length === 0){
                        $animate.removeClass(elem, toRemove)
                    }else if(toRemove.length === 0){
                        $animate.addClass(elem, toAdd)
                    }else{
                        $animate.setClass(elem, toAdd, toRemove)
                    }
                }

                function ngClassWatchAction(newVal){
                    if(selector === true || scope.$index % 2 === selector){
                        var newClasses = arrayClasses(newVal || [])

                        if(!oldVal){
                            
                        }else if(!equals(newVal, oldVal)){
                            
                        }
                    }

                    oldVal = shallowCopy(newVal)
                }
            }
        }

        function arrayDifference(tokens1, tokens2){
            var values = []
            
            // wtf 这个 outer: 是啥玩意
            outer: 
            for( var i = 0; i < tokens1.length; i++){
                var token = tokens1[i]
                
                for( var j = 0; j < tokens2.length; j++){
                    if(token == tokens2[j]){
                        continue outer
                    }
                }

                values.push(token)
            }

            return values
        }
        
        function arrayClasses(classVal){
            if(isArray(classVal)){
                return classVal
            }else if(isString(classVal)){
                return classVal.split(' ')
            }else if(isObject(classVal)){
                var classes = [], i = 0

                forEach(classVal, function(v, k){
                    if(v){
                        classes = classes.concat(k.split(' '))
                    }
                })

                return classes
            }

            return classVal
        }
    }]
}

///////////////////////
// ngClass directive
//////////////////////
var ngClassDirective = classDirective('', true)

var ngClassOddDirective = classDirective('Odd', 0)

var ngClassEvenDirective = classDirective('Even', 1)

/*
这个在 angular最后也有，为的是防止 ng 在还没解释完 {{  }} 这个里面的内容的时候 {{  }} 符号显示出来，
你可以多刷新几次试试看，会很大概率看到的
cloak (斗篷), 可以理解为隐形斗篷把，其实就是 display: none!important 啦
*/
var ngCloakDirective = igDirective({
    compile: function(element, attr){
        attr.$set('ngCloak', undefined)
        element.removeClass('ng-cloak')
    }
})

var ngControllerDirective = [function(){
    return {
        scope: true, controller: '@', priority: 500 // priority (优先级)
    }
}]

var ngEventDirectives = {}

forEach('click dblclick mousedown mouseup mouseout mouseover mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy paste'.split(' '), function(name){
    var directiveName = directiveNormalize('ng-' + name)

    ngEventDirectives[directiveName] = ['$parse', function($parse){
        return {
            compile: function($element, attr){
                var fn = $parse(attr[directiveName])

                return function ngEventHandler(scope, element){
                    element.on(lowercase(name), function(event){
                        scope.$apply(function(){
                            fn(scope, {$event: event})
                        })
                    })
                }
            }
        }
    }]
})

var ngIfDirective = ['$animate', function($animate){
    return {
        transclude: 'element',
        priority: 600,
        terminal: true,
        restrict: 'A',
        $$tlb: true,
        // 这个 link 出现多次，自定义指令里经常要用的
        link: function($scope, $element, $attr, ctrl, $transclude){
            var block, childScope, previousElements

            $scope.$watch($attr.ngIf, function ngIfWatchAction(value){
                if(toBoolean(value)){
                    if(!childScope){
                        childScope = $scope.$new()
                        $transclude(childScope, function(clone){
                            clone[clone.length++] = document.createComment(' end ngIf: ' + $attr.ngIf + ' ')
                            block = {clone: clone}
                            $animate.enter(clone, $element.parent(), $element)
                        })
                    }
                }else{
                    if(previousElements){
                        previousElements.remove()
                        previousElements = null
                    }

                    if(childScope){
                        childScope.$destory()
                        childScope = null
                    }

                    if(block){
                        previousElements = getBlockElements(block.clone)
                        $animate.leave(previousElements, function(){
                            previousElements = null
                        })
                        block = null
                    }
                }
            })
        }
    }
}]

var ngIncludeDirective = ['$http', '$templateCache', '$anchorScroll', '$animate', '$sce',
    function($http, $template, $anchorScroll, $animate, $sce){
        return {
            restrict: 'ECA',
            priority: 400,
            terminal: true,
            transclude: 'element',
            controller: angular.noop,
            compile: function(element, attr){
                var srcExp = attr.ngInclude || attr.src,
                    onloadExp = attr.onload || '',
                    autoScrollExp = attr.autoscroll

                return function(scope, $element, $attr, ctrl, $transclude){
                    var changeCounter = 0,
                        currentScope, previousElement, currentElement,

                    var cleanupLastIncludeContent = function(){
                        if(previousElement){
                            previousElement.remove()
                            previousElement.null
                        }

                        if(currentScope){
                            currentScope.$destory()
                            currentScope = null
                        }

                        if(currentElement){
                            $animate.leave(currentElement, function(){
                                previousElement = null
                            })
                            block = null
                        }
                    }
                }
            }
        }
    }]

var ngIncludeFillContentDirective = ['$compile', function($compile){
    return {
        restrict: 'ECA',
        priority: -400,
        require: 'ngInclude',
        link: function(scope, $element, $attr, ctrl){
            $element.html(ctrl.template)
            $compile($element.contents())()
        }
    }
}]

var ngInitDirective = ngDirective({
    priority: 450, 
    compile: function(){
        return {
            pre: function(scope, elem, attrs){
                scope.$eval(attrs.ngInit)
            }
        }
    }
})

// 用法在DOM元素里加 ng-non-bindable就可以使这个元素不会被绑定数据，不会解析 {{ }} 里的 expression 了
// terminal (终点，端点) priority (优先级)
var ngNonBindableDirective = ngDirective({terminal: true, priority: 1000})

// pluralize (复数) 用处不明
var ngPluralizeDirective = ['$locale', '$interpolate', function($locale, $interpolate){

}]

// 非常酷炫的指令了应该算
var ngRepeatDirective = ['$parse', '$animate', function($parse, $animate){

}]

var ngShowDirective = ['$animate', function($animate){
    return function(scope, element, attr){
        scope.$watch(attr.ngShow, function ngShowWatchAction(value){
            $animate[toBoolean(value) ? 'removeClass' : 'addClass'](element, 'ng-hide')
        })
    }
}]

// .ng-hide{
//     display: block!important;
//     position: absolute;
//     top: -9999px;
//     left: -9999px
// }
// 这招 jquery 里好像也有哦
var ngHideDirective = ['$animate', function($animate){
    return function(scope, element, attr){
        scope.$watch(attr.ngHide, function ngHideWatchAction(value){
            $animate[toBoolean(value) ? 'addClass', 'removeClass'](element, 'ng-hide')
        })
    }
}]

// $watch 注意这个会监视 style 的变化
var ngStyleDirective = ['$animate', function($animate){
    scope.$watch(attr.ngStyle, function ngStyleWatchAction(newStyles, oldStyles){
        if(oldStyles && (newStyles !== oldStyles)){
            forEach(oldStyles, function(val, style){
                element.css('style', '')
            })
        }
        
        if(newStyles){
            element.css(newStyles)
        }
    }, true)
}]

var ngSwitchDirective = ['$animate', function($animate){
    return {
        restrict: 'AE', // restrict （约束，限定）
        require: 'ngSwitch', 
        controller: ['$scope', function ngSwitchController(){
            this.cases = {}
        }], 
        link: function(scope, element, attr, ngSwitchController){
            var watchExpr = attr.ngSwitch || attr.on, 
                selectedTranscludes = [], 
                selectedElements = [], 
                previousElements = [], 
                selectedScopes = []
            
            scope.$watch(watchExpr, function ngSwitchWatchAction(value){
                var i, len
                
                for(i = 0, len = previousElements.length; i < len; i++){
                    previousElements[i].remove()
                }
                previousElements.length = 0

                for(i = 0, len = selectedScopes.length; i < len; i++){
                    var selected = selectedElements[i]

                    selectedScopes[i].$destory()
                    previousElements[i] = selected
                    $animate.leave(selected, function(){
                        previousElements.splice(i, 1)
                    })
                }
                selectedElements.length = 0
                selectedScopes.length = 0

                if(){
                    
                }
            })
        }
    }
}]

var ngSwitchWhenDirective = ngDirective({
    transclude: 'element', 
    priority: 800, 
    require: '^ngSwitch', 
    link: function(scope, element, attrs, ctrl, $transclude){
        ctrl.cases['!' + attrs.ngSwitchWhen] = (ctrl.cases['!' + attrs.ngSwitchWhen] || [])
        ctrl.cases['!' + attrs.ngSwitchWhen].push({ transclude: $transclude, element: element })
    }
})

var ngSwitchDefaultDirective = ngDirective({
    transclude: 'element', 
    priority: 800, 
    require: '^ngSwitch', 
    link: function(scope, element, attr, ctrl, $transclude){
        ctrl.cases['?'] = (ctrl.cases['?'] || [])
        ctrl.cases['?'].push({ transclude: $transclude, element: element })
    }
})

var ngTranscludeDirective = ngDirective({
    link: function($scope, $element, $attrs, $controller, $transclude){
        if(!$transclude){
            throw minErr('ngTransclude')()
        }  

        $transclude(function(clone){
            $element.empty()
            $element.append(clone)
        })
    }
})

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
    var NG_OPTIONS_REGEXP = //, 
        nullModelCtrl = {$setViewValue: noop}

    return {
        restrict: 'E', 
        require: ['select', '?ngModel'], 
        controller: ['$element', '$scope', '$attrs', function($element, $scope, $attrs){
            var self = this, 
                optionsMap = {}, 
                ngModelCtrl = nullModelCtrl, 
                nullOption, 
                unknownOption
            
            self.databound = $attrs.ngModel

            self.init = function(ngModelCtrl_, nullOption_, unknownOption_){
                ngModelCtrl = ngModelCtrl_
                nullOption = nullOption_
                unknowOption = unknownOption_
            }
    
            self.addOption = function(value){
                
            }        

            self.removeOption = function(value){
                
            }

            self.renderUnknownOption = function(val){
                
            }

            self.hasOption = function(value){
                
            }

            $scope.$on('$destory', function(){
                self.renderUnkownOption = noop // noop 等待
            })
        }], 

        link: function(scope, element, attr, ctrls){
            // 如果 ngModel 是没有定义，就直接返回
            if(!ctrls[1]) return 

            var selectCtrl = ctrls[0], 
                ngModelCtrl = ctrls[1], 
                multiple = attr.multiple, 
                optionsExp = attr.ngOptions, 
                nullOption = false, // 如果是 false，用户不能选择这个option
                emptyOption, 
                optionTemplate = jqLite(document.createElement('option')), 
                optGroupTemplate = jqLite(document.createElement('optgroup')), 
                unknownOption = optionTemplate.clone()

            for(var i = 0, children = element.children(), ii = children.length; i < ii; i++){
                if(children[i].value === ''){
                    emptyOption = nullOption = children.eq(i)
                    break
                }
            }

            selectCtrl.init(ngModelCtrl, nullOption, unknowOption)

            // required validator
            if(multiple){
                ngModelCtrl.$isEmpty = function(value){
                    return !value || value.length === 0
                }
            }
        }
    }
}]

// ['$a', function($a){}] 这种写法其实就是依赖注入，同时可以防止文件压缩时变量名改变的bug

var optionDirective = ['$interpolate', function($interpolate){
    var nullSelectCtrl = {
        addOption: noop, 
        removeOption: noop
    }

    return {
        restrict: 'E', 
        priority: 100, 
        compile: function(element, attr){
            if(isUndefined(attr.value)){
                var interpolateFn = $interpolat(element.text(), true)
                if(!interpolateFn){
                    attr.$set('value', element.text())
                }
            }

            return function(scope, element, attr){
                var selectCtrlName = '$selectController', 
                    parent = element.parent(), 
                    selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName)

                if(selectCtrl && selectCtrl.databound){
                    element.prop('selected', false)
                }else{
                    selectCtrl = nullSelectCtrl
                }

                if(interpolateFn){
                    scope.$watch(interpolateF, function interpolateWatchAction(newVal, oldVal){
                        attr.$set('value', newVal)
                        
                        if(newVal !== oldVal){
                            selectCtrl.removeOption(oldVal)
                        }
                        selectCtrl.addOption(newVal)
                    })
                }else{
                    selectCtrl.addOption(attr.value)
                }

                element.on('$destory', function(){
                    selectCtrl.removeOption(attr.value)
                })
            }
        }
    }
}]

var styleDirective = valueFn({
    restrict: 'E',
    terminal: true
})

// angular的执行过程最后就是这四步
// 如果你在html里加载了2次以上 angualr.js 就会在控制台输出这个
if(window.angular.bootstrap){
    console.log('WARNING: Tried to load angular more than once.')
    return
}

bindJQuery()

publishExternalAPI(angular)

// 如果没有jquery就用jqLite初始化
jqLite(document).ready(function(){
    angularInit(document, bootstrap) 
})

})(window, document)


