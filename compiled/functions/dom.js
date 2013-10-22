(function() {
  define(function(require) {
    return {
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
      }
    };
  });

}).call(this);
