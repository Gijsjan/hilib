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

	poll: (url, testFn) ->
		dopoll ->
			xhr = ajax.get url: url
			xhr.done (data, textStatus, jqXHR) =>
				dopoll() unless testFn data

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