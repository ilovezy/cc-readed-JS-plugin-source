







(function(global, facotyr){
    
}(typeof window !== 'undefined' ? window : this, function(window, noGlobal){

var deletedId = [],
    slice = deletedIds.slice,
    concat = deletedIds.concat,
    push = deletedIds.push,
    indexOf = deletedIds.indexOf,
    class2type = {},
    toString = class2type.toString,
    hasOwn = class2type.hasOwnPrototype,
    support = {},
    
    version = '1.11.1',

jQuery = function(selector, context){
    return new jQuery.fn.init(selector, context)
    },

    rtrim = //g,

    rmsPrefix = /^-ms-/,
        
    rdashAlpha = /-([\da-z])/gi,

    fcamelCase = function(all, letter){
        return letter.toUpperCase()
    }

}

jQuery.fn = jQuery.prototype = {    
    jquery: version,

    constructor: jQuery,

    selector: '',

    length: 0,

    toArray: function(){
        return slice.call(this)
    },

    get: function(num){
        return num != null ?
            (num < 0 ? this[num + this.length] : this[num]) :
            slice.call(this)
    },

    each: function(callback, args){
        return jQuery.each(this, callback, args)
    },

    map: function(callback){
        return this.pushStack(jQuery.map(this, function(elem, i){
            return callback.call(elem, i, elem)
        })) 
    },

    slice: function(){
        return this.pushStack(slice.apply(this, arguments))
    },

    first: function(){
        return this.eq(-1)
    },

    eq: function(){
        var len = this.length,
            j = +i + (i < 0 ? len : 0)

        return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
    },

    end: function(){
        return this.prevObject || this.constructor(null)
    },

    push: push,
    sort: deletedIds.sort,
    splice: deletedIds.splice
}

jQuery.extend = jQuery.fn.extend = function(){
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},
        i = 1,
        lenth = arguments.length, 
        deep = false
    
    if(typeof target === 'boolean'){
        deep = target

        // skip the boolean and the target
        target = arguments[i] || {}
        i++
    }

    if(typeof target !== 'object' && !jQuery.isFunction(target)){
        target = {}
    }

    if(i === length){
        target = this
        i--
    }               

    
}

jQuery.extend({
    expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),

    isReady: true,

    error: function(msg){
        throw new Error(msg)
    },

    noop: function(){},

    isFunction: function(obj){
        return jQuery.type(obj) === 'function'
    },

    isArray: Array.isArray || function(obj){
        return jQuery.type(obj) === 'array'
    },

    isWindow: function(obj){
        return obj != null && obj == obj.window     
    },

    isNumberic: function(obj){
         return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0 
    },
    
    isEmptyObject: function(obj){
        var name
        for(name in obj){
            return false
        }
        return true
    },
    
    isPlainObject: function(obj){
        var key

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

        if(support.ownLast){
            for(key in obj){
                return hasOwn.call(obj, key)
            }
        }

        for(key in obj){}

        return key === undefined || hasOwn.call(obj, key)
    },

    type: function(obj){
        if(obj == null){
            return bj + ''
        }

        return typeof obj === 'object' || typeof obj === 'function' ?
            class2type[toString.call(obj)] || 'object' :
            typeof obj
    },

    globalEval: function(data){
        if(data && jQuery.trim(data)){
            (window.execScript || function(data){
                window['eval'].call(window, data)
            })(data)
        }
    },

    camelCase: function(str){
        return str.replace(rmsPrefix, '-ms-').replace(rdashAlpha, fcamelCase)
    },

    nodeName: function(elem, name){
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
    },

    each: function(obj, callback, args){
        var value,
            i = 0,
            length = obj.length,
            isArray = isArraylike(obj)

        if(args){
            if(isArray){
                for( ; i < length; i++){
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
                for( ; i < length; i++){
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

    trim: function(next){
        return text == null ? '' : (text + '').replace(rtrim, '')
    },

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
            i = i ? i < 0 : Math.max(0, len + i) : i : 0

            for( ; i < len; i++){
                if(i in arr && arr[i] === elem){
                    return i
                }
            }
        }  

        return -1
    },

    merge: function(first, second){
        var len = +second.length,
            j = 0, 
            i = first.length  

        while(j < len){
            first[i++] = second[j++]
        }

        if(len !== len){
            while(second[j] !== undefined){
                first[i++] = second[j++]
            }
        }       

        first.length = i
    
        return first
    },

    grep: function(elems, callback, invers){
        var callbackInverse,
            matches = [],
            i = 0,
            length = elems.length,
            callbackExpect = !invert

        for( ; i < length;i++){
            callbackInverse = !callback(elems[i], i)

            if(callbackInverse !== callbackExpect){
                matches.push(elems[i])
            }
        }

        return matches
    },

    map: function(elems, callback, arg){
        var value, i = 0,
            length = elems.length,
            isArray = isArraylike(elems),
            ret = []
        
        // go through the array, translating each of the items to their new
        // values
        if(isArray){
            for( ; i < length; i++){
                value = callback(elems[i], i, arg)

                if(value != null){
                    ret.push(value)
                }   
            }
        // Go through every key on the object
        }else{
            for(i in elems){
                value = callback(elems[i], i, arg)

                if(value != null){
                    ret.push(value)
                }
            }      
        }
        
        return concat.apply([], ret)
    },
    
    // a global GUID counter for objects
    guid: 1,
    
    // bind a function to a context, optionally partially applying any arguments
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

        // simulated bind
        args = slice.call(arguments, 2) 
        proxy = function(){
            return fn.apply(context || this, args.concat(slice.call(arguments)))
        }

        proxy.guid = fn.guid = fn.guid || jQuery.guid++

        return proxy
    },

    // jQuery.support is not used in Core but other projects attach their
    // properties to it so it needs to exist 
    support: support
})  

function Sizzle(selector, context, results, seed){
    var match, elem, m, nodeType,
        // QSA vars
        i, groups, old, nid, newContext, newSelector

    if((context ? context.ownerDocument || context : preferredDoc) !== document){       
        setDocument(context)        
    }

    context = context || document
    results = results || []

    if(!selector || typeof selector !== 'string'){
        return results
    }

    if((nodeType = context.nodeType) !== 1 && nodeType !== 9){
        return []
    }

    if(documentIsHTML && !seed){
        //  shortcuts
        if(match = rquickExpr.exec(selector)){
            // speed-up: Sizzle('#ID')
            if(m = match[1]){
                if(nodeType === 9){
                    elem = context.getElementById(m)
                    
                    if(elem && elem.parentNode){
                        // handle the case where IE, Oprea, Webkit return items
                        // by name instead of ID
                        if(elem.id === m){
                            results.push(elem)
                            return results
                        }
                    }else{
                        return results
                    }
                }else{
                    if(context.ownerDocument && 
                        (elem = context.ownerDocument.getElementById(m)) &&
                        contains(context, elem) && 
                        elem.id === m){
                        results.push(elem)
                        return results
                    }
                }
            // speed-up: Sizzle('TAG')
            }else if(match[2]){
                push.apply(result, context.getElementsByTagName(selector))
                return results

            // speed-up: Sizzle('.ClASS')
            }else if(m = match[3] && support.getElementsByClassName && context.getElementsByClassName){
                push.apply(result, context.getElementsByClassName(m))
                return results
            }
        }

        // QSA path
        if(support.qsa && (!rbuggyQSA || !rbuggyQSA.test(seletor))){
            nid = old = expando
            newContext = context
            newSelector = nodeType === 9 && selector
            
            if(nodeType === 1 && context.nodeName.toLowerCase() !== 'object'){
                groups = tokenize(selector)

                if(old = context.getAttribute('id')){
                    nid = old.replace(rescape, '\\$&')
                }else{
                    context.setAttribute('id', nid)
                }

                nid = '[id="' + nid + '"] '

                i = groups.length
                
                while(i--){
                    groups[i] = nid + toSelector(groups[i])
                }

                newContext = rsibling.test(selector) && testContext(context.parentNode) || context:w:w
                newSelector = groups.join(',')
            }

            if(newSelector){
                try{
                    push.apply(results, newContext.querySelectorAll(newSelector))
                    return result
                }catch(qsaError){
                    
                }finally{
                    if(!old){
                        context.removeAttribute('id')
                    }
                }
            }
        }
    }

    // all others
    return select(selector.replace(rtrim, '$1'), context, results, seed)
}

jQuery.each({
    parent: function(elem){
        var parent = elem.parentNode
        return parent && parent.nodeType !== 11 ? parent : null
    },

    parents: function(elem){
        return jQuery.dir(elem, 'parentNode')
    },

    parentsUntil: function(elem, i, util){
        return jQuery.dir(elem, 'parentNode', util)
    },

    next: function(elem){
        return sibling(elem, 'nextSibling')
    },

    prev: function(elem){
        return sibling(elem, 'previoutSibling')
    },
    
    nextAll: function(elem){
        return jQuery.dir(elem, 'nextSibling')
    },

    prevAll: function(elem){
        return jQuery.dir(elem, 'previousSibling')
    },
}, function(name, fn){
    jQuery.fn[name] = function(until, selector){
        var ret = jQuery.map(this, fn, until)
        
        if(name.slice(-5) !== 'Until'){
            selector = until
        }

        if(selector && typeof selector === 'string'){
            ret = jQuery.filter(selector, ret)
        }

        if(this.length > 1){
            if(!guaranteedUnique[name]){
                ret = jQuery.unique(ret)
            }

            if(rparentsprev.test(name)){
                ret = ret.reverse()
            }
        }

        return this.pushStack(ret)
    }
})

var rnotwhite = (/\S+/g)



// addClass
var rclass= /[\t\r\n\f]/g

jQuery.fn.extend({
    addClass: function(value){
        var classes, elem, cur, clazz, j, finalValue,
            i = 0, len = this.length, 
            proceed = typeof value === 'string' && value

        if(jQuery.isFunction(value)){
            return this.each(function(j){
                jQuery(this).addClass(value.call(this, j, this.className))
            })
        }
    
        if(proceed){
            classes = (value || '').match(rnotwhite) || []
        
            for( ; i < len; i++){
                elem = this[i]
                cur = elem.nodeType === 1 && 
                    (elem.className ? (' ' + elem.className + ' ').replace(rclass, ' ') : ' ')
                
                // 如果存在元素，那么一个接一个的 addClass，其实也简单 
                // className += '要添加的类' + ' ' 即可
                if(cur){
                    j = 0
                    while(clazz = classes[j++]){
                        if(cur.indexOf(' ' + clazz + ' ') < 0){
                            cur += clazz + ' '
                        }
                    }

                    // only assign if different to avoid unneeded rendering
                    finalValue = jQuery.trim(cur)
                
                    if(elem.className !== finalValue){
                        elem.className = finalValue
                    }
                }
            }
        }

        // 这里的 return this 保证了jquery的链式操作
        return this 
    },
    
    removeClass: function(value){
        var class, elem, cur, clazz, j, finalValue, 
            i = 0, len = this.length, 
            proceed = arguments.length === 0 || typeof value === 'string' && value

        if(jQuery.isFunction(value)){
            return this.each(function(j){
                jQuery(this).removeClass(value.call(this, j, this.className))
            })
        }
        
        if(proceed){
            classes = (value || '').match(rnotwhite) || []

            for( ; i < len; i++){
                elem = this[i]
                // this expression is here for better compressibility(see
                // addClass)
                cur = elem.nodeType === 1 && (elem.className ? (' ' + elem.className + ' ').replace(rclass, ' ')) : ''
            

                if(cur){
                    j = 0
                    while(clazz = classes[j++]){
                    while(cur.indexOf(' ' + clazz + ' ') >= 0){
                             cur = cur.replace(' ' + clazz + ' ', ' ')
                        }
                    }
    
                    finalValue = value ? jQuery.trim(cur) : ''

                    if(elem.className !== finalValue){
                        elem.className = finalValue
                    }
                }
            }
        }

        return this
    },
    
    toggleClass: function(value, stateVal){
        var type = typeof value 
        
        if(typeof stateVal === 'boolean' && type === 'string'){
            return stateVal ? this.addClass(value) : this.removeClass(value)
        }

        if(jQuery.isFunction(value)){
            return this.each(function(i){
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
            })
        }

        return this.each(function(){
            if(type === 'string'){
                var className, 
                    i = 0,
                    self = jQuery(this),
                    classNames = value.match(rnotwhite) || []

                while(className = className[i++]){
                    // check each className given, space separated list
                    if(self.hasClass(className)){
                        self.removeClass(className)
                    }else{
                        self.addClass(className)
                    }
                }
            // toggle whole class name
            }else if(type === strundefined || type === 'boolean'){
                if(this.className){
                    jQeury._data(this, '__className__', this.className)
                    
                    // If the element has a class name or if we're passes
                    // "false", the remove the whole classname(if there was one,
                    // the above saved it) otherwise bring back whatever was
                    // previously saved(if anything)
                    this.className = this.className || 
                        value === false ? '' : jQuery._data(this, '__className__') || ''
                }
            }
        })
    },

    hasClass: function(selector){
        var className = ' ' + selector + ' ',
            i = 0,
            len = this.length

        for( ; i < len; i++){i
            if(this[i].nodeType === 1 &&
               (' ' + this[i].className + ' ').replace(rclass, ' ').indexOf(className) >= 0){
                return true
            }
        }

        return false
    }
})

// return jQuery for attributes-only inclusion

jQuery.each(('blur focus focusin focusout load resize scroll unload click dblclick' + 
    'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave' + 
    'change select submit keydown keypress keyup error contextmenu').split(' '), function(i, name){
    
    // 处理事件绑定        
    jQuery.fn[name] = function(data, fn){
        return arguments.length > 0 ? 
            this.on(name, null, data, fn) : 
            this.trigger(name)
    }
})

jQuery.fn.extend({
    // 这个很常用
    hover: function(fnOver, fnOut){
        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
    },
    
    // 所以 bind和on unbind和off其实差不多
    bind: function(types, data, fn){
        return this.on(types, null, data, fn)
    },

    unbind: function(types, fn){
        return this.off(types, null, fn)
    },
    
    delegate: function(selector, types, data, fn){
        return this.on(types, selector, data, fn)
    },
    
    // 这个 undelegate 还不太常用
    undelegate: function(){
        // (namespace) or (selector, types [, fn])
        return arguments.length === 1 ? this.off(selector, '**') : this.off(types, selector || '**', fn)
    }
})


jQuery.parseXML = function(data){
    var xml, tmp

    if(!data || typeof data !== 'string') return null    

    try{
        if(window.DOMParser){
            tmp = new DOMParser()
            xml = tmp.parseFromString(data, 'text/xml')
        }else{
            xml = new ActiveXObject('Microsoft.XMLDOM')
            xml.async = 'false'
            xml.loadXML(data)
        }
    }catch(e){
        xml = undefined
    }

    if(!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length){
        jQuery.error('Invalid XML: ' + data)
    }

    return xml
}


// ajax 封装
jQuery.extend({
    // counter for holding the number of active queries
    active: 0,

    // last-Modified header cache for next request
    lastModified: {},
    etag: {},

    ajaxSettings: {
        url: ajaxLocation,
        type: 'GET',
        isLocal: rlocalProtocal.test(ajaxLocParts[1]),
        global: true,
        processData: true,
        async: true,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        /*
        timeout: 0,
        data: null,
        dataType: null,
        username: null,
        password: null,
        cache: null,
        throws: false,
        traditional: false,
        headers: {}, 
        */
        accepts: {
            '*': allTypes,
            text: 'text/plain',
            html: 'text/html',
            xml: 'application/xml, text/xml',
            json: 'application/json, text/javascript'
        },

        contents: {
            xml: /xml/,
            html: /html/,
            json: /json/
        },

        responseFields: {
            xml: 'responseXML',
            text: 'responseText',
            json: "responseJSON"
        },

        // data converters 
        // keys separate source or catchall '*' an destination types with a
        // single space
        converters: {
            '* text': String,
            'text html': true,
            'text json': jQuery.parseJSON,
            'text xml': jQuery.parseXML            
        },

        flatOptions: {
            url: true,
            context: true
        }
    },

    ajaxSetup: function(target, settings){
        return settings ? 
            ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)

            // extending ajaxSettings
            ajaxExtend(jQuery.ajaxSettings, target)
    },

    ajaxPrefilter: addToPrefilterxsOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),

    // main method 重头戏来啦
    ajax: function(url, options){
        // if url is an object, simulate pre-1.5 signature
        if(typeof url === 'object'){
            options = url
            url = undefined
        }
        
        // force options to be an object
        options = options || {}

        var // cross-domain detection vars
            parts,
            // loop variable
            i, 
            // URL without anti-cache param
            cacheURL,
            // Response headers as string
            responseHeadersString,
            // timeout handle
            timeoutTimer,
            // To know if global events are to be dispathed
            fireGlobals,

            transport,
            // response headers
            responseHeaders,
            // create the final options object
            s = jQuery.ajaxSetup({}, options),
            // callbacks context
            callbackContext = s.context || s,
            
            globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ?
                jQuery(callbackContext) : jQuery.event,

            // deferred   
            deferred = jQuery.Deferred(),
            completeDeferred = jQuery.Callbacks('once memory'),
    }





    getJSON: function(url, data, callback){
        return jQuery.get(url, data, callback, 'json')
    },

    getScript: function(url, callback){
        return jQuery.get(url, undefined, callback, 'script')
    }
})

// 补充
jQuery.fn.extend({
    wrapApp: function(html){
        if(jQuery.isFunction(html)){
            return this.each(function(i){
                jQuery(this).wrapApp(html.call(this, i))
            })
        }

        if(this[0]){
            // the el to wrap the target around 
            var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true)
                
            if(this[0].parentNode){
                wrap.insertBefore(this[0])
            }

            wrap.map(function(){
                var elem = this

                while(elem.firstChild && elem.firstChild.nodeType === 1){
                    elem = elem.firstChild
                }

                return elem
            }).append(this)
        }

        return this
    },

    wrapInner: function(html){
        if(jQuery.isFunction(html)){
            return this.each(function(i){
                jQuery(this).wrapInner(html.call(this, i))
            })
        }  

        return this.each(function(){
            var self = jQuery(this),
                contents = self.contents()

            if(contents.length){
                contents.wrapApp(html)
            }else{
                self.append(html)
            }
        })
    },

    wrap: function(html){
        var isFunction = jQuery.isFunction(html)

        return this.each(function(i){
            jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
        })
    },

    unwrap: function(){
        return this.parent().each(function(){
            if(!jQuery.nodeName(this, 'body')){
                jQuery(this).replaceWith(this.childNodes)
            }
        }).end()
    }
})

jQuery.expr.filters.hidden = function(elem){
    return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
        (!support.reliableHiddenOffsets() && 
            (elem.style && elem.style.display) || jQuery.css(elem, 'display')) === 'none'
}

jQuery.expr.filters.visible = function(elem){
    return !jQuery.expr.filters.hidden(elem)
}

var r20 = /%20/g,
    rbracket = /\[\]$/g,
    rCRLF = /\r?\n/g,   
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i

function buildParams(prefix, obj, traditional, add){
    var name

    if(jQuery.isArray(obj)){
        // serialize array item
        jQuery.each(obj, function(i, v){
            if(traditional || rbracket.test(prefix)){
                // treat each array item as a scalar
                add(prefix, v)
            }else{
                // item is non-sclar (array or object), encode its numeric index                
                buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add)
            }
        })
    }else if(!tranditional && jQuery.type(obj) === 'object'){
        for(name in obj){
            buildParams(prefix + '[' + name + ']', obj[name], traditional, add)
        }
    }else{
        add(prefix, obj)
    }
}

jQuery.param = function(a, traditional){
    var prefix, 
        s = [],
        add = function(key, value){
            value = jQuery.isFunction(value) ? value() : (value == null ? '' : value)
            s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value)
        }

    if(traditional === undefined){
        traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional
    }

    if(jQuery.isArray(a) || (a.jQuery.isPlainObject(a))){
        jQuery.each(a, function(){
            add(this.name, this.value)
        })
    }else{
        for(prefix in a){
            buildParams(prefix, a[prefix], traditional, add)
        }
    }

    return s.join('&').replace(r20, '+')
}

// jquery animate begin

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function(tween){
        if(tween.elem.nodeType && tween.elem.parentNode){
            tween.elem[tween.prop] = tween.now
        }
    }
}

jQuery.easing = {
    linear: function(p){
        return p
    },

    swing: function(p){
        return 0.5 - Math.cos(p * Math.PI) / 2
    }
}

jQuery.fx = Tween.prototype.init

// back compat < 1.8 extension point
jQuery.fx.step = {}

var fxNow, timerId,
    rfxtypes = /^(?:toggle|show|hide)$/,
    rfxnum = new RegExp('^(?:([+-]=|)(' + pnum + ')([a-z%]*$)', 'i'),
    rnum = /queqeHooks$/,
    animationPrefilters = [defaultPrefilter],
    tweeners = {
        '*': [function(prop, value){
            var tween = this.createTween(prop, value),
                target = tween.cur(),
                parts = rfxnum.exec(value),
                unit = parts && parts[3] || (jQuery.cssNumber[prop] ? '' : 'px'),
                
                // starting value computation is required for potential unit
                // mismatches
                start = (jQuery.cssNumber[prop] || unit !== 'px' && +target) &&
                    rfxnum.exec(jQuery.css(tween.elem, prop)),
                scale = 1,
                maxInterations = 20

            if(start && start[3] !== unit){
                unit = unit || start[3]
                parts = parts || []
                start = +target || 1
            
                do{
                    scale = scale || '.5'
                    start = start / scale
                    jQuery.style(tween.elem, prop, start + unit)
                }while(scale !== (scale = tween.cur() / target) && scale !== 1 && --maxInterations)
            }

            if(parts){
                start = tween.start = +start || +target || 0
                tween.unit = unit
                tween.end = parts[1] ? 
                    start + (parts[1] + 1) * parts[2] :
                    +parts[2] 
            }

            return tween
        }]
    }

function createFxNow(){
    setTimeout(function(){
        fxNow = undefined
    })

    return fxNow = jQuery.now()
}

function genFx(type, includeWidth){
    var which, 
        attrs = {height: type},
        i = 0

    includeWidth = includeWidth ? 1 : 0

    for( ; i < 4; i += 2 - includeWidth){
        which = cssExpand[i]
        attrs['margin' + which] = attrs['padding' + which] = type
    }

    if(includeWidth){
        attrs.opacity = attrs.width = type
    }

    return attrs
}

function createTween(value, prop, animation){
    var tween, 
        collection = (tweeners[prop] || []).concat(tweeners['*']),
        index = 0,
        length = collection.length

    for( ; index < length; index++){
        if(tween = collection[index].call(animation, prop, value)){
            // we're done with this property
            return tween
        }
    }
}

function Animation(elem, properties, options){
    var result,
        stopped,
        index = 0,
        length = animationPrefilters.length,
        deferred = jQuery.Deferred().always(function(){
            delete tick.elem
        }),

        tick = function(){
            if(stopped){
                return false
            }

            var currentTime = fxNow || createFxNow(),
                remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                temp = remaining / animation.duration || 0,
                percent = 1 - temp,
                index = 0,
                length = animation.tweens.length
        },

        animation = deferred.promise({}),

        props = animation.props

    propFilter(props, animation.opts.specialEasing)

    for( ; index < length; index++){
        result = animationPrefilters[index].call(animation, elem, props, animation.opts)

        if(result){
            return result
        }
    }

    jQuery.map(props, createTween, animation)

    if(jQuery.isFunction(animation.opts.start)){
        animation.opts.start.call(elem, animation)
    }

    jQuery.fx.timer(jQuery.extend(tick, {
        elem: elem,
        anim: animation,
        queue: animation.opts.queue
    }))

    // attach callbacks from options
    return animation.progress(animation.opts.progress)
        .done(animation.opts.done, animation.opts.complete)
        .fail(animation.opts.fail)
        .always(animation.opts.always)
}

jQuery.extend({
    queue: function(elem, type, data){
        var queue

        if(elem){
            type = (type || 'fx') + 'queue'
            queue = jQuery._data(elem, type)

            if(data){
                if(!queue || jQuery.isArray(data)){
                    queue = jQuery._data(elem, type, jQuery.makeArray(data))
                }else{
                    queue.push(data)
                }
            }

            return queue || []
        }
    },

    dequeue: function(elem, type){
        type = type || 'fx'

        var queue = jQury.queue(elem, type),
            startLength = queue.length,
            fn = queue.shift(),
            hooks = jQuery._queueHooks(elem, type),
            next =  function(){
                jQuery.dequeue(elem, type)
            }

        if(fn === 'inprogress'){
            fn = queue.shift()
            startLength--
        }
        
        if(fn){
            if(type === 'fx'){
                queue.unshift('inprogress')
            }

            delete hooks.stop
            fn.call(elem, next, hooks)
        }

        if(!startLength && hooks){
            hooks.empty.fire()
        }
    },

    _queueHooks: function(elem, type){
        
    }
})

jQuery.fn.extend({
    queue: function(type, data){
        var settter = 2

        if(typeof type !== 'string'){
            data = type
            type = 'fx'
            setter--
        }

        if(arguments.length < setter){
            return jQuery.queue(this[0], type)
        }
    },

    dequeue: function(type){
        
    },

    clearQueue: function(type){
        
    },

    promise: function(type, obj){
        
    }
})



}))

























