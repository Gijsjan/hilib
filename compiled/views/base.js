(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, BaseView, Pubsub, _ref;
    Backbone = require('backbone');
    Pubsub = require('hilib/mixins/pubsub');
    return BaseView = (function(_super) {
      __extends(BaseView, _super);

      function BaseView() {
        _ref = BaseView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      BaseView.prototype.initialize = function() {
        _.extend(this, Pubsub);
        return this.subviews = {};
      };

      BaseView.prototype.destroy = function() {
        var name, subview, _ref1;
        _ref1 = this.subviews;
        for (name in _ref1) {
          subview = _ref1[name];
          subview.destroy();
        }
        return this.remove();
      };

      return BaseView;

    })(Backbone.View);
  });

}).call(this);
