define (require) ->

	# Native alternative to $.closest
	# See http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
	closest: (el, selector) ->
		matchesSelector = el.matches or el.webkitMatchesSelector or el.mozMatchesSelector or el.msMatchesSelector

		while (el)
			if (matchesSelector.bind(el)(selector)) then return el else	el = el.parentNode