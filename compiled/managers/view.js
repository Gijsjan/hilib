(function() {
  var __hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Backbone, StringFn, ViewManager;
    Backbone = require('backbone');
    StringFn = require('hilib/functions/string');
    ViewManager = (function() {
      var cachedViews, currentViews;

      function ViewManager() {}

      currentViews = {};

      cachedViews = {};

      ViewManager.prototype.clear = function(view) {
        var cid, selfDestruct, _results;
        selfDestruct = function(view) {
          if (view.options.persist !== true) {
            if (view.destroy != null) {
              view.destroy();
            } else {
              view.remove();
            }
            return delete currentViews[view.cid];
          }
        };
        if (view != null) {
          return selfDestruct(view);
        } else {
          _results = [];
          for (cid in currentViews) {
            if (!__hasProp.call(currentViews, cid)) continue;
            view = currentViews[cid];
            _results.push(selfDestruct(view));
          }
          return _results;
        }
      };

      ViewManager.prototype.clearCache = function() {
        this.clear();
        return cachedViews = {};
      };

      ViewManager.prototype.register = function(view) {
        if (view != null) {
          return currentViews[view.cid] = view;
        }
      };

      ViewManager.prototype.show = function(el, View, options) {
        var cid, view, viewHashCode;
        if (options == null) {
          options = {};
        }
        for (cid in currentViews) {
          if (!__hasProp.call(currentViews, cid)) continue;
          view = currentViews[cid];
          if (!view.options.cache && !view.options.persist) {
            this.clear(view);
          }
        }
        if (_.isString(el)) {
          el = document.querySelector(el);
        }
        if (options.append == null) {
          options.append = false;
        }
        if (options.prepend == null) {
          options.prepend = false;
        }
        if (options.persist == null) {
          options.persist = false;
        }
        if (options.persist === true) {
          options.cache = false;
        }
        if (options.cache == null) {
          options.cache = true;
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
            el.insertBefore(view.el, el.firstChild);
          } else {
            el.appendChild(view.el);
          }
        }
        return view;
      };

      return ViewManager;

    })();
    return new ViewManager();
  });

}).call(this);
