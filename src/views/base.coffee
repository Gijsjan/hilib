define (require) ->
	Backbone = require 'backbone'

	Pubsub = require 'hilib/mixins/pubsub'
	# viewManager = require 'hilib/managers/view'

	class BaseView extends Backbone.View

		initialize: ->
			_.extend @, Pubsub # extend the view with pubsub terminology (just aliases for listenTo and trigger)

			@subviews = {}

		destroy: ->
			subview.destroy() for name, subview of @subviews
			@remove()
