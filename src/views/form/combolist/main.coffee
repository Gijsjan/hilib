# ComboList is both an autosuggest and an editablelist. With an autosuggest, the selected value is set to the input. 
# With a ComboList, there can be multiple selected values, rendered in a ul beneath the input.
# The ComboList uses the dropdown mixin.

define (require) ->

	Collections =
		Base: require 'collections/base'

	Views = 
		Base: require 'views/base'

	# Tpl = require 'hilib/views/form/combolist/main.jade'
	tpls = require 'hilib/templates'

	# add to mixins
	dropdown = require 'hilib/mixins/dropdown/main'

	# ## ComboList

	class ComboList extends Views.Base

		className: 'combolist'

		# ### Initialize

		initialize: ->
			super

			_.extend @, dropdown

			@dropdownInitialize()

			# Create a collection holding the selected or created options
			if @options.value instanceof Backbone.Collection # If data is a Backbone.Collection
				# * **CHANGE** instead of creating a new collection, we could add a 'options mixin' to current collection
				@selected = @options.value
			else if _.isArray @options.value # Else if data is an array of strings
				models = @strArray2optionArray @options.value
				@selected = new Collections.Base models
			else
				console.error 'No valid value passed to combolist'

			# selectedData = if _.isString @options.value[0] then @strArray2optionArray @options.value else []
			# @selected = new Collections.Base selectedData

			@listenTo @selected, 'add', (model) =>
				# @resetOptions()
				@dropdownRender tpls['hilib/views/form/combolist/main']
				@triggerChange added: model.id

			@listenTo @selected, 'remove', (model) =>
				# @resetOptions()
				@dropdownRender tpls['hilib/views/form/combolist/main']
				@triggerChange removed: model.id

			@dropdownRender tpls['hilib/views/form/combolist/main']

		# ### Events

		events: -> _.extend @dropdownEvents(), 'click li.selected': 'removeSelected'

		addSelected: (model) -> @selected.add model
		removeSelected: (ev) -> 
			id = ev.currentTarget.getAttribute('data-id')
			model = @selected.get id
			@selected.remove model

		selectItem: (ev) ->
			# Check if ev is coming from keyup and double check if keyCode is 13
			# The model is a filtered option if it is current/active otherwise it is the value of input
			if ev.keyCode? and ev.keyCode is 13
				# value = ev.currentTarget.value if ev.currentTarget.value.length > 0
				model = @filtered_options.currentOption if @filtered_options.currentOption?

				# model = id: value, title: value
			# Else it was a click event on li.list. Model is retrieved from @collection with <li data-id="13">
			else
				model = @collection.get ev.currentTarget.getAttribute 'data-id'
			
			@selected.add model if model?

		# ### Public Methods

		triggerChange: (options) -> 
			options.added ?= null
			options.removed ?= null

			@trigger 'change', 
				values: @selected.pluck 'id'
				added: options.added
				removed: options.removed

		# Turns an array of string ['la', 'li'] into an array of options [{id: 'la', title: 'la'}, {id: 'li', title: 'li'}] (model data for Backbone.Collectionn)
		strArray2optionArray: (strArray) -> _.map strArray, (item) -> id: item, title: item