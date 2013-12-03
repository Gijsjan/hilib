# @options:
#	rowCount: Number 			Number of rows per page
# 	resultCount: Number 		The total number of results (resultCount/rowCount=pageCount)
#	step10: Boolean				Render (<< and >>) for steps of 10. Defaults to false.
#	triggerPageNumber: Boolean	Trigger the new pageNumber (true) or prev/next (false). Defaults to false.

define (require) ->

	Fn = require 'hilib/functions/general'

	Views = 
		Base: require 'views/base'

	tpls = require 'hilib/templates'

	# ## Pagination
	class Pagination extends Views.Base

		className: ''

		# ### Initialize
		initialize: ->
			super

			@setCurrentPage 1

			@options.step10 ?= false
			@options.triggerPagenumber ?= false

		# ### Render
		render: ->
			@options.pageCount = Math.ceil @options.resultCount / @options.rowCount 
			@el.innerHTML = tpls['hilib/views/pagination/main'] @options

			@

		# ### Events
		events: ->
			'click li.prev10.active': 'prev10'
			'click li.prev.active': 'prev'
			'click li.next.active': 'next'
			'click li.next10.active': 'next10'

		prev10: -> @setCurrentPage @options.currentPage - 10
		prev: -> @setCurrentPage @options.currentPage - 1
		next: -> @setCurrentPage @options.currentPage + 1
		next10: -> @setCurrentPage @options.currentPage + 10

		# ### Methods

		setCurrentPage: (pageNumber) ->
			if not @triggerPagenumber
				direction = if pageNumber < @options.currentPage then 'prev' else 'next'

				@trigger direction

			@options.currentPage = pageNumber
			@render()

			Fn.timeoutWithReset 500, => @trigger 'change:pagenumber', pageNumber