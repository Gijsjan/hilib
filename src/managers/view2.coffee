define (require) ->
	Backbone = require 'backbone'

	StringFn = require 'hilib/functions/string'

	class ViewManager

		currentView = null

		cachedViews = {}

		clear: (view) ->
			# console.log 'clearing', view, view.options
			selfDestruct = (view) ->
				unless view.options.persist is true
					if view.destroy? then view.destroy() else view.remove()
					delete currentViews[view.cid]

			# Remove one view 
			if view?
				selfDestruct view 
			# Remove all views
			else
				selfDestruct view for own cid, view of currentViews

		clearCache: ->
			@clear()
			cachedViews = {}

		show: ($el, View, options={}) ->
			options.append ?= false
			options.prepend ?= false

			viewHashCode = StringFn.hashCode View.toString() + JSON.stringify options

			
			if cachedViews.hasOwnProperty viewHashCode
				cachedViews[viewHashCode].trigger 'from-cache'
			else
				cachedViews[viewHashCode] = new View(options)
				
			currentView.trigger 'to-cache' if currentView?
			currentView = cachedViews[viewHashCode]

			domFunc = 'html'
			domFunc = 'prepend' if options.prepend
			domFunc = 'append' if options.append
			
			$el[domFunc].call $el, currentView.el

			currentView
				
	new ViewManager()