(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var AutoSuggest, Views, dropdown, tpls, _ref;
    Views = {
      Base: require('views/base')
    };
    tpls = require('hilib/templates');
    dropdown = require('hilib/mixins/dropdown/main');
    return AutoSuggest = (function(_super) {
      __extends(AutoSuggest, _super);

      function AutoSuggest() {
        _ref = AutoSuggest.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AutoSuggest.prototype.className = 'autosuggest';

      AutoSuggest.prototype.initialize = function(options) {
        var getModel, _ref1, _ref2;
        this.options = options;
        AutoSuggest.__super__.initialize.apply(this, arguments);
        _.extend(this, dropdown);
        this.dropdownInitialize();
        getModel = (_ref1 = this.settings.getModel) != null ? _ref1 : function(val, coll) {
          return coll.get(val);
        };
        this.selected = (_ref2 = getModel(this.options.value, this.collection)) != null ? _ref2 : new Backbone.Model({
          id: '',
          title: ''
        });
        /* DEBUG console.log @selected, @settings.getModel, @options.value, @collection*/

        return this.dropdownRender(tpls['hilib/views/form/autosuggest/main']);
      };

      AutoSuggest.prototype.postDropdownRender = function() {
        if (!this.settings.defaultAdd) {
          this.$('button.add').addClass('visible');
        }
        if (this.selected.id !== '') {
          return this.$('button.edit').addClass('visible');
        }
      };

      AutoSuggest.prototype.events = function() {
        return _.extend(this.dropdownEvents(), {
          'click button.add': 'addOption',
          'click button.edit': function() {
            return this.trigger('edit', this.selected.toJSON());
          }
        });
      };

      AutoSuggest.prototype.addOption = function(ev) {
        var value;
        if (this.settings.defaultAdd) {
          this.$('button.add').removeClass('visible');
        }
        value = this.el.querySelector('input').value;
        if (this.settings.defaultAdd) {
          this.$('button.edit').addClass('visible');
          return this.collection.add({
            id: value,
            title: value
          });
        } else {
          return this.trigger('customAdd', value, this.collection);
        }
      };

      AutoSuggest.prototype.addSelected = function(ev) {
        var _this = this;
        if ((ev.keyCode != null) && ev.keyCode === 13) {
          if (this.filtered_options.currentOption != null) {
            this.selected = this.filtered_options.currentOption;
          } else {
            this.selected = this.filtered_options.find(function(option) {
              return option.get('title').toLowerCase() === ev.currentTarget.value.toLowerCase();
            });
            if ((this.selected == null) && this.settings.mutable) {
              this.$('button.add').addClass('visible');
            }
          }
        } else {
          this.selected = this.collection.get(ev.currentTarget.getAttribute('data-id'));
        }
        if (this.selected != null) {
          this.$('input').val(this.selected.get('title'));
          this.$('button.edit').addClass('visible');
          if (this.settings.defaultAdd) {
            this.$('button.add').removeClass('visible');
          }
          return this.triggerChange();
        }
      };

      AutoSuggest.prototype.triggerChange = function() {
        return this.trigger('change', this.selected.toJSON());
      };

      AutoSuggest.prototype.postDropdownFilter = function(models) {
        if (this.settings.mutable) {
          if ((models != null) && !models.length) {
            return this.$('button.add').addClass('visible');
          } else {
            if (this.settings.defaultAdd) {
              return this.$('button.add').removeClass('visible');
            }
          }
        }
      };

      return AutoSuggest;

    })(Views.Base);
  });

}).call(this);
