(function() {
  define(function(require) {
    var Longpress, codes, diacritics, shiftcodes;
    codes = {
      65: 'a',
      66: 'b',
      67: 'c',
      68: 'd',
      69: 'e',
      70: 'f',
      71: 'g',
      72: 'h',
      73: 'i',
      74: 'j',
      75: 'k',
      76: 'l',
      77: 'm',
      78: 'n',
      79: 'o',
      80: 'p',
      81: 'q',
      82: 'r',
      83: 's',
      84: 't',
      85: 'u',
      86: 'v',
      87: 'w',
      88: 'x',
      89: 'y',
      90: 'z',
      187: '=',
      189: '-',
      190: '.',
      222: "'"
    };
    shiftcodes = {
      65: 'A',
      66: 'B',
      67: 'C',
      68: 'D',
      69: 'E',
      70: 'F',
      71: 'G',
      72: 'H',
      73: 'I',
      74: 'J',
      75: 'K',
      76: 'L',
      77: 'M',
      78: 'N',
      79: 'O',
      80: 'P',
      81: 'Q',
      82: 'R',
      83: 'S',
      84: 'T',
      85: 'U',
      86: 'V',
      87: 'W',
      88: 'X',
      89: 'Y',
      90: 'Z',
      49: '!',
      52: '$',
      53: '%',
      187: '+',
      188: '<',
      190: '>',
      191: '?',
      222: '"'
    };
    diacritics = {
      'A': 'ĀĂÀÁÂÃÄÅĄⱭ∀Æ',
      'B': 'Ɓ',
      'C': 'ÇĆĈĊČƆ',
      'D': 'ÐĎĐḎƊ',
      'E': 'ÈÉÊËĒĖĘẸĚƏÆƎƐ€',
      'F': 'ƑƩ',
      'G': 'ĜĞĠĢƢ',
      'H': 'ĤĦ',
      'I': 'ÌÍÎÏĪĮỊİIƗĲ',
      'J': 'ĴĲ',
      'K': 'ĶƘ',
      'L': 'ĹĻĽŁΛ',
      'N': 'ÑŃŅŇŊƝ₦',
      'O': 'ÒÓÔÕÖŌØŐŒƠƟ',
      'P': 'Ƥ¶',
      'R': 'ŔŘɌⱤ',
      'S': 'ßſŚŜŞṢŠÞ§',
      'T': 'ŢŤṮƬƮ',
      'U': 'ÙÚÛÜŪŬŮŰŲɄƯƱ',
      'V': 'Ʋ',
      'W': 'ŴẄΩ',
      'Y': 'ÝŶŸƔƳ',
      'Z': 'ŹŻŽƵƷẔ',
      'a': 'āăàáâãäåąɑæαª',
      'b': 'ßβɓ',
      'c': 'çςćĉċč¢ɔ',
      'd': 'ðďđɖḏɖɗ',
      'e': 'èéêëēėęẹěəæεɛ€',
      'f': 'ƒʃƭ',
      'g': 'ĝğġģɠƣ',
      'h': 'ĥħɦẖ',
      'i': 'ìíîïīįịiiɨĳι',
      'j': 'ĵɟĳ',
      'k': 'ķƙ',
      'l': 'ĺļľłλ',
      'n': 'ñńņňŋɲ',
      'o': 'òóôõöōøőœơɵ°',
      'p': 'ƥ¶',
      'r': 'ŕřɍɽ',
      's': 'ßſśŝşṣšþ§',
      't': 'ţťṯƭʈ',
      'u': 'ùúûüūŭůűųưμυʉʊ',
      'v': 'ʋ',
      'w': 'ŵẅω',
      'y': 'ýŷÿɣyƴ',
      'z': 'źżžƶẕʒƹ',
      '$': '£¥€₩₨₳Ƀ¤',
      '!': '¡‼‽',
      '?': '¿‽',
      '%': '‰',
      '.': '…••',
      '-': '±‐–—',
      '+': '±†‡',
      '\'': '′″‴‘’‚‛',
      '"': '“”„‟',
      '<': '≤‹',
      '>': '≥›',
      '=': '≈≠≡'
    };
    return Longpress = (function() {
      Longpress.prototype.timer = null;

      Longpress.prototype.lastKeyCode = null;

      function Longpress(iframeDocument) {
        this.iframeDocument = iframeDocument;
        this.iframeBody = iframeDocument.querySelector('body');
        this.iframeBody.addEventListener('keydown', this.onKeydown.bind(this));
        this.iframeBody.addEventListener('keyup', this.onKeyup.bind(this));
      }

      Longpress.prototype.onKeydown = function(e) {
        var pressedChar,
          _this = this;
        if (e.keyCode === this.lastKeyCode) {
          e.preventDefault();
          pressedChar = e.shiftKey ? shiftcodes[e.keyCode] : codes[e.keyCode];
          if ((this.timer == null) && (pressedChar != null)) {
            this.timer = setTimeout((function() {
              var list;
              list = _this.createList(pressedChar);
              return _this.show(list);
            }), 500);
          }
        }
        return this.lastKeyCode = e.keyCode;
      };

      Longpress.prototype.onKeyup = function(e) {
        clearTimeout(this.timer);
        this.timer = null;
        this.lastKeyCode = null;
        return this.hide();
      };

      Longpress.prototype.createList = function(pressedChar) {
        var frag, ul,
          _this = this;
        ul = document.createElement('ul');
        ul.className = 'longpress';
        frag = document.createDocumentFragment();
        _.each(diacritics[pressedChar], function(chr) {
          var li;
          li = document.createElement('li');
          li.textContent = chr;
          $(li).mouseenter(function(e) {
            return _this.replaceChar(e.target.textContent);
          });
          return frag.appendChild(li);
        });
        ul.appendChild(frag);
        return ul;
      };

      Longpress.prototype.show = function(list) {
        this.iframeBody.appendChild(list);
        return $(list).addClass('active');
      };

      Longpress.prototype.hide = function() {
        var list;
        list = this.iframeBody.querySelector('.longpress');
        if (list != null) {
          this.iframeBody.removeChild(list);
          return $(list).removeClass('active');
        }
      };

      Longpress.prototype.replaceChar = function(chr) {
        var range, sel;
        range = this.iframeDocument.getSelection().getRangeAt(0);
        range.setStart(range.startContainer, range.startOffset - 1);
        range.deleteContents();
        range.insertNode(document.createTextNode(chr));
        range.collapse();
        sel = this.iframeDocument.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        return this.iframeBody.focus();
      };

      return Longpress;

    })();
  });

}).call(this);
