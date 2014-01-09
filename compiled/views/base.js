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
        var _this = this;
        _.extend(this, Pubsub);
        this.subviews = {};
        console.log(this);
        this.on('to-cache', function() {
          var name, subview, _ref1, _results;
          _this.undelegateEvents();
          _ref1 = _this.subviews;
          _results = [];
          for (name in _ref1) {
            subview = _ref1[name];
            _results.push(subview.trigger('to-cache'));
          }
          return _results;
        });
        return this.on('from-cache', function() {
          var name, subview, _ref1, _results;
          _this.delegateEvents();
          _ref1 = _this.subviews;
          _results = [];
          for (name in _ref1) {
            subview = _ref1[name];
            _results.push(subview.trigger('from-cache'));
          }
          return _results;
        });
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
