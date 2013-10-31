(function() {
  define(function(require) {
    var Backbone, Collections, ViewManager;
    Backbone = require('backbone');
    Collections = {
      'View': require('collections/view')
    };
    ViewManager = (function() {
      var currentViews, selfDestruct;

      currentViews = new Collections.View();

      ViewManager.prototype.el = 'div#main';

      selfDestruct = function(view) {
        if (!currentViews.has(view)) {
          return console.error('Unknown view!');
        } else {
          if (view.destroy != null) {
            return view.destroy();
          } else {
            return view.remove();
          }
        }
      };

      function ViewManager() {
        this.main = $(this.el);
      }

      ViewManager.prototype.clear = function(view) {
        if (view != null) {
          selfDestruct(view);
          return currentViews.remove(view.cid);
        } else {
          currentViews.each(function(model) {
            return selfDestruct(model.get('view'));
          });
          return currentViews.reset();
        }
      };

      ViewManager.prototype.register = function(view, options) {
        if (options == null) {
          options = {};
        }
        if (options.managed == null) {
          options.managed = true;
        }
        if (options.cached == null) {
          options.cached = false;
        }
        if ((view != null) && options.managed) {
          return currentViews.add({
            id: view.cid,
            options: options,
            view: view
          });
        }
      };

      ViewManager.prototype.show = function(View, query) {
        var html, view;
        if (query == null) {
          query = {};
        }
        this.clear();
        view = new View(query);
        html = view == null ? '' : view.el;
        console.log(html);
        return this.main.html(html);
      };

      return ViewManager;

    })();
    return new ViewManager();
  });

}).call(this);
