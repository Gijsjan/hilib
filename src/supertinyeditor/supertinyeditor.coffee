# Description...
define (require) ->
	StringFn = require 'helpers2/string'

	Views = 
		Base: require 'views/base'

	Tpl = require 'text!viewshtml/supertinyeditor/supertinyeditor.html'

	# ## SuperTinyEditor
	class SuperTinyEditor extends Views.Base

		# ### Initialize
		initialize: ->
			super

			@render()

		# ### Render
		render: ->
			rtpl = _.template Tpl
			@$el.html rtpl()

			@$currentHeader = @$('.ste-header')

			@renderControls()

			@renderIframe()
			
			@

		renderControls: ->
			for controlName in @options.controls
				div = document.createElement 'div'

				# N stands for 'New header', and is created by a new div.ste-header
				if controlName is 'n'
					div.className = 'ste-header'
					# Insert after last .ste-header by inserting before .ste-body
					@$('.ste-body').before div
					# Set newly created header to be the @$currentHeader
					@$currentHeader = $(div)
				# Create a divider
				else if controlName is '|'
					div.className = 'ste-divider'
					@$currentHeader.append div
				# Create a 'normal' control
				else
					div.className = 'ste-control '+controlName
					div.setAttribute 'title', StringFn.ucfirst controlName
					div.setAttribute 'data-action', controlName
					@$currentHeader.append div

		renderIframe: ->
			@options.cssFile ?= ''
			@options.html ?= ''

			iframe = @el.querySelector('iframe')

			html = "<!DOCTYPE html>
					<html>
					<head><meta charset='UTF-8'><link rel='stylesheet' href='#{@options.cssFile}'></head>
					<body class='supertinyeditor-body' spellcheck='false' contenteditable='true'>#{@options.html}</body>
					</html>"

			@doc = iframe.contentDocument
			@doc.designMode = 'On'
			@doc.open()
			@doc.write html
			@doc.close()
		
		# ### Events
		events: ->
			'click .ste-control': 'controlClicked'

		controlClicked: (ev) ->
			action = ev.currentTarget.getAttribute 'data-action'
			@doc.execCommand action, false, null
			@trigger('change', action, @$('body').html());

		# ### Methods

			
