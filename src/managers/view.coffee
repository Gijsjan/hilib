# * TODO Go native

define (require) ->
	Backbone = require 'backbone'

	Collections =
		# PUT IN HILIB
		'View': require 'collections/view'

	class ViewManager

		currentViews = new Collections.View()

		# debugCurrentViews: currentViews

		el: 'div#main'

		selfDestruct = (view) ->
			if not currentViews.has(view)
				console.error 'Unknown view!'
			else
				if view.destroy? then view.destroy() else view.remove()

		constructor: ->
			# TODO: Make div#main optional
			@main = $ @el


		clear: (view) ->
			# Remove one view 
			if view?
				selfDestruct view 
				currentViews.remove view.cid
			# Remove all views
			else
				currentViews.each (model) ->
					selfDestruct model.get('view')
				currentViews.reset()


		register: (view, options={}) ->
			options.managed ?= true
			options.cached ?= false

			if view? and options.managed
				currentViews.add
					id: view.cid
					options: options
					view: view


		show: (View, query={}) ->
			@clear() # Clear previous views

			view = new View query

			html = if not view? then '' else view.el
			console.log html
			@main.html html

	new ViewManager();