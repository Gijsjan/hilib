(function() {
  define(function(require) {
    return function(el) {
      return {
        closest: function(selector) {
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
        prepend: function(childEl) {
          return el.insertBefore(childEl, el.firstChild);
        },
        /*
        		Native alternative to jQuery's $.offset()
        
        		http://www.quirksmode.org/js/findpos.html
        */

        position: function(parent) {
          var left, loopEl, top;
          if (parent == null) {
            parent = document.body;
          }
          left = 0;
          top = 0;
          loopEl = el;
          while (loopEl !== parent) {
            if (this.hasDescendant(parent)) {
              break;
            }
            left += loopEl.offsetLeft;
            top += loopEl.offsetTop;
            loopEl = loopEl.offsetParent;
          }
          return {
            left: left,
            top: top
          };
        },
        /*
        		Is child el a descendant of parent el?
        
        		http://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-a-child-of-another
        */

        hasDescendant: function(child) {
          var node;
          node = child.parentNode;
          while (node != null) {
            if (node === el) {
              return true;
            }
            node = node.parentNode;
          }
          return false;
        },
        boundingBox: function() {
          var box;
          box = this.position();
          box.width = el.clientWidth;
          box.height = el.clientHeight;
          box.right = box.left + box.width;
          box.bottom = box.top + box.height;
          return box;
        },
        insertAfter: function(newElement, referenceElement) {
          return referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
        },
        highlightUntil: function(endNode, highlightClass) {
          if (highlightClass == null) {
            highlightClass = 'highlight';
          }
          return {
            on: function() {
              var currentNode, filter, range, treewalker,
                _this = this;
              range = document.createRange();
              range.setStartAfter(el);
              range.setEndBefore(endNode);
              filter = function(node) {
                var end, r, start;
                r = document.createRange();
                r.selectNode(node);
                start = r.compareBoundaryPoints(Range.START_TO_START, range);
                end = r.compareBoundaryPoints(Range.END_TO_START, range);
                if (start === -1 || end === 1) {
                  return NodeFilter.FILTER_SKIP;
                } else {
                  return NodeFilter.FILTER_ACCEPT;
                }
              };
              filter.acceptNode = filter;
              treewalker = document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_ELEMENT, filter, false);
              while (treewalker.nextNode()) {
                currentNode = treewalker.currentNode;
                if ((' ' + currentNode.className + ' ').indexOf(' text ') > -1) {
                  currentNode.className = currentNode.className + ' ' + highlightClass;
                }
              }
              return this;
            },
            off: function() {
              var classNames, _i, _len, _ref, _results;
              _ref = document.querySelectorAll('.' + highlightClass);
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                el = _ref[_i];
                classNames = ' ' + el.className + ' ';
                classNames = classNames.replace(' ' + highlightClass + ' ', '');
                _results.push(el.className = classNames.replace(/^\s+|\s+$/g, ''));
              }
              return _results;
            }
          };
        }
      };
    };
  });

}).call(this);