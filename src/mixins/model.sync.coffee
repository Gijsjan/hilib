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

		if method is 'create'
			ajax.token = token.get()
			jqXHR = ajax.post
				url: @url()
				dataType: 'text'
				data: data

			jqXHR.done (data, textStatus, jqXHR) =>
				if jqXHR.status is 201
					url = jqXHR.getResponseHeader('Location')

					xhr = ajax.get url: url
					xhr.done (data, textStatus, jqXHR) =>
						@trigger 'sync'
						options.success data

			jqXHR.fail (response) => console.log 'fail', response
			
		else if method is 'update'
			ajax.token = token.get()

			jqXHR = ajax.put
				url: @url()
				data: data

			# Options.success is not called, because the server does not respond with the updated model.
			jqXHR.done (response) => @trigger 'sync'
			jqXHR.fail (response) => console.log 'fail', response