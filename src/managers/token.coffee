define (require) ->
	Backbone = require 'backbone'
	_ = require 'underscore'

	Pubsub = require 'hilib/managers/pubsub'

	class Token

		token: null

		constructor: ->
			_.extend @, Backbone.Events
			_.extend @, Pubsub

		set: (@token, type='SimpleAuth') -> 
			sessionStorage.setItem 'huygens_token_type', type
			sessionStorage.setItem 'huygens_token', @token

		getType: -> sessionStorage.getItem 'huygens_token_type'

		get: ->	
			@token = sessionStorage.getItem 'huygens_token' if not @token?

			@token

		clear: ->
			sessionStorage.removeItem 'huygens_token'
			sessionStorage.removeItem 'huygens_token_type'

	new Token()