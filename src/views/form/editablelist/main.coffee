define (require) ->

	Collections =
		Base: require 'collections/base'

	Views = 
		Base: require 'views/base'

	Tpl = require 'text!hilib/views/form/editablelist/main.html'

	class EditableList extends Views.Base

		className: 'editablelist'

		# ### Initialize
		initialize: ->
			super

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

			@$el.html rtpl

			@triggerChange()

			@$('input').focus()

			@

		# ### Events
		events: ->
			evs =
				'click li': 'removeLi'

			evs['keyup input[data-view-id="'+@cid+'"]']	= 'onKeyup'

			evs

		removeLi: (ev) ->
			@selected.removeById ev.currentTarget.getAttribute('data-id')

		onKeyup: (ev) ->
			if ev.keyCode is 13 and ev.currentTarget.value.length > 0
				@selected.add id: ev.currentTarget.value

		# ### Methods
		
		triggerChange: -> @trigger 'change', @selected.pluck 'id'