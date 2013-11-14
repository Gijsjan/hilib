(function() {
  define(function(require) {
    require('hilib/vendor/classList/classList');
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
        highlightUntil: function(endNode, args) {
          var className, tagName;
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
          return {
            on: function() {
              var range, treewalker, _results,
                _this = this;
              range = document.createRange();
              range.setStartAfter(el);
              range.setEndBefore(endNode);
              treewalker = document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_ELEMENT, {
                acceptNode: function(node) {
                  return NodeFilter.FILTER_ACCEPT;
                }
              });
              _results = [];
              while (treewalker.nextNode()) {
                console.log(treewalker.currentNode.classList);
                _results.push(treewalker.currentNode.classList.add(className));
              }
              return _results;
            },
            off: function() {}
          };
        }
      };
    };
  });

}).call(this);
