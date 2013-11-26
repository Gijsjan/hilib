(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Fn, Form, MultiForm, validation, _ref;
    Fn = require('hilib/functions/general');
    validation = require('hilib/managers/validation');
    Form = require('hilib/views/form/main');
    return MultiForm = (function(_super) {
      __extends(MultiForm, _super);

      function MultiForm() {
        this.addSubform = __bind(this.addSubform, this);
        _ref = MultiForm.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      MultiForm.prototype.events = function() {
        return _.extend(MultiForm.__super__.events.apply(this, arguments), {
          'click button.addform': 'addForm',
          'click button.remove': 'removeForm'
        });
      };

      MultiForm.prototype.addForm = function(ev) {
        return this.collection.add(new this.Model());
      };

      MultiForm.prototype.removeForm = function(ev) {
        return this.collection.remove(this.getModel(ev));
      };

      MultiForm.prototype.createModels = function() {
        var _base;
        if ((_base = this.options).value == null) {
          _base.value = [];
        }
        this.collection = new Backbone.Collection(this.options.value, {
          model: this.Model
        });
        return this.trigger('createModels:finished');
      };

      MultiForm.prototype.addListeners = function() {
        var _this = this;
        this.listenTo(this.collection, 'change', function() {
          return _this.triggerChange();
        });
        this.listenTo(this.collection, 'add', function() {
          return _this.render();
        });
        return this.listenTo(this.collection, 'remove', function() {
          _this.triggerChange();
          return _this.render();
        });
      };

      MultiForm.prototype.getModel = function(ev) {
        var cid;
        cid = $(ev.currentTarget).parents('[data-cid]').attr('data-cid');
        return this.collection.get(cid);
      };

      MultiForm.prototype.addSubform = function(attr, View) {
        var _this = this;
        return this.collection.each(function(model) {
          return _this.renderSubform(attr, View, model);
        });
      };

      return MultiForm;

    })(Form);
  });

}).call(this);
