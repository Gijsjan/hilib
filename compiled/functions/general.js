(function() {
  var $,
    __hasProp = {}.hasOwnProperty;

  $ = require('jquery');

  module.exports = {
    closest: function(el, selector) {
      var matchesSelector;
      matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
      while (el) {
        if (matchesSelector.bind(el)(selector)) {
          return el;
        } else {
          el = el.parentNode;
        }
      }
    },
    /*
    	Generates an ID that starts with a letter
    	
    	Example: "aBc12D34"
    
    	param Number length of the id
    	return String
    */

    generateID: function(length) {
      var chars, text;
      length = (length != null) && length > 0 ? length - 1 : 7;
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      text = chars.charAt(Math.floor(Math.random() * 52));
      while (length--) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return text;
    },
    /*
    	Deepcopies arrays and object literals
    	
    	return Array or object
    */

    deepCopy: function(object) {
      var newEmpty;
      newEmpty = Array.isArray(object) ? [] : {};
      return $.extend(true, newEmpty, object);
    },
    timeoutWithReset: (function() {
      var timer;
      timer = null;
      return function(ms, cb, onResetFn) {
        if (timer != null) {
          if (onResetFn != null) {
            onResetFn();
          }
          clearTimeout(timer);
        }
        return timer = setTimeout((function() {
          timer = null;
          return cb();
        }), ms);
      };
    })(),
    /*
    	Highlight text between two nodes. 
    
    	Creates a span.hilite between two given nodes, surrounding the contents of the nodes
    
    	Example usage:
    	hl = Fn.highlighter
    		className: 'highlight' # optional
    		tagName: 'div' # optional
    
    	supEnter = (ev) -> hl.on
    		startNode: el.querySelector(#someid) # required
    		endNode: ev.currentTarget # required
    	supLeave = -> hl.off()
    	$(sup).hover supEnter, supLeave
    */

    highlighter: function(args) {
      var className, el, tagName;
      if (args == null) {
        args = {};
      }
      className = args.className, tagName = args.tagName;
      if (className == null) {
        className = 'hilite';
      }
      if (tagName == null) {
        tagName = 'span';
      }
      el = null;
      return {
        on: function(args) {
          var endNode, range, startNode;
          startNode = args.startNode, endNode = args.endNode;
          range = document.createRange();
          range.setStartAfter(startNode);
          range.setEndBefore(endNode);
          el = document.createElement(tagName);
          el.className = className;
          el.appendChild(range.extractContents());
          return range.insertNode(el);
        },
        off: function() {
          return $(el).replaceWith(function() {
            return $(this).contents();
          });
        }
      };
    },
    /*
    	Native alternative to jQuery's $.offset()
    
    	http://www.quirksmode.org/js/findpos.html
    */

    position: function(el, parent) {
      var left, top;
      left = 0;
      top = 0;
      while (el !== parent) {
        left += el.offsetLeft;
        top += el.offsetTop;
        el = el.offsetParent;
      }
      return {
        left: left,
        top: top
      };
    },
    boundingBox: function(el) {
      var box;
      box = $(el).offset();
      box.width = el.clientWidth;
      box.height = el.clientHeight;
      box.right = box.left + box.width;
      box.bottom = box.top + box.height;
      return box;
    },
    /*
    	Is child el a descendant of parent el?
    
    	http://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-a-child-of-another
    */

    isDescendant: function(parent, child) {
      var node;
      node = child.parentNode;
      while (node != null) {
        if (node === parent) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    },
    /*
    	Removes an item from an array
    */

    removeFromArray: function(arr, item) {
      var index;
      index = arr.indexOf(item);
      arr.splice(index, 1);
      return arr;
    },
    /* Escape a regular expression*/

    escapeRegExp: function(str) {
      return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    },
    /*
    	Flattens an object
    
    	songs:
    		mary:
    			had:
    				little: 'lamb'
    
    	becomes
    
    	songs:
    		mary.had.little: 'lamb'
    
    	Taken from: http://thedersen.com/projects/backbone-validation
    */

    flattenObject: function(obj, into, prefix) {
      var k, v;
      if (into == null) {
        into = {};
      }
      if (prefix == null) {
        prefix = '';
      }
      for (k in obj) {
        if (!__hasProp.call(obj, k)) continue;
        v = obj[k];
        if (_.isObject(v) && !_.isArray(v) && !_.isFunction(v) && !(v instanceof Backbone.Model) && !(v instanceof Backbone.Collection)) {
          this.flattenObject(v, into, prefix + k + '.');
        } else {
          into[prefix + k] = v;
        }
      }
      return into;
    },
    compareJSON: function(current, changed) {
      var attr, changes, value;
      changes = {};
      for (attr in current) {
        if (!__hasProp.call(current, attr)) continue;
        value = current[attr];
        if (!changed.hasOwnProperty(attr)) {
          changes[attr] = 'removed';
        }
      }
      for (attr in changed) {
        if (!__hasProp.call(changed, attr)) continue;
        value = changed[attr];
        if (current.hasOwnProperty(attr)) {
          if (_.isArray(value) || this.isObjectLiteral(value)) {
            if (!_.isEqual(current[attr], changed[attr])) {
              changes[attr] = changed[attr];
            }
          } else {
            if (current[attr] !== changed[attr]) {
              changes[attr] = changed[attr];
            }
          }
        } else {
          changes[attr] = 'added';
        }
      }
      return changes;
    },
    isObjectLiteral: function(obj) {
      var ObjProto;
      if ((obj == null) || typeof obj !== "object") {
        return false;
      }
      ObjProto = obj;
      while (Object.getPrototypeOf(ObjProto = Object.getPrototypeOf(ObjProto)) !== null) {
        0;
      }
      return Object.getPrototypeOf(obj) === ObjProto;
    },
    getScrollPercentage: function(el) {
      var left, scrolledLeft, scrolledTop, top, totalLeft, totalTop;
      scrolledTop = el.scrollTop;
      totalTop = el.scrollHeight - el.clientHeight;
      scrolledLeft = el.scrollLeft;
      totalLeft = el.scrollWidth - el.clientWidth;
      top = totalTop === 0 ? 0 : Math.floor((scrolledTop / totalTop) * 100);
      left = totalLeft === 0 ? 0 : Math.floor((scrolledLeft / totalLeft) * 100);
      return {
        top: top,
        left: left
      };
    },
    setScrollPercentage: function(el, percentages) {
      if (percentages.top < 5) {
        percentages.top = 0;
      }
      if (percentages.top > 95) {
        percentages.top = 100;
      }
      el.scrollTop = (el.scrollHeight - el.clientHeight) * percentages.top / 100;
      return el.scrollLeft = (el.scrollWidth - el.clientWidth) * percentages.left / 100;
    },
    checkCheckboxes: function(selector, checked, baseEl) {
      var cb, checkboxes, _i, _len, _results;
      if (selector == null) {
        selector = 'input[type="checkbox"]';
      }
      if (checked == null) {
        checked = true;
      }
      if (baseEl == null) {
        baseEl = document;
      }
      checkboxes = baseEl.querySelectorAll(selector);
      _results = [];
      for (_i = 0, _len = checkboxes.length; _i < _len; _i++) {
        cb = checkboxes[_i];
        _results.push(cb.checked = checked);
      }
      return _results;
    },
    setCursorToEnd: function(textEl, windowEl) {
      var range, sel, win;
      win = windowEl != null ? windowEl : window;
      if (windowEl == null) {
        windowEl = textEl;
      }
      windowEl.focus();
      range = document.createRange();
      range.selectNodeContents(textEl);
      range.collapse(false);
      sel = win.getSelection();
      if (sel != null) {
        sel.removeAllRanges();
        return sel.addRange(range);
      }
    },
    arraySum: function(arr) {
      if (arr.length === 0) {
        return 0;
      }
      return arr.reduce(function(prev, current) {
        return current + prev;
      });
    },
    getAspectRatio: function(originalWidth, originalHeight, boxWidth, boxHeight) {
      var heightRatio, widthRatio;
      widthRatio = boxWidth / originalWidth;
      heightRatio = boxHeight / originalHeight;
      return Math.min(widthRatio, heightRatio);
    },
    hasScrollBar: function(el) {
      return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
    },
    hasXScrollBar: function(el) {
      return el.scrollWidth > el.clientWidth;
    },
    hasYScrollBar: function(el) {
      return el.scrollHeight > el.clientHeight;
    }
  };

}).call(this);
