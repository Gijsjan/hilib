define (require) ->

	Collections =
		Base: require 'collections/base'

	Views = 
		Base: require 'views/base'
		Modal: require 'hilib/views/modal/main'

	Tpl = require 'text!hilib/views/form/editablelist/main.html'

	class EditableList extends Views.Base

		className: 'editablelist'

		# ### Initialize
		initialize: ->
			super

			@options.config ?= {}
			@settings = @options.config.settings ? {}

			@settings.placeholder ?= ''

			# Turn array of strings into array of objects
			value = _.map @options.value, (val) -> id: val

			# Create a collection holding the selected or created options
			@selected = new Collections.Base value

			# When @selected changes, rerender the view
			@listenTo @selected, 'add', @render
			@listenTo @selected, 'remove', @render

			@render()

		# ### Render
		render: ->
			rtpl = _.template Tpl, 
				viewId: @cid
				selected: @selected
				settings: @settings

			@$el.html rtpl

			@triggerChange()

			@$('input').addClass @settings.inputClass if @settings.inputClass?
			@$('input').focus()

			@

		# ### Events
		events: ->
			evs =
				'click li': 'removeLi'
				'click button': 'addSelected'

			evs['keyup input']	= 'onKeyup'

			evs

		removeLi: (ev) ->
			modal = new Views.Modal
				# title: "My title!"
				$html: $('<div />').html('You are about to delete a text layer')
				submitValue: 'Remove text layer'
			modal.on 'cancel', =>
			modal.on 'submit', => 
				@selected.removeById ev.currentTarget.getAttribute('data-id')

		onKeyup: (ev) ->
			valueLength = ev.currentTarget.value.length

			if ev.keyCode is 13 and valueLength > 0
				@addSelected()
			else if valueLength > 1
				@showButton()
			else
				@hideButton()

		# ### Methods

		addSelected: ->
			@selected.add id: @el.querySelector('input').value
			@el.querySelector('button').style.display = 'none'

		showButton: (ev) ->	@el.querySelector('button').style.display = 'inline-block'
		
		hideButton: (ev) ->	@el.querySelector('button').style.display = 'none'
		
		triggerChange: -> @trigger 'change', @selected.pluck 'id'