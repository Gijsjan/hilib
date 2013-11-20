# A Super Tiny Editor

# ### Options
# * cssFile CSS file to include for custom style
# * model Backbone.Model
# * htmlAttribute The attribute on the model which holds the HTML to edit
# * width Number Width of the iframe
# * height Number Height of the iframe, total height includes the menu(s)
# * wrap Boolean Sets white-space to normal on the iframe body if set to true

define (require) ->
	Fn = require 'hilib/functions/general'
	StringFn = require 'hilib/functions/string'

	require 'hilib/functions/jquery.mixin'

	Longpress = require 'hilib/views/longpress/main'

	Views = 
		Base: require 'views/base'

	tpls = require 'hilib/templates'
	# console.log tpls
	# Templates =
	# 	Main: require 'hilib/views/supertinyeditor/supertinyeditor.jade'
	# 	Diacritics: require 'hilib/views/supertinyeditor/diacritics.jade'

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
			# rtpl = _.template Templates.Main
			# console.log Templates.Main
			console.log 'render'
			@$el.html tpls['hilib/views/supertinyeditor/main']()

			@$currentHeader = @$('.ste-header')

			@renderControls()

			@renderIframe()

			@setFocus()
			
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
				# Create a diacritics menu
				else if controlName is 'diacritics'
					div.className = 'ste-control-diacritics '+controlName
					div.setAttribute 'title', StringFn.ucfirst controlName
					div.setAttribute 'data-action', controlName

					diacriticsUL = document.createElement 'div'
					diacriticsUL.className = 'diacritics-placeholder'
					diacritics = 'ĀĂÀÁÂÃÄÅĄⱭ∀ÆāăàáâãäåąɑæαªƁßβɓÇĆĈĊČƆçςćĉċč¢ɔÐĎĐḎƊðďđɖḏɖɗÈÉÊËĒĖĘẸĚƏÆƎƐ€èéêëēėęẹěəæεɛ€ƑƩƒʃƭĜĞĠĢƢĝğġģɠƣĤĦĥħɦẖÌÍÎÏĪĮỊİIƗĲìíîïīįịiiɨĳιĴĲĵɟĳĶƘķƙĹĻĽŁΛĺļľłλÑŃŅŇŊƝ₦ñńņňŋɲÒÓÔÕÖŌØŐŒƠƟòóôõöōøőœơɵ°Ƥ¶ƥ¶ŔŘɌⱤŕřɍɽßſŚŜŞṢŠÞ§ßſśŝşṣšþ§ŢŤṮƬƮţťṯƭʈÙÚÛÜŪŬŮŰŲɄƯƱùúûüūŭůűųưμυʉʊƲʋŴẄΩŵẅωÝŶŸƔƳýŷÿɣyƴŹŻŽƵƷẔźżžƶẕʒƹ£¥€₩₨₳Ƀ¤¡‼‽¿‽‰…••±‐–—±†‡′″‴‘’‚‛“”„‟≤‹≥›≈≠≡'
					diacriticsUL.innerHTML = tpls['hilib/views/supertinyeditor/diacritics'] diacritics: diacritics
					
					div.appendChild diacriticsUL

					@$currentHeader.append div
				# Create a button
				else if controlName.substr(0, 2) is 'b_'
					controlName = controlName.substr(2)
					div.className = 'ste-button'
					div.setAttribute 'data-action', controlName
					div.setAttribute 'title', StringFn.ucfirst controlName
					div.innerHTML = StringFn.ucfirst controlName
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
					<body class='ste-iframe-body' spellcheck='false' contenteditable='true'>#{@model.get(@options.htmlAttribute)}</body>
					</html>"

			@iframeDocument = iframe.contentDocument
			@iframeDocument.designMode = 'On'
			@iframeDocument.open()
			@iframeDocument.write html
			@iframeDocument.close()

			@iframeBody = @iframeDocument.querySelector 'body'
			@iframeBody.style.whiteSpace = 'normal' if @options.wrap

			# new Longpress @iframeDocument, @el.querySelector '.ste-body'
			lp = new Longpress
				parent: @el.querySelector '.ste-body'


			# @setFocus()

			# Hack, hack, hack.
			# The scroll event on the iframe is fired (through the contentDocument or contentWindow), but no scrollLeft,
			# scrollWidth or clientWidth are given. ScrollWidth and clientWidth are found by document.documentElement, but
			# for scrollLeft we need jQuery. Normally Fn.scrollPercentage receives ev.currentTarget or ev.target, but we have
			# to construct the object ourselves in this case.
			# 
			# Scroll is also triggered when using the contentWindow.scrollTo function in @setScrollPercentage, 
			# but should not update the other scroll(s).@autoScroll is used to prevent both scrollers of updating eachother
			# and thus forming a loop.
			@iframeDocument.addEventListener 'scroll', => @triggerScroll() unless @autoScroll

			@iframeDocument.addEventListener 'keyup', (ev) =>
				Fn.timeoutWithReset 500, => 
					@triggerScroll()
					@saveHTMLToModel()

		
		# ### Events
		events: ->
			'click .ste-control': 'controlClicked'
			'click .ste-control-diacritics ul.diacritics li': 'diacriticClicked'
			'click .ste-button': 'buttonClicked'

		controlClicked: (ev) ->
			action = ev.currentTarget.getAttribute 'data-action'
			@iframeDocument.execCommand action, false, null
			@saveHTMLToModel()

		buttonClicked: (ev) ->
			action = ev.currentTarget.getAttribute 'data-action'
			@trigger action

		diacriticClicked: (ev) ->
			# Get the selection from the contentWindow
			sel = @el.querySelector('iframe').contentWindow.getSelection()

			# Delete the range and insert the clicked char
			range = sel.getRangeAt 0
			range.deleteContents()
			textNode = ev.currentTarget.childNodes[0].cloneNode()
			range.insertNode textNode

			# Move cursor after textNode
			range.setStartAfter textNode
			range.setEndAfter textNode 
			sel.removeAllRanges()
			sel.addRange range

			@saveHTMLToModel()

		# ### Methods

		saveHTMLToModel: -> @model.set @options.htmlAttribute, @iframeBody.innerHTML

		triggerScroll: ->
			iframe = @el.querySelector 'iframe'

			target =
				scrollLeft: $(iframe).contents().scrollLeft()
				scrollWidth: iframe.contentWindow.document.documentElement.scrollWidth
				clientWidth: iframe.contentWindow.document.documentElement.clientWidth
				scrollTop: $(iframe).contents().scrollTop()
				scrollHeight: iframe.contentWindow.document.documentElement.scrollHeight
				clientHeight: iframe.contentWindow.document.documentElement.clientHeight

			@trigger 'scrolled', Fn.getScrollPercentage target

		setModel: (model) ->
			@setInnerHTML model.get @options.htmlAttribute
			@model = model
			@setFocus()

		setInnerHTML: (html) ->
			@iframeBody.innerHTML = html

			# Set iframe height to scrollHeight
			# iframe = @el.querySelector 'iframe'
			# scrollHeight = iframe.contentWindow.document.documentElement.scrollHeight
			# iframe.style.height = scrollHeight + 15 + 'px'

		# setHTML: (html) -> 
		# 	@setFocus()
		# 	@iframeBody.innerHTML = html

		setIframeHeight: (height) ->
			iframe = @el.querySelector 'iframe'
			iframe.style.height = height + 'px'

		setIframeWidth: (width) ->
			iframe = @el.querySelector 'iframe'
			iframe.style.width = width + 'px'
			# iframe = @el.querySelector 'iframe'
			# scrollHeight = iframe.contentWindow.document.documentElement.scrollHeight
			# iframe.style.height = scrollHeight + 15 + 'px'

		# setIframeWidth: (width) -> iframe.style.width = width

		# Set focus to the end of the body text
		setFocus: -> Fn.setCursorToEnd @iframeBody, @el.querySelector('iframe').contentWindow

		setScrollPercentage: (percentages) ->
			contentWindow = @el.querySelector('iframe').contentWindow
			documentElement = contentWindow.document.documentElement

			clientWidth = documentElement.clientWidth
			scrollWidth = documentElement.scrollWidth
			clientHeight = documentElement.clientHeight
			scrollHeight = documentElement.scrollHeight

			top = (scrollHeight - clientHeight) * percentages.top/100
			left = (scrollWidth - clientWidth) * percentages.left/100

			@autoScroll = true
			contentWindow.scrollTo left, top
			# Give the receiving end (Views.EntryPreview) some time to respond and then turn off the autoScroll
			setTimeout (=> @autoScroll = false), 200

		# show: -> @el.style.display = 'block'
		# hide: -> @el.style.display = 'none'
		# visible: -> @el.style.display is 'block'