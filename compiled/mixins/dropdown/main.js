(function() {
  define(function(require) {
    var Backbone, Fn, Templates, optionMixin;
    Backbone = require('backbone');
    Fn = require('hilib/functions/general');
    optionMixin = require('hilib/mixins/dropdown/options');
    Templates = {
      Options: require('text!hilib/mixins/dropdown/main.html')
    };
    return {
      dropdownInitialize: function() {
        var models, _base, _base1, _base2, _base3, _ref, _ref1,
          _this = this;
        if ((_base = this.options).config == null) {
          _base.config = {};
        }
        this.data = (_ref = this.options.config.data) != null ? _ref : {};
        this.settings = (_ref1 = this.options.config.settings) != null ? _ref1 : {};
        if ((_base1 = this.settings).mutable == null) {
          _base1.mutable = false;
        }
        if ((_base2 = this.settings).editable == null) {
          _base2.editable = false;
        }
        if ((_base3 = this.settings).defaultAdd == null) {
          _base3.defaultAdd = true;
        }
        this.selected = null;
        if (this.data instanceof Backbone.Collection) {
          this.collection = this.data;
        } else if (_.isArray(this.data) && _.isString(this.data[0])) {
          models = this.strArray2optionArray(this.data);
          this.collection = new Backbone.Collection(models);
        } else {
          console.error('No valid data passed to dropdown');
        }
        this.filtered_options = this.collection.clone();
        _.extend(this.filtered_options, optionMixin);
        if (this.settings.mutable) {
          this.listenTo(this.collection, 'add', function(model, collection, options) {
            _this.selected = model;
            _this.triggerChange();
            return _this.filtered_options.add(model);
          });
          this.listenTo(this.filtered_options, 'add', this.renderOptions);
        }
        this.listenTo(this.filtered_options, 'reset', this.renderOptions);
        this.listenTo(this.filtered_options, 'currentOption:change', function(model) {
          return _this.$('li[data-id="' + model.id + '"]').addClass('active');
        });
        return this.on('change', function() {
          return _this.resetOptions();
        });
      },
      dropdownRender: function(tpl) {
        var rtpl,
          _this = this;
        if (this.preDropdownRender != null) {
          this.preDropdownRender();
        }
        rtpl = _.template(tpl, {
          viewId: this.cid,
          selected: this.selected,
          settings: this.settings
        });
        this.$el.html(rtpl);
        this.$optionlist = this.$('ul.list');
        this.renderOptions();
        this.$('input').focus();
        $('body').click(function(ev) {
          if (!(_this.el === ev.target || Fn.isDescendant(_this.el, ev.target))) {
            return _this.hideOptionlist();
          }
        });
        if (this.settings.inputClass != null) {
          this.$('input').addClass(this.settings.inputClass);
        }
        if (this.postDropdownRender != null) {
          this.postDropdownRender();
        }
        return this;
      },
      renderOptions: function() {
        var rtpl;
        rtpl = _.template(Templates.Options, {
          collection: this.filtered_options,
          selected: this.selected
        });
        return this.$optionlist.html(rtpl);
      },
      dropdownEvents: function() {
        var evs;
        evs = {
          'click .caret': 'toggleList',
          'click li.list': 'selectItem'
        };
        evs['keyup input[data-view-id="' + this.cid + '"]'] = 'onKeyup';
        evs['keydown input[data-view-id="' + this.cid + '"]'] = 'onKeydown';
        return evs;
      },
      toggleList: function(ev) {
        this.$optionlist.toggle();
        return this.$('input').focus();
      },
      onKeydown: function(ev) {
        if (ev.keyCode === 38 && this.$optionlist.is(':visible')) {
          return ev.preventDefault();
        }
      },
      onKeyup: function(ev) {
        this.$('.active').removeClass('active');
        if (ev.keyCode === 38) {
          this.$optionlist.show();
          return this.filtered_options.prev();
        } else if (ev.keyCode === 40) {
          this.$optionlist.show();
          return this.filtered_options.next();
        } else if (ev.keyCode === 13) {
          return this.selectItem(ev);
        } else {
          return this.filter(ev.currentTarget.value);
        }
      },
      destroy: function() {
        $('body').off('click');
        return this.remove();
      },
      resetOptions: function() {
        this.filtered_options.reset(this.collection.models);
        this.filtered_options.resetCurrentOption();
        return this.hideOptionlist();
      },
      hideOptionlist: function() {
        return this.$optionlist.hide();
      },
      filter: function(value) {
        var models, re;
        if (value.length > 1) {
          value = Fn.escapeRegExp(value);
          re = new RegExp(value, 'i');
          models = this.collection.filter(function(model) {
            return re.test(model.get('title'));
          });
          if (models.length > 0) {
            this.filtered_options.reset(models);
            this.$optionlist.show();
          }
        }
        if (this.postDropdownFilter != null) {
          return this.postDropdownFilter(models);
        }
      },
      strArray2optionArray: function(strArray) {
        return _.map(strArray, function(item) {
          return {
            id: item,
            title: item
          };
        });
      }
    };
  });

}).call(this);
