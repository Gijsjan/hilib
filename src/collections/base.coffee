Backbone = require 'backbone'

Pubsub = require '../mixins/pubsub'

class Base extends Backbone.Collection

	initialize: ->
		_.extend @, Pubsub

	removeById: (id) ->
		model = @get id
		@remove model

	has: (model) -> 
		if this.get(model.cid)? then true else false

module.exports = Base