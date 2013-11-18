(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Collections, ComboList, Views, dropdown, tpls, _ref;
    Collections = {
      Base: require('collections/base')
    };
    Views = {
      Base: require('views/base')
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
        var models,
          _this = this;
        ComboList.__super__.initialize.apply(this, arguments);
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

      ComboList.prototype.events = function() {
        return _.extend(this.dropdownEvents(), {
          'click li.selected': 'removeSelected'
        });
      };

      ComboList.prototype.addSelected = function(model) {
        return this.selected.add(model);
      };

      ComboList.prototype.removeSelected = function(ev) {
        var id, model;
        id = ev.currentTarget.getAttribute('data-id');
        model = this.selected.get(id);
        return this.selected.remove(model);
      };

      ComboList.prototype.selectItem = function(ev) {
        var model;
        if ((ev.keyCode != null) && ev.keyCode === 13) {
          if (this.filtered_options.currentOption != null) {
            model = this.filtered_options.currentOption;
          }
        } else {
          model = this.collection.get(ev.currentTarget.getAttribute('data-id'));
        }
        if (model != null) {
          return this.selected.add(model);
        }
      };

      ComboList.prototype.triggerChange = function(options) {
        if (options.added == null) {
          options.added = null;
        }
        if (options.removed == null) {
          options.removed = null;
        }
        return this.trigger('change', {
          collection: this.selected,
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
