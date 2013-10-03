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
    Tpl = require('text!viewshtml/form/editablelist/main.html');
    return EditableList = (function(_super) {
      __extends(EditableList, _super);

      function EditableList() {
        _ref = EditableList.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      EditableList.prototype.className = 'editablelist';

      EditableList.prototype.initialize = function() {
        var value;
        EditableList.__super__.initialize.apply(this, arguments);
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
        this.$('input').focus();
        return this;
      };

      EditableList.prototype.events = function() {
        var evs;
        evs = {
          'click li': 'removeLi'
        };
        evs['keyup input[data-view-id="' + this.cid + '"]'] = 'onKeyup';
        return evs;
      };

      EditableList.prototype.removeLi = function(ev) {
        return this.selected.removeById(ev.currentTarget.getAttribute('data-id'));
      };

      EditableList.prototype.onKeyup = function(ev) {
        if (ev.keyCode === 13 && ev.currentTarget.value.length > 0) {
          return this.selected.add({
            id: ev.currentTarget.value
          });
        }
      };

      EditableList.prototype.triggerChange = function() {
        return this.trigger('change', this.selected.pluck('id'));
      };

      return EditableList;

    })(Views.Base);
  });

}).call(this);
