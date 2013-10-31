define (require) ->
	Backbone = require 'backbone'

	StringFn = require 'hilib/functions/string'

	class ViewManager

		currentViews = {}

		cachedViews = {}

		selfDestruct = (view) -> if view.destroy? then view.destroy() else view.remove()

		clear: (view) ->
			# Remove one view 
			if view?
				selfDestruct view 
				delete currentViews[view.cid]
			# Remove all views
			else
				_.each currentViews, (view) ->
					unless view.options.cache
						selfDestruct view 
						delete currentViews[view.cid]


		register: (view, options={}) ->
			currentViews[view.cid] = view if view?

		show: (el, View, options={}) ->
			el = document.querySelector el if _.isString el

			options.cache ?= true
			options.append ?= false
			options.prepend ?= false

			if options.cache
				viewHashCode = StringFn.hashCode View.toString() + JSON.stringify options

				cachedViews[viewHashCode] = new View(options) unless cachedViews.hasOwnProperty viewHashCode
					
				view = cachedViews[viewHashCode] 
			else
				view = new View options

			if _.isElement(el) and view?
				el.innerHTML = '' unless options.append or options.prepend

				if options.prepend and el.firstChild?
					el.insertBefore view.el, el.firstChild
				else
					el.appendChild view.el
				
	new ViewManager()