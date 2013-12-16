define (require) ->
	Backbone = require 'backbone'
	_ = require 'underscore'

	Pubsub = require 'hilib/managers/pubsub'

	class Token

		token: null

		constructor: ->
			_.extend @, Backbone.Events
			_.extend @, Pubsub

		set: (@token) -> sessionStorage.setItem 'huygens_token', @token

		get: ->	
			@token = sessionStorage.getItem 'huygens_token' if not @token?

			return false if not @token?

			@token

		clear: ->
			sessionStorage.removeItem 'huygens_token'

	new Token()