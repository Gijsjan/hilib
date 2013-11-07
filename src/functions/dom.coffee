define (require) ->

	(el) ->
		# Native alternative to $.closest
		# See http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
		closest: (selector) ->
			matchesSelector = el.matches or el.webkitMatchesSelector or el.mozMatchesSelector or el.msMatchesSelector

			while (el)
				if (matchesSelector.bind(el)(selector)) then return el else	el = el.parentNode

		prepend: (childEl) ->
			el.insertBefore childEl, el.firstChild

		###
		Native alternative to jQuery's $.offset()

		http://www.quirksmode.org/js/findpos.html
		###
		position: (parent=document.body) ->
			left = 0
			top = 0
			loopEl = el

			while loopEl isnt parent
				console.log loopEl, parent
				# Not every parent is an offsetParent. So in the case the user has passed a non offsetParent as the parent, 
				# we check if we have passed the parent (by checking if the offsetParent has a descendant which is the parent).
				break if @hasDescendant parent

				left += loopEl.offsetLeft
				top += loopEl.offsetTop

				loopEl = loopEl.offsetParent

			left: left
			top: top

		###
		Is child el a descendant of parent el?

		http://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-a-child-of-another
		###
		hasDescendant: (child) ->
			node = child.parentNode
			
			while node?
				return true if node is el
				node = node.parentNode

			return false