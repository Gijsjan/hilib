define (require) ->
	Backbone = require 'backbone'

	StringFn = require 'hilib/functions/string'

	class ViewManager

		currentView = null

		cachedViews = {}

		# clear: (view) ->
		# 	# console.log 'clearing', view, view.options
		# 	selfDestruct = (view) ->
		# 		unless view.options.persist is true
		# 			if view.destroy? then view.destroy() else view.remove()
		# 			delete currentViews[view.cid]

		# 	# Remove one view 
		# 	if view?
		# 		selfDestruct view 
		# 	# Remove all views
		# 	else
		# 		selfDestruct view for own cid, view of currentViews

		# clearCache: ->
		# 	@clear()
		# 	cachedViews = {}

		show: ($el, View, options={}) ->
			options.append ?= false
			options.prepend ?= false

			# Create a unique code for a View and it's options.
			viewHashCode = StringFn.hashCode View.toString() + JSON.stringify options

			# Create a new cached view if the view is not found in the cachedViews hash.
			unless cachedViews.hasOwnProperty viewHashCode
				cachedViews[viewHashCode] = new View options

			# Set the currentView
			currentView = cachedViews[viewHashCode]

			el = $el[0]
			el.innerHTML = '' unless options.append or options.prepend

			if options.prepend and el.firstChild?
				el.insertBefore currentView.el, el.firstChild
			else
				el.appendChild currentView.el

			currentView
				
	new ViewManager()