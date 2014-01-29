(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Collections, ComboList, Views, dom, dropdown, tpls, _ref;
    dom = require('hilib/functions/DOM');
    Collections = {
      Base: require('hilib/collections/base')
    };
    Views = {
      Base: require('hilib/views/base')
    };
    tpls = require('hilib/templates');
    dropdown = require('hilib/mixins/dropdown/main');
    return ComboList = (function(_super) {
      __extends(ComboList, _super);

      function ComboList() {
        _ref = ComboList.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ComboList.prototype.className = 'combolist';

      ComboList.prototype.initialize = function() {
        var models, _base, _base1, _ref1,
          _this = this;
        ComboList.__super__.initialize.apply(this, arguments);
        if ((_base = this.options).config == null) {
          _base.config = {};
        }
        this.settings = (_ref1 = this.options.config.settings) != null ? _ref1 : {};
        if ((_base1 = this.settings).confirmRemove == null) {
          _base1.confirmRemove = false;
        }
        _.extend(this, dropdown);
        this.dropdownInitialize();
        if (this.options.value instanceof Backbone.Collection) {
          this.selected = this.options.value;
        } else if (_.isArray(this.options.value)) {
          models = this.strArray2optionArray(this.options.value);
          this.selected = new Collections.Base(models);
        } else {
          console.error('No valid value passed to combolist');
        }
        this.listenTo(this.selected, 'add', function(model) {
          _this.dropdownRender(tpls['hilib/views/form/combolist/main']);
          return _this.triggerChange({
            added: model.id
          });
        });
        this.listenTo(this.selected, 'remove', function(model) {
          _this.dropdownRender(tpls['hilib/views/form/combolist/main']);
          return _this.triggerChange({
            removed: model.id
          });
        });
        return this.dropdownRender(tpls['hilib/views/form/combolist/main']);
      };

      ComboList.prototype.postDropdownRender = function() {
        var _this = this;
        return this.filtered_options.reset(this.collection.reject(function(model) {
          return _this.selected.get(model.id) != null;
        }));
      };

      ComboList.prototype.events = function() {
        return _.extend(this.dropdownEvents(), {
          'click li.selected span': 'removeSelected',
          'click button.add': 'createModel',
          'keyup input': 'toggleButton'
        });
      };

      ComboList.prototype.toggleButton = function(ev) {
        var button;
        button = dom(this.el).q('button');
        if ((button != null) && ev.currentTarget.value.length > 1 && ev.keyCode !== 13) {
          return button.show('inline-block');
        } else {
          return button.hide();
        }
      };

      ComboList.prototype.createModel = function(ev) {
        var value;
        value = this.el.querySelector('input').value;
        if (this.settings.mutable && value.length > 1) {
          return this.selected.add({
            id: value,
            title: value
          });
        }
      };

      ComboList.prototype.removeSelected = function(ev) {
        var listitemID, remove,
          _this = this;
        listitemID = ev.currentTarget.parentNode.getAttribute('data-id');
        remove = function() {
          return _this.selected.removeById(listitemID);
        };
        if (this.settings.confirmRemove) {
          return this.trigger('confirmRemove', listitemID, remove);
        } else {
          return remove();
        }
      };

      ComboList.prototype.addSelected = function(ev) {
        var model;
        if ((ev.keyCode != null) && ev.keyCode === 13) {
          if (this.filtered_options.currentOption != null) {
            model = this.filtered_options.currentOption;
          }
          if (model == null) {
            this.createModel();
            return;
          }
        } else {
          model = this.collection.get(ev.currentTarget.getAttribute('data-id'));
        }
        return this.selected.add(model);
      };

      ComboList.prototype.triggerChange = function(options) {
        if (options.added == null) {
          options.added = null;
        }
        if (options.removed == null) {
          options.removed = null;
        }
        return this.trigger('change', {
          selected: this.selected.toJSON(),
          added: options.added,
          removed: options.removed
        });
      };

      ComboList.prototype.strArray2optionArray = function(strArray) {
        return _.map(strArray, function(item) {
          return {
            id: item,
            title: item
          };
        });
      };

      return ComboList;

    })(Views.Base);
  });

}).call(this);
