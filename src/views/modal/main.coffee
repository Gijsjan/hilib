# Example usage:
# 
# 	modal = new Modal
# 		title: "My title!"
# 		html: $('<div />').html('lalala')
# 		submitValue: 'OK'
# 	modal.on 'cancel', => cancelAction()
# 	modal.on 'submit', => modal.messageAndFade 'success', 'Modal submitted!'

define (require) ->
	Backbone = require 'backbone'
	# Tpl = require 'text!hilib/views/modal/main.html'

	# tpl = require 'hilib/views/modal/main.jade'
	tpls = require 'hilib/templates'

	dom = require 'hilib/functions/DOM'
	modalManager = require 'hilib/managers/modal'
	
	# ## Modal
	class Modal extends Backbone.View
		className: "modal"

		defaultOptions: ->
			title: ''
			titleClass: ''
			cancelAndSubmit: true
			cancelValue: 'Cancel'
			submitValue: 'Submit'
			loader: true

		# ### Initialize
		initialize: (@options) ->
			super
			@render()

		# ### Render
		render: ->
			data = _.extend @defaultOptions(), @options

			# rtpl = _.template Tpl, data
			rtpl = tpls['hilib/views/modal/main'] data
			@$el.html rtpl

			body = dom(@el).q('.body')
			if @options.html then body.html @options.html else body.hide()

			modalManager.add @

			if @options.width?
				@$('.modalbody').css 'width', @options.width
				marginLeft = (-1 * parseInt(@options.width, 10)/2)
				marginLeft += '%' if @options.width.slice(-1) is '%'
				marginLeft += 'vw' if @options.width.slice(-2) is 'vw'
				marginLeft = @$('.modalbody').width()/-2 if @options.width is 'auto'
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

			# marginTop is calculated based on the .modalbody height, but the height is maxed to the viewportHeight
			marginTop = Math.max @$('.modalbody').height()/-2, (viewportHeight - 400)*-0.5

			@$('.modalbody').css 'margin-top', marginTop
			@$('.modalbody .body').css 'max-height', viewportHeight - 400

		# ### Events
		events:
			"click button.submit": 'submit'
			"click button.cancel": -> @cancel()
			"click .overlay": -> @cancel()
			"keydown input": (ev) ->
				if ev.keyCode is 13
					ev.preventDefault()
					@submit ev

		submit: (ev) ->
			el = dom(ev.currentTarget)
			unless el.hasClass 'loader'
				@el.querySelector('button.cancel').style.display = 'none'
				el.addClass 'loader'
				@trigger 'submit'

		cancel: ->
			@trigger 'cancel'
			@close()

		# ### Methods


		close: ->
			# Trigger close before removing the modal, otherwise there won't be a trigger!
			@trigger 'close'
			modalManager.remove @

		# Alias for close.
		destroy: -> @close()

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
			@$("p.message").show()
			@$("p.message").html(message).addClass type

		messageAndFade: (type, message, delay) ->
			@$(".modalbody .body").hide()
			@$("footer").hide()
			@message type, message
			@fadeOut delay