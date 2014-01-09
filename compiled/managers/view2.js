(function() {
  var __hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Backbone, StringFn, ViewManager;
    Backbone = require('backbone');
    StringFn = require('hilib/functions/string');
    ViewManager = (function() {
      var cachedViews, currentView;

      function ViewManager() {}

      currentView = null;

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

      ViewManager.prototype.show = function($el, View, options) {
        var domFunc, viewHashCode;
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
        if (cachedViews.hasOwnProperty(viewHashCode)) {
          cachedViews[viewHashCode].trigger('from-cache');
        } else {
          cachedViews[viewHashCode] = new View(options);
        }
        if (currentView != null) {
          currentView.trigger('to-cache');
        }
        currentView = cachedViews[viewHashCode];
        domFunc = 'html';
        if (options.prepend) {
          domFunc = 'prepend';
        }
        if (options.append) {
          domFunc = 'append';
        }
        $el[domFunc].call($el, currentView.el);
        return currentView;
      };

      return ViewManager;

    })();
    return new ViewManager();
  });

}).call(this);
