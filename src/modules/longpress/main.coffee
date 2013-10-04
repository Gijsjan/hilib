define (require) ->

	codes =
		65: 'a'
		66: 'b'
		67: 'c'
		68: 'd'
		69: 'e'
		70: 'f'
		71: 'g'
		72: 'h'
		73: 'i'
		74: 'j'
		75: 'k'
		76: 'l'
		78: 'n'
		79: 'o'
		80: 'p'
		82: 'r'
		83: 's'
		84: 't'
		85: 'u'
		86: 'v'
		87: 'w'
		89: 'y'
		90: 'z'
		187: '='
		189: '-'
		190: '.'
		222: "'"

	shiftcodes =
		65: 'A'
		66: 'B'
		67: 'C'
		68: 'D'
		69: 'E'
		70: 'F'
		71: 'G'
		72: 'H'
		73: 'I'
		74: 'J'
		75: 'K'
		76: 'L'
		78: 'N'
		79: 'O'
		80: 'P'
		82: 'R'
		83: 'S'
		84: 'T'
		85: 'U'
		86: 'V'
		87: 'W'
		89: 'Y'
		90: 'Z'
		49: '!'
		52: '$'
		53: '%'
		187: '+'
		188: '<'
		190: '>'
		191: '?'
		222: '"'

	diacritics = 
		'A':'ĀĂÀÁÂÃÄÅĄⱭ∀Æ'
		'B':'Ɓ'
		'C':'ÇĆĈĊČƆ'
		'D':'ÐĎĐḎƊ'
		'E':'ÈÉÊËĒĖĘẸĚƏÆƎƐ€'
		'F':'ƑƩ'
		'G':'ĜĞĠĢƢ'
		'H':'ĤĦ'
		'I':'ÌÍÎÏĪĮỊİIƗĲ'
		'J':'ĴĲ'
		'K':'ĶƘ'
		'L':'ĹĻĽŁΛ'
		'N':'ÑŃŅŇŊƝ₦'
		'O':'ÒÓÔÕÖŌØŐŒƠƟ'
		'P':'Ƥ¶'
		'R':'ŔŘɌⱤ'
		'S':'ßſŚŜŞṢŠÞ§'
		'T':'ŢŤṮƬƮ'
		'U':'ÙÚÛÜŪŬŮŰŲɄƯƱ'
		'V':'Ʋ'
		'W':'ŴẄΩ'
		'Y':'ÝŶŸƔƳ'
		'Z':'ŹŻŽƵƷẔ'
		
		'a':'āăàáâãäåąɑæαª'
		'b':'ßβɓ'
		'c':'çςćĉċč¢ɔ'
		'd':'ðďđɖḏɖɗ'
		'e':'èéêëēėęẹěəæεɛ€'
		'f':'ƒʃƭ'
		'g':'ĝğġģɠƣ'
		'h':'ĥħɦẖ'
		'i':'ìíîïīįịiiɨĳι'
		'j':'ĵɟĳ'
		'k':'ķƙ'
		'l':'ĺļľłλ'
		'n':'ñńņňŋɲ'
		'o':'òóôõöōøőœơɵ°'
		'p':'ƥ¶'
		'r':'ŕřɍɽ'
		's':'ßſśŝşṣšþ§'
		't':'ţťṯƭʈ'
		'u':'ùúûüūŭůűųưμυʉʊ'
		'v':'ʋ'
		'w':'ŵẅω'
		'y':'ýŷÿɣyƴ'
		'z':'źżžƶẕʒƹ'

		'$':'£¥€₩₨₳Ƀ¤'
		'!':'¡‼‽'
		'?':'¿‽'
		'%':'‰'
		'.':'…••'
		'-':'±‐–—'
		'+':'±†‡'
		'\'':'′″‴‘’‚‛'
		'"':'“”„‟'
		'<':'≤‹'
		'>':'≥›'
		'=':'≈≠≡'

	class Longpress

		timer: null

		lastKeyCode: null

		constructor: (iframeDocument, el) ->
			@el = el
			@iframeDocument = iframeDocument
			@iframeBody = iframeDocument.querySelector 'body'

			@iframeBody.addEventListener 'keydown', @onKeydown.bind @
			@iframeBody.addEventListener 'keyup', @onKeyup.bind @

		onKeydown: (e) ->
			if e.keyCode is @lastKeyCode
				e.preventDefault()
				
				pressedChar = if e.shiftKey then shiftcodes[e.keyCode] else codes[e.keyCode]
				if not @timer? and pressedChar?
					@timer = setTimeout (=>
						list = @createList pressedChar
						@show list
					), 300
			@lastKeyCode = e.keyCode

		onKeyup: (e) ->
			clearTimeout @timer
			@timer = null
			@lastKeyCode = null
			@hide()

		createList: (pressedChar) ->
			ul = document.createElement 'ul'
			ul.className = 'longpress'

			frag = document.createDocumentFragment()

			_.each diacritics[pressedChar], (chr) =>
				li = document.createElement 'li'
				li.textContent = chr
				$(li).mouseenter (e) => @replaceChar e.target.textContent
				frag.appendChild li

			ul.appendChild frag
			
			ul

		show: (list) ->
			@el.appendChild list
			$(list).addClass 'active'

		hide: ->
			list = @el.querySelector '.longpress'
			if list?
				@el.removeChild list
				$(list).removeClass 'active'


		replaceChar: (chr) ->
			range = @iframeDocument.getSelection().getRangeAt(0)
			
			range.setStart range.startContainer, range.startOffset - 1
			range.deleteContents()
			range.insertNode document.createTextNode chr

			range.collapse false

			sel = @iframeDocument.getSelection()
			sel.removeAllRanges()
			sel.addRange range

			@iframeBody.focus()