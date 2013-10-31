(function() {
  define(function(require) {
    var Backbone, StringFn, ViewManager;
    Backbone = require('backbone');
    StringFn = require('hilib/functions/string');
    ViewManager = (function() {
      var cachedViews, currentViews, selfDestruct;

      function ViewManager() {}

      currentViews = {};

      cachedViews = {};

      selfDestruct = function(view) {
        if (view.destroy != null) {
          return view.destroy();
        } else {
          return view.remove();
        }
      };

      ViewManager.prototype.clear = function(view) {
        if (view != null) {
          selfDestruct(view);
          return delete currentViews[view.cid];
        } else {
          return _.each(currentViews, function(view) {
            if (!view.options.cache) {
              selfDestruct(view);
              return delete currentViews[view.cid];
            }
          });
        }
      };

      ViewManager.prototype.register = function(view, options) {
        if (options == null) {
          options = {};
        }
        if (view != null) {
          return currentViews[view.cid] = view;
        }
      };

      ViewManager.prototype.show = function(el, View, options) {
        var view, viewHashCode;
        if (options == null) {
          options = {};
        }
        if (_.isString(el)) {
          el = document.querySelector(el);
        }
        if (options.cache == null) {
          options.cache = true;
        }
        if (options.append == null) {
          options.append = false;
        }
        if (options.prepend == null) {
          options.prepend = false;
        }
        if (options.cache) {
          viewHashCode = StringFn.hashCode(View.toString() + JSON.stringify(options));
          if (!cachedViews.hasOwnProperty(viewHashCode)) {
            cachedViews[viewHashCode] = new View(options);
          }
          view = cachedViews[viewHashCode];
        } else {
          view = new View(options);
        }
        if (_.isElement(el) && (view != null)) {
          if (!(options.append || options.prepend)) {
            el.innerHTML = '';
          }
          if (options.prepend && (el.firstChild != null)) {
            return el.insertBefore(view.el, el.firstChild);
          } else {
            return el.appendChild(view.el);
          }
        }
      };

      return ViewManager;

    })();
    return new ViewManager();
  });

}).call(this);
