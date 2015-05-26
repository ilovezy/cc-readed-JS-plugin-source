


(function(root, factory){
    
}(this, function(root, Backbone, _, $){
    var previousBackbone = root.Backbone, 
        array = [], 
        push = array.push, 
        slice = array.slice, 
        splice = array.splice

    Backbone.VERSION = '1.2.2'

    Backbone.$ = $

    Backbone.noConflict = function(){
        root.Backbone = previousBackbone
        return this
    }
    
    Backbone.emulateHTTP = false

    Backbone.emulateJSON = false

    var Events = Backbone.Events = {
        on: function(name, callback, context){
            if(!eventsApi(this, 'on', name, [callback, context]) || !callback) return this

            this._events || (this._events = {})

            var events = this._events[name] || (this._events[name] = [])
            
            events.push({callback: callback, context: context, ctx: context || this})

            return this

            var a = hello, 
        }
    }
    
})





