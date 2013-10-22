(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var AutoSuggest, Tpl, Views, dropdown, _ref;
    Views = {
      Base: require('views/base')
    };
    Tpl = require('text!hilib/views/form/autosuggest/main.html');
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
          return coll.get(val.id);
        };
        this.selected = (_ref2 = getModel(this.options.value, this.collection)) != null ? _ref2 : new Backbone.Model({
          id: '',
          title: ''
        });
        /* DEBUG console.log @selected, @settings.getModel, @options.value, @collection*/

        return this.dropdownRender(Tpl);
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
          'click button.add': 'addOption'
        });
      };

      AutoSuggest.prototype.addOption = function(ev) {
        if (this.settings.defaultAdd) {
          return this.collection.add({
            id: this.$('input').val(),
            title: this.$('input').val()
          });
        }
      };

      AutoSuggest.prototype.selectItem = function(ev) {
        var _this = this;
        if ((ev.keyCode != null) && ev.keyCode === 13) {
          if (this.filtered_options.currentOption != null) {
            this.selected = this.filtered_options.currentOption;
          } else {
            this.selected = this.filtered_options.find(function(option) {
              return option.get('title') === ev.currentTarget.value;
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
            return this.$('button.add').removeClass('visible');
          }
        }
      };

      return AutoSuggest;

    })(Views.Base);
  });

}).call(this);
