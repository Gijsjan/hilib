# AutoSuggest generates an input with a ul
# The ul is populated with li depending on the input string
# When the user selects (clicks or enter) a li the input receives the li value and a change event is triggered
# The AutoSuggest uses the dropdown mixin.

# ### Settings
# * inputClass: 'someClassName'
# * getModel: (value, collection) -> the passed in value can be a string (the id or the value) or an object (containing the id and/or value), because there is no way to know, the user can pass a function to retrieve the model
# * defaultAdd: Boolean default is true, when set to false the user can implement his/her own add logic
define (require) ->

	Views = 
		Base: require 'views/base'

	Tpl = require 'text!hilib/views/form/autosuggest/main.html'

	dropdown = require 'hilib/mixins/dropdown/main'

	# ## AutoSuggest
	class AutoSuggest extends Views.Base

		className: 'autosuggest'

		# ### Initialize

		initialize: (@options) ->
			super

			_.extend @, dropdown

			@dropdownInitialize()

			getModel = @settings.getModel ? (val, coll) -> coll.get val.id

			# Extract the @selected model from @collection, using the passed in getModel function and value or use a Backbone model.
			@selected = getModel(@options.value, @collection) ? new Backbone.Model id: '', title: ''
			### DEBUG console.log @selected, @settings.getModel, @options.value, @collection ###

			@dropdownRender Tpl

		# ### Render
		postDropdownRender: ->
			@$('button.add').addClass 'visible' unless @settings.defaultAdd
			@$('button.edit').addClass 'visible' if @selected.id isnt ''

		# ### Events

		events: -> _.extend @dropdownEvents(),
			'click button.add': 'addOption'

		addOption: (ev) ->
			if @settings.defaultAdd
				# Add new model to the collection. In the collections add event listener,
				# @selected is set to the passed model and triggerChange is called.
				@collection.add
					id: @$('input').val()
					title: @$('input').val()
				# @$('button.add').removeClass 'visible'

		# User has selected an item/option and @selected is set to the selected model. This function only sets the input value and calls the change event.
		selectItem: (ev) ->
			# Was the event a keyup? And was it 'enter'?
			if ev.keyCode? and ev.keyCode is 13
				# Did the user go through the option list and select one?
				if @filtered_options.currentOption?
					@selected = @filtered_options.currentOption 
				else
					@selected = @filtered_options.find (option) => option.get('title') is ev.currentTarget.value

					if not @selected? and @settings.mutable
						@$('button.add').addClass 'visible'

			# No, it must have been a click event
			else
				@selected = @collection.get ev.currentTarget.getAttribute 'data-id'
			
			if @selected?
				@$('input').val @selected.get('title')
				@$('button.edit').addClass 'visible'
				@$('button.add').removeClass 'visible' if @settings.defaultAdd
				@triggerChange()

		# ### Public Methods

		# Fires change event, passing {id: 12, title: 'sometitle'} as data
		triggerChange: -> @trigger 'change', @selected.toJSON()

		postDropdownFilter: (models) ->
			if @settings.mutable
				if models? and not models.length
					@$('button.add').addClass 'visible'
				else
					@$('button.add').removeClass 'visible'