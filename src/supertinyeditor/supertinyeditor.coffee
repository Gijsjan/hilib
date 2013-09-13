# A Super Tiny Editor

# ### Options
# * cssFile CSS file to include for custom style
# * model Backbone.Model
# * htmlAttribute The attribute on the model which holds the HTML to edit
# * width Number Width of the iframe
# * height Number Height of the iframe, total height includes the menu(s)
# * wrap Boolean Sets white-space to normal on the iframe body if set to true

define (require) ->
	Fn = require 'helpers/general'
	StringFn = require 'helpers/string'

	Views = 
		Base: require 'views/base'

	Tpl = require 'text!viewshtml/supertinyeditor/supertinyeditor.html'

	# ## SuperTinyEditor
	class SuperTinyEditor extends Views.Base

		# ### Initialize
		initialize: ->
			super

			@options.cssFile ?= ''
			@options.html ?= ''
			@options.width ?= '300'
			@options.height ?= '200'
			@options.wrap ?= false

			@render()

		# ### Render
		render: ->
			rtpl = _.template Tpl
			@$el.html rtpl()

			@$currentHeader = @$('.ste-header')

			@renderControls()

			@renderIframe()

			# Go native
			$(@iframeDocument).find('body').focus() if @options.html is ''
			
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

		# The iframe is already present (in the template), but has to be filled with a document.
		renderIframe: ->
			iframe = @el.querySelector 'iframe'
			iframe.style.width = @options.width + 'px'
			iframe.style.height = @options.height + 'px'

			html = "<!DOCTYPE html>
					<html>
					<head><meta charset='UTF-8'><link rel='stylesheet' href='#{@options.cssFile}'></head>
					<body class='ste-iframe-body' spellcheck='false' contenteditable='true'>#{@options.model.get(@options.htmlAttribute)}</body>
					</html>"

			@iframeDocument = iframe.contentDocument
			@iframeDocument.designMode = 'On'
			@iframeDocument.open()
			@iframeDocument.write html
			@iframeDocument.close()


			@iframeBody = @iframeDocument.querySelector 'body'
			@iframeBody.style.whiteSpace = 'normal' if @options.wrap

			@setFocus()

			# Hack, hack, hack.
			# The scroll event on the iframe is fired (through the contentDocument or contentWindow), but no scrollLeft,
			# scrollWidth or clientWidth are given. ScrollWidth and clientWidth are found by document.documentElement, but
			# for scrollLeft we need jQuery. Normally Fn.scrollPercentage receives ev.currentTarget or ev.target, but we have
			# to construct the object ourselves in this case.
			# 
			# Scroll is also triggered when using the contentWindow.scrollTo function in @setScrollPercentage, 
			# but should not update the other scroll(s).@autoScroll is used to prevent both scrollers of updating eachother
			# and thus forming a loop.
			@iframeDocument.addEventListener 'scroll', =>
				unless @autoScroll
					target =
						scrollLeft: $(iframe).contents().scrollLeft()
						scrollWidth: iframe.contentWindow.document.documentElement.scrollWidth
						clientWidth: iframe.contentWindow.document.documentElement.clientWidth
					
					Fn.timeoutWithReset 200, => @trigger 'scrolled', Fn.getScrollPercentage target, 'horizontal'

			@iframeDocument.addEventListener 'keyup', (ev) =>
				Fn.timeoutWithReset 500, => @model.set @options.htmlAttribute, @getHTML()


		
		# ### Events
		events: ->
			'click .ste-control': 'controlClicked'

		controlClicked: (ev) ->
			action = ev.currentTarget.getAttribute 'data-action'
			@iframeDocument.execCommand action, false, null
			@trigger 'change', action, @iframeBody.innerHTML


		# ### Methods

		setModel: (model) ->
			@iframeBody.innerHTML = model.get @options.htmlAttribute
			@model = model
			@setFocus()

		getHTML: -> @iframeBody.innerHTML

		# setHTML: (html) -> 
		# 	@setFocus()
		# 	@iframeBody.innerHTML = html

		setIframeHeight: (height) -> iframe.style.height = height

		setIframeWidth: (width) -> iframe.style.width = width

		setFocus: -> @iframeBody.focus()

		setScrollPercentage: (percentage, orientation='vertical') ->
			contentWindow = @el.querySelector('iframe').contentWindow
			documentElement = contentWindow.document.documentElement
			clientWidth = documentElement.clientWidth
			scrollWidth = documentElement.scrollWidth
			clientHeight = documentElement.clientHeight
			scrollHeight = documentElement.scrollHeight
			top = 0
			left = 0

			if orientation is 'vertical'
				pos = (scrollHeight - clientHeight) * percentage/100
				top = pos 
			else
				pos = (scrollWidth - clientWidth) * percentage/100
				left = pos

			@autoScroll = true
			contentWindow.scrollTo left, top
			# Give the receiving end (Views.EntryPreview) some time to respond and then turn off the autoScroll
			setTimeout (=> @autoScroll = false), 200