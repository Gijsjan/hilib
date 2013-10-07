(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Fn, Longpress, Views, codes, diacritics, shiftcodes, _ref;
    Fn = require('hilib/functions/general');
    Views = {
      Base: require('views/base')
    };
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
      78: 'n',
      79: 'o',
      80: 'p',
      82: 'r',
      83: 's',
      84: 't',
      85: 'u',
      86: 'v',
      87: 'w',
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
      78: 'N',
      79: 'O',
      80: 'P',
      82: 'R',
      83: 'S',
      84: 'T',
      85: 'U',
      86: 'V',
      87: 'W',
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
    return Longpress = (function(_super) {
      __extends(Longpress, _super);

      function Longpress() {
        _ref = Longpress.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Longpress.prototype.initialize = function() {
        Longpress.__super__.initialize.apply(this, arguments);
        this.timer = null;
        this.lastKeyCode = null;
        this.keyDown = false;
        this.iframe = this.options.parent.querySelector('iframe');
        this.iframeBody = this.iframe.contentDocument.querySelector('body');
        this.iframeBody.addEventListener('keydown', this.onKeydown.bind(this));
        this.iframeBody.addEventListener('keyup', this.onKeyup.bind(this));
        this.editorBody = this.options.parent;
        return this.editorBody.addEventListener('click', this.onClick.bind(this));
      };

      Longpress.prototype.render = function(pressedChar) {
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

      Longpress.prototype.onKeydown = function(e) {
        var pressedChar,
          _this = this;
        if (this.longKeyDown) {
          e.preventDefault();
          return false;
        }
        pressedChar = e.shiftKey ? shiftcodes[e.keyCode] : codes[e.keyCode];
        if (e.keyCode === this.lastKeyCode) {
          e.preventDefault();
          if (pressedChar != null) {
            this.longKeyDown = true;
            if (this.timer == null) {
              this.timer = setTimeout((function() {
                var list;
                _this.rangeManager.set(_this.iframe.contentWindow.getSelection().getRangeAt(0));
                list = _this.render(pressedChar);
                return _this.show(list);
              }), 300);
            }
          }
        }
        return this.lastKeyCode = e.keyCode;
      };

      Longpress.prototype.onKeyup = function(e) {
        this.longKeyDown = false;
        return this.hide();
      };

      Longpress.prototype.onClick = function(e) {
        if (this.editorBody.querySelector('ul.longpress') != null) {
          e.preventDefault();
          e.stopPropagation();
          return this.resetFocus();
        }
      };

      Longpress.prototype.rangeManager = (function() {
        var currentRange,
          _this = this;
        currentRange = null;
        return {
          get: function() {
            return currentRange;
          },
          set: function(r) {
            return currentRange = r.cloneRange();
          },
          clear: function() {
            return currentRange = null;
          }
        };
      })();

      Longpress.prototype.show = function(list) {
        return this.editorBody.appendChild(list);
      };

      Longpress.prototype.hide = function() {
        var list;
        this.lastKeyCode = null;
        list = this.editorBody.querySelector('.longpress');
        if (list != null) {
          clearTimeout(this.timer);
          this.timer = null;
          this.rangeManager.clear();
          return this.editorBody.removeChild(list);
        }
      };

      Longpress.prototype.replaceChar = function(chr) {
        var range;
        range = this.rangeManager.get();
        range.setStart(range.startContainer, range.startOffset - 1);
        range.deleteContents();
        range.insertNode(document.createTextNode(chr));
        range.collapse(false);
        return this.resetFocus();
      };

      Longpress.prototype.resetFocus = function() {
        var sel;
        this.iframe.contentWindow.focus();
        sel = this.iframe.contentWindow.getSelection();
        sel.removeAllRanges();
        return sel.addRange(this.rangeManager.get());
      };

      return Longpress;

    })(Views.Base);
  });

}).call(this);
