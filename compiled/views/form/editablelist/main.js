(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Collections, EditableList, Tpl, Views, _ref;
    Collections = {
      Base: require('collections/base')
    };
    Views = {
      Base: require('views/base')
    };
    Tpl = require('text!hilib/views/form/editablelist/main.html');
    return EditableList = (function(_super) {
      __extends(EditableList, _super);

      function EditableList() {
        _ref = EditableList.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      EditableList.prototype.className = 'editablelist';

      EditableList.prototype.initialize = function() {
        var value, _base, _ref1;
        EditableList.__super__.initialize.apply(this, arguments);
        if ((_base = this.options).config == null) {
          _base.config = {};
        }
        this.settings = (_ref1 = this.options.config.settings) != null ? _ref1 : {};
        value = _.map(this.options.value, function(val) {
          return {
            id: val
          };
        });
        this.selected = new Collections.Base(value);
        this.listenTo(this.selected, 'add', this.render);
        this.listenTo(this.selected, 'remove', this.render);
        return this.render();
      };

      EditableList.prototype.render = function() {
        var rtpl;
        rtpl = _.template(Tpl, {
          viewId: this.cid,
          selected: this.selected
        });
        this.$el.html(rtpl);
        this.triggerChange();
        if (this.settings.inputClass != null) {
          this.$('input').addClass(this.settings.inputClass);
        }
        this.$('input').focus();
        return this;
      };

      EditableList.prototype.events = function() {
        var evs;
        evs = {
          'click li': 'removeLi',
          'click button': 'addSelected'
        };
        evs['keyup input'] = 'onKeyup';
        return evs;
      };

      EditableList.prototype.removeLi = function(ev) {
        return this.selected.removeById(ev.currentTarget.getAttribute('data-id'));
      };

      EditableList.prototype.onKeyup = function(ev) {
        var valueLength;
        valueLength = ev.currentTarget.value.length;
        if (ev.keyCode === 13 && valueLength > 0) {
          return this.addSelected();
        } else if (valueLength > 1) {
          return this.showButton();
        } else {
          return this.hideButton();
        }
      };

      EditableList.prototype.addSelected = function() {
        this.selected.add({
          id: this.el.querySelector('input').value
        });
        return this.el.querySelector('button').style.display = 'none';
      };

      EditableList.prototype.showButton = function(ev) {
        return this.el.querySelector('button').style.display = 'inline-block';
      };

      EditableList.prototype.hideButton = function(ev) {
        return this.el.querySelector('button').style.display = 'none';
      };

      EditableList.prototype.triggerChange = function() {
        return this.trigger('change', this.selected.pluck('id'));
      };

      return EditableList;

    })(Views.Base);
  });

}).call(this);
