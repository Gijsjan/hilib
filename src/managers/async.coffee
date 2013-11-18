# * TODO: remove underscore and trigger deps, create callback

define (require) ->
	_ = require 'underscore'

	class Async
		constructor: (names = []) ->
			_.extend(@, Backbone.Events)

			@callbacksCalled = {}
			@callbacksCalled[name] = false for name in names
			
		called: (name, data = true) ->
			@callbacksCalled[name] = data
			@trigger 'ready', @callbacksCalled if _.every @callbacksCalled, (called) -> called isnt false