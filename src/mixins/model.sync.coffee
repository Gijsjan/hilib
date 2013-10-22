define (require) ->
	ajax = require 'hilib/managers/ajax'
	token = require 'hilib/managers/token'
	
	syncOverride: (method, model, options) ->
		if options.attributes?
			obj = {}
			obj[name] = @get name for name in options.attributes
			data = JSON.stringify obj
		else
			data = JSON.stringify model.toJSON()

		defaults =
			url: @url()
			dataType: 'text'
			data: data

		settings = $.extend defaults, options

		if method is 'create'
			ajax.token = token.get()
			jqXHR = ajax.post settings
			jqXHR.done (data, textStatus, jqXHR) =>
				if jqXHR.status is 201
					xhr = ajax.get url: jqXHR.getResponseHeader('Location')
					xhr.done (data, textStatus, jqXHR) =>
						console.log 'done after url loc'
						@trigger 'sync'
						settings.success data
			jqXHR.fail (response) => console.log 'fail', response
			
		else if method is 'update'
			ajax.token = token.get()
			jqXHR = ajax.put settings
			# Options.success is not called, because the server does not respond with the updated model.
			jqXHR.done (response) => @trigger 'sync'
			jqXHR.fail (response) => console.log 'fail', response