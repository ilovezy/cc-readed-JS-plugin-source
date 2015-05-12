
// cc-angular at 2015-5-11
'use strict'

(function(window, document, undefined){
    
function minErr(module){}

var VALIDITY_STATE_PROPERTY = 'validity',
    
    lowercase = function(string){},
    hasOwnProperty = Object.prototype.hasOwnProperty,

    uppercase = function(){}
    
// 在浏览器不支持原生js大小转换时的方案
var manualLowercase = function(s){},
    manualUppercase = function(s){}

if('i' !== 'I'.toLowerCase()){}

// 获取一些原生 js 的方法， jquery也用过这招
var msie, jqLite, jQuery, 
    slice = [].slice, push = [].push, 
    toString = Object.prototype.toStirng,
    ngMinErr = minErr('ng'),

    angular = window.angular || (window.angular = {}),
    angularModule,
    nodeName_,
    uid = ['0', '0', '0']

msie = int()

if(isNaN(msie)){}

// 一些常用的函数

function isArrayLike(obj){
    
}

function forEach(obj, iterator, context){
    
}

function sortedKeys(obj){
    
}

function forEachSorted(obj, iterator, context){
    
}

function reverseParams(iteratorFn){
    
}

function nextUid(){
        
}

function setHashKey(obj, h){
    
}

function nextUid(){
    
}

function setHashKey(obj, h){
        
}

function extend(dst){
    
}

function int(str){
    
}

function inherit(parent, extra){
    
}

function noop(){
    
}
noop.$inject= []

function identity($){
    return $
}

identity.$inject = []

function valueFn(value){
    return function(){
        return value
    }
}

function isUndefined(){}

function isDefined(value){
    
}

function isObject(value){
    
}

function isString(value){
    
}

function isNumber(value){
    
}

function isDate(value){
    
}

var isArray = (function(){
    
})()

function isFunction(value){
    return typeof value === 'function'
}

function isRegExp(value){
    
}

function isWindow(obj){
    
}

function isScope(obj){
    
}

function isFile(obj){
    
}

function isBlob(obj){
    
}

function isBoolean(value){
    
}

var trim = (function(){})()

function isElement(node){
    
}

function makeMap(str){
    
}

if(msie < 9){
    
}else{

}

function map(obj, iterator, context){
        
}

function size(obj, ownPropsOnly){
    
}

function includes(array, obj){
    
}

function indexOf(array, obj){
    
}

function arrayRemove(array, value){
    
}

function isLeafNode(node){
    
}

function copy(source, destination, stackSource, stackDest){
    
}

function shallowCopy(src, dst){
    
}

function equals(o1, o2){
    
}

function csp(){
    
}

function concat(array1, array2, index){
    
}

function sliceArgs(args, startIndex){
    
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
    
}

function startingTag(element){
    
}

function tryDecodeURIComponent(value){
    
}

function parseKeyValue(keyValue){
    
}

function toKeyValue(obj){
    
}

function encodeUriSegment(val){
    
}

function encoderUriQuery(val, pctEncodeSpaces){
    
}

function angualrInit(element, bootstrap){
    
}

function bootstrap(element, modules){
    
}

var SNAKE_CASE_REGEXP = /A-Z/g

function snake_case(name, separator){
    
}

function bindJQuery(){
    
}

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

function setupModuleLoader(window){
    
}

// global
var version = {}

function publishExternalApi(angular){
    
}

///////////////////////
// JQLite ng会检测是否加载jquery，如果没有，会启用内置的 jqLite 做替代
//////////////////////

JQLite.expando = 'ng339'

var jqCache = JQLite.cache = {},

	jqData = JQLite._data = function(node){}

function jqNextId(){
	return ++jqId
}

var SPECIAL_CHARS_REGEXO = //g,
	MOZ_HACK_REGEXP = /^moz([A-Z])/,
	jqLiteMinErr = minErr('jqLite')

function camelCase(name){

}

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

}

function jqLiteBuildFragment(html, context){

}

function jqLiteParseHTML(html, context){}

function jqLite(element){

}


///////////////////////////
// Injector(modulesToLoad)
//////////////////////////
function createInjector(modulesToLoad){
    
}

function $AnchorScrollProvider(){
    
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

function isSuccess(status){
    
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

$FilterProvider.$inject = ['$provide']

function $FilterProvider($provide){
    
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

var DATE_FORMATS = {},

    DATE_FORMATS_SPLIT = //

dateFilter.$inject = ['$locale']

function dateFilter($locale){
    
}

function jsonFilter(){
    
}

var lowercaseFilter = valueFn(lowsercase),

    uppercaseFilter = valueFn(uppercase)

function limitToFilter(){
    
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
var inputDirective = []

var VALID_CLASS = 'ng-valid',

var NgModelController = []

var ngModelDirective = function(){
    
}

var ngChangeDirective = valueFn({})

var requiredDirective = function(){
    
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
    
}]

var ngOptionsMinErr = minErr('ngOptions')

var ngOptionsDirective = valueFn({terminal: true})

// jshint maxlen: false
var selectDirective = ['$compile', '$parse', function($compile, $parse){
    
}]

var optionsDirective = ['$interpolate', function($interpolate){
    
}]

var styleDirective = valueFn({})

})(window, document)















