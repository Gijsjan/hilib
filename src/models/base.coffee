Backbone = require 'backbone'

Pubsub = require '../managers/pubsub'

class BaseModel extends Backbone.Model

	initialize: ->
		_.extend @, Pubsub

module.exports = BaseModel