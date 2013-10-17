# Example usage:
# 
# 	modal = new Modal
# 		title: "My title!"
# 		$html: $('<div />').html('lalala')
# 		submitValue: 'OK'
# 	modal.on 'cancel', => cancelAction()
# 	modal.on 'submit', => modal.messageAndFade 'success', 'Modal submitted!'

define (require) ->
	Backbone = require 'backbone'
	Tpl = require 'text!hilib/views/modal/main.html'

	modalManager = require 'hilib/managers/modal'
	
	# ## Modal
	class Modal extends Backbone.View
		className: "modal"

		# ### Initialize
		initialize: (@options) ->
			super
			@render()

		# ### Render
		render: ->
			data = _.extend
				title: "My modal"
				cancelAndSubmit: true
				cancelValue: 'Cancel'
				submitValue: 'Submit'
			, 
				@options

			rtpl = _.template Tpl, data
			@$el.html rtpl

			# Clone @options.$html and set to div.body
			@$(".body").html @options.$html if @options.$html

			modalManager.add @

			if @options.width?
				@$('.modalbody').css 'width', @options.width
				marginLeft = (-1 * parseInt(@options.width, 10)/2)
				marginLeft += '%' if @options.width.slice(-1) is '%'
				marginLeft += 'vw' if @options.width.slice(-2) is 'vw'
				@$('.modalbody').css 'margin-left', marginLeft

			if @options.height?
				@$('.modalbody').css 'height', @options.height

				# unless @options.height is 'auto'
				# 	marginTop = (-1 * parseInt(@options.height, 10)/2)
				# 	marginTop += '%' if @options.height.slice(-1) is '%'
				# 	marginTop += 'vh' if @options.height.slice(-2) is 'vh'
				# 	console.log marginTop
				# 	@$('.modalbody').css 'margin-top', marginTop

			# Add scrollTop of <body> to the position of the modal if body is scrolled (otherwise modal might be outside viewport)
			scrollTop = document.querySelector('body').scrollTop
			viewportHeight = document.documentElement.clientHeight
			top = (viewportHeight - @$('.modalbody').height())/2
			# @$('.modalbody').css 'top', top + scrollTop if scrollTop > 0
			@$('.modalbody').css 'margin-top', @$('.modalbody').height()/-2
			@$('.modalbody .body').css 'max-height', viewportHeight - 400

		# ### Events
		events:
			"click button.submit": -> @trigger 'submit'
			"click button.cancel": -> @cancel()
			"click .overlay": -> @cancel()

		cancel: ->
			@trigger "cancel"
			@close()

		# ### Methods

		close: -> modalManager.remove @

		fadeOut: (delay = 1000) ->
			# Speed is used for $.fadeOut and to calculate the time at which to @remove the modal.
			# Set speed to 0 if delay is 0.
			speed = if delay is 0 then 0 else 500

			# Fade out the modal body (not the overlay!) at given speed.
			@$(".modalbody").delay(delay).fadeOut speed
			
			# Use setTimeout to @remove before $.fadeOut is completely finished, otherwise is interferes with the overlay
			setTimeout (=> @close()), delay + speed - 100

		message: (type, message) ->
			return console.error("Unknown message type!")  if ["success", "warning", "error"].indexOf(type) is -1
			@$("p.message").html(message).addClass type

		messageAndFade: (type, message, delay) ->
			@$(".modalbody .body").hide()
			@$("footer").hide()
			@message type, message
			@fadeOut delay