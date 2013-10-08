# Example usage:
#
# form = new Views.Form
# 	tpl: Templates.FormTpl
# 	model: @model (or Models.User)
# form.on 'change', => doThis()
# form.on 'save:success', => doThat()
# form.on 'save:error', => doSus()


define (require) ->
	Fn = require 'hilib/functions/general'
	Views = 
		Base: require 'views/base'

	validation = require 'hilib/managers/validation'

	# ## Form
	class Form extends Views.Base

		className: -> 'form'

		# ### Initialize

		# @Model is used by Form to instanciate @model and by MultiForm as the model for @collection. If no @Model is given, use Backbone.Model.
		initialize: ->
			super

			@subformConfig ?= @options.subformConfig
			@subformConfig ?= {}

			@Model ?= @options.Model
			@Model ?= Backbone.Model

			@tpl ?= @options.tpl
			throw 'Unknow template!' unless @tpl?

			# Listener to trigger the render once the models (Form: @model, MultiForm: @collection) are loaded. If @model isnt isNew(),
			# data is fetched from the server. We could call @render from @createModels, but for readability sake, we call @render from
			# a centralized place.
			@on 'createModels:finished', @render, @
			@createModels()

			@addValidation()
			
			@addListeners()


		# ### Events

		# MultiForm extends the events.
		events: ->
			evs = {}

			# * TODO: Change selector to "change [data-cid] textarea" and remove data-view-id and replace with model-id
			evs['change [data-model-id="'+@model.cid+'"] textarea'] = 'inputChanged'
			evs['change [data-model-id="'+@model.cid+'"] input'] = 'inputChanged'
			evs['change [data-model-id="'+@model.cid+'"] select'] = 'inputChanged'
			evs['keydown [data-model-id="'+@model.cid+'"] textarea'] = 'textareaKeyup'
			evs['click [data-model-id="'+@model.cid+'"] input[type="submit"]'] = 'submit'

			evs

		# When the input changes, the new value is set to the model. 
		# A listener on the models change event (collection change in case of MultiForm) calls @triggerChange.
		inputChanged: (ev) ->
			ev.stopPropagation()

			@$(ev.currentTarget).removeClass('invalid').attr 'title', ''

			model = if @model? then @model else @getModel(ev)

			value = if ev.currentTarget.type is 'checkbox' then ev.currentTarget.checked else ev.currentTarget.value

			model.set ev.currentTarget.name, value, validate: true

		textareaKeyup: (ev) ->
			ev.currentTarget.style.height = '32px'
			ev.currentTarget.style.height = ev.currentTarget.scrollHeight + 6 + 'px'

		submit: (ev) ->
			ev.preventDefault()

			# After save we trigger the save:success so the instantiated Form view can capture it and take action.
			@model.save [],
				success: (model, response, options) => 
					@trigger 'save:success', model, response, options
					@reset()
				error: (model, xhr, options) => @trigger 'save:error', model, xhr, options

		# ### Render

		# PreRender is a NOOP that can be called by a child view 
		preRender: ->

		render: ->
			@preRender()

			@data ?= {}
			@data.viewId = @cid
			
			if @model?
				@data.model = @model
			else if @collection?
				@data.collection = @collection
			
			rtpl = _.template @tpl, @data
			@$el.html rtpl

			@subforms ?= {}
			@addSubform attr, View for own attr, View of @subforms

			# If form is hidden by display: none when rendered, this does not work! Hiding the form using opacity 0 does work.
			@$('textarea').each (index, textarea) => 
				textarea.style.height = if textarea.scrollHeight+6 > 32 then textarea.scrollHeight+6+'px' else '32px'

			@postRender()

			@

		# PostRender is a NOOP that can be called by a child view 
		postRender: ->

		# ### Public Methods

		# Reset the form to original state
		# * TODO: this only works on new models, not on editting a model
		reset: ->
			# Clone the model to remove any references
			@model = @model.clone()

			# Clear the model to restore the attributes to default values
			@model.clear silent: true

			# Empty the form elements
			@el.querySelector('form').reset()

		# Create the form model. If model isnt new (has an id), fetch data from server.
		# MultiForm overrides this method and creates a collection.
		createModels: ->
			unless @model?
				@options.value ?= {}
				@model = new @Model @options.value

				if @model.isNew()
					@trigger 'createModels:finished'
				else
					@model.fetch
						success: => @trigger 'createModels:finished'
			else
				@trigger 'createModels:finished'
		
		# Add validation mixin. The invalid class added to the input by the 'invalid' callback, is removed in/when @inputChanged.
		addValidation: ->	
			_.extend @, validation

			@validator
				invalid: (model, attr, msg) => @$("[data-cid='#{model.cid}'] [name='#{attr}']").addClass('invalid').attr 'title', msg
				
			### @on 'validator:validated', => $('button.save').prop('disabled', false).removeAttr('title') ###
			### @on 'validator:invalidated', => $('button.save').prop('disabled', true).attr 'title', 'The form cannot be saved due to invalid values.' ###

		# Listen to changes on the model. MultiForm overrides this method.
		addListeners: ->
			@listenTo @model, 'change', => @triggerChange()
		
		# Fires change event. Data passed depends on an available @model (Form)	or @collection (MultiForm)
		triggerChange: ->

			object = if @model? then @model else @collection
			# data = if @model? then @model.toJSON() else @collection.toJSON()
			@trigger 'change', object.toJSON(), object

		# Add subform delegates to renderSubform. In MultiForm @renderSubform is called for every model inside the collection.
		addSubform: (attr, View) => @renderSubform attr, View, @model

		# Renders, attaches and listens to a subform (also an instance of Form or MultiForm)
		renderSubform: (attr, View, model) =>
			# If the attr is a flattened attr (ie: origin.region.place), flatten the model and retrieve the value.
			# If not, just get the value from the model the regular way.
			value = if attr.indexOf('.') > -1 then Fn.flattenObject(model.attributes)[attr] else model.get attr
			console.error 'Subform value is undefined!', @model unless value?
			
			view = new View 
				value: value
				config: @subformConfig[attr]

			# A className cannot contain dots, so replace dots with underscores
			htmlSafeAttr = attr.split('.').join('_')
			@$("[data-cid='#{model.cid}'] .#{htmlSafeAttr}-placeholder").html view.el

			@listenTo view, 'change', (data) => model.set attr, data