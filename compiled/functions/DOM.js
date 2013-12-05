(function() {
  define(function(require) {
    var DOM;
    return DOM = function(el) {
      if (_.isString(el)) {
        el = document.querySelector(el);
      }
      return {
        el: el,
        q: function(query) {
          return DOM(el.querySelector(query));
        },
        find: function(query) {
          return DOM(el.querySelector(query));
        },
        findAll: function(query) {
          return DOM(el.querySelectorAll(query));
        },
        html: function(html) {
          if (html == null) {
            return el.innerHTML;
          }
          if (html.nodeType === 1 || html.nodeType === 11) {
            el.innerHTML = '';
            return el.appendChild(html);
          } else {
            return el.innerHTML = html;
          }
        },
        hide: function() {
          el.style.display = 'none';
          return this;
        },
        show: function(displayType) {
          if (displayType == null) {
            displayType = 'block';
          }
          el.style.display = displayType;
          return this;
        },
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
        append: function(childEl) {
          return el.appendChild(childEl);
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
        },
        hasClass: function(name) {
          return (' ' + el.className + ' ').indexOf(' ' + name + ' ') > -1;
        },
        addClass: function(name) {
          if (!this.hasClass(name)) {
            return el.className += ' ' + name;
          }
        },
        removeClass: function(name) {
          var names;
          names = ' ' + el.className + ' ';
          names = names.replace(' ' + name + ' ', '');
          return el.className = names.replace(/^\s+|\s+$/g, '');
        },
        toggleClass: function(name) {
          if (this.hasClass(name)) {
            return this.addClass(name);
          } else {
            return this.removeClass(name);
          }
        }
      };
    };
  });

}).call(this);
