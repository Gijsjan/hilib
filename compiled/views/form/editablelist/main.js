(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Collections, EditableList, Views, tpls, _ref;
    Collections = {
      Base: require('collections/base')
    };
    Views = {
      Base: require('views/base')
    };
    tpls = require('hilib/templates');
    return EditableList = (function(_super) {
      __extends(EditableList, _super);

      function EditableList() {
        _ref = EditableList.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      EditableList.prototype.className = 'editablelist';

      EditableList.prototype.initialize = function() {
        var value, _base, _base1, _base2, _ref1;
        EditableList.__super__.initialize.apply(this, arguments);
        if ((_base = this.options).config == null) {
          _base.config = {};
        }
        this.settings = (_ref1 = this.options.config.settings) != null ? _ref1 : {};
        if ((_base1 = this.settings).placeholder == null) {
          _base1.placeholder = '';
        }
        if ((_base2 = this.settings).confirmRemove == null) {
          _base2.confirmRemove = false;
        }
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
        rtpl = tpls['hilib/views/form/editablelist/main']({
          viewId: this.cid,
          selected: this.selected,
          settings: this.settings
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
        var listitemID,
          _this = this;
        listitemID = ev.currentTarget.getAttribute('data-id');
        if (this.settings.confirmRemove) {
          return this.trigger('confirmRemove', listitemID, function() {
            return _this.selected.removeById(listitemID);
          });
        } else {
          return this.selected.removeById(listitemID);
        }
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
