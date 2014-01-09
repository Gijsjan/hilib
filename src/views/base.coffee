define (require) ->
	Backbone = require 'backbone'

	Pubsub = require 'hilib/mixins/pubsub'
	# viewManager = require 'hilib/managers/view'

	class BaseView extends Backbone.View

		initialize: ->
			_.extend @, Pubsub # extend the view with pubsub terminology (just aliases for listenTo and trigger)

			@subviews = {}

			console.log @

			@on 'to-cache', => 
				@undelegateEvents()
				subview.trigger 'to-cache' for name, subview of @subviews

			@on 'from-cache', =>
				@delegateEvents()
				subview.trigger 'from-cache' for name, subview of @subviews

		destroy: ->
			subview.destroy() for name, subview of @subviews
			@remove()
