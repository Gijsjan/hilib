(function() {
  define(function(require) {
    var Backbone, StringFn, ViewManager;
    Backbone = require('backbone');
    StringFn = require('hilib/functions/string');
    ViewManager = (function() {
      var cachedViews, currentView;

      function ViewManager() {}

      currentView = null;

      cachedViews = {};

      ViewManager.prototype.show = function($el, View, options) {
        var el, viewHashCode;
        if (options == null) {
          options = {};
        }
        if (options.append == null) {
          options.append = false;
        }
        if (options.prepend == null) {
          options.prepend = false;
        }
        viewHashCode = StringFn.hashCode(View.toString() + JSON.stringify(options));
        if (!cachedViews.hasOwnProperty(viewHashCode)) {
          cachedViews[viewHashCode] = new View(options);
        }
        currentView = cachedViews[viewHashCode];
        el = $el[0];
        if (!(options.append || options.prepend)) {
          el.innerHTML = '';
        }
        if (options.prepend && (el.firstChild != null)) {
          el.insertBefore(currentView.el, el.firstChild);
        } else {
          el.appendChild(currentView.el);
        }
        return currentView;
      };

      return ViewManager;

    })();
    return new ViewManager();
  });

}).call(this);
