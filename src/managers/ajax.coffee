define (require) ->
	$ = require 'jquery'
	$.support.cors = true

	defaultOptions =
		# A use case for the token option is when we have a project which uses tokens to authorize,
		# but we want to make a request which shouldn't send the Authorization header. For example
		# when doing a file upload.
		token: true

	token: null

	get: (args, options={}) ->
		@fire 'get', args, options

	post: (args, options={}) ->
		@fire 'post', args, options

	put: (args, options={}) ->
		@fire 'put', args, options

	# Keep requesting *url until *testFn returns true. Call *done afterwards.
	poll: (args) ->
		{url, testFn, done} = args

		dopoll = =>
			xhr = @get url: url
			xhr.done (data, textStatus, jqXHR) =>
				if testFn(data)
					done data, textStatus, jqXHR
				else 
					setTimeout dopoll, 5000

		dopoll()

	fire: (type, args, options) ->
		options = $.extend {}, defaultOptions, options

		ajaxArgs =
			type: type
			dataType: 'json'
			contentType: 'application/json; charset=utf-8'
			processData: false
			crossDomain: true

		if @token? and options.token
			ajaxArgs.beforeSend = (xhr) => xhr.setRequestHeader 'Authorization', "SimpleAuth #{@token}"

		$.ajax $.extend ajaxArgs, args