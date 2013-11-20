(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Fn, Form, Views, validation, _ref;
    Fn = require('hilib/functions/general');
    Views = {
      Base: require('views/base')
    };
    validation = require('hilib/managers/validation');
    return Form = (function(_super) {
      __extends(Form, _super);

      function Form() {
        this.renderSubform = __bind(this.renderSubform, this);
        this.addSubform = __bind(this.addSubform, this);
        _ref = Form.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Form.prototype.className = 'form';

      Form.prototype.initialize = function() {
        Form.__super__.initialize.apply(this, arguments);
        if (this.subformConfig == null) {
          this.subformConfig = this.options.subformConfig;
        }
        if (this.subformConfig == null) {
          this.subformConfig = {};
        }
        if (this.Model == null) {
          this.Model = this.options.Model;
        }
        if (this.Model == null) {
          this.Model = Backbone.Model;
        }
        if (this.tpl == null) {
          this.tpl = this.options.tpl;
        }
        if (this.tpl == null) {
          throw 'Unknow template!';
        }
        this.on('createModels:finished', this.render, this);
        this.createModels();
        this.addValidation();
        return this.addListeners();
      };

      Form.prototype.events = function() {
        var evs;
        evs = {};
        evs['change textarea'] = 'inputChanged';
        evs['change input'] = 'inputChanged';
        evs['change select'] = 'inputChanged';
        evs['keydown textarea'] = 'textareaKeyup';
        evs['click input[type="submit"]'] = 'submit';
        return evs;
      };

      Form.prototype.inputChanged = function(ev) {
        var model, value;
        ev.stopPropagation();
        this.$(ev.currentTarget).removeClass('invalid').attr('title', '');
        model = this.model != null ? this.model : this.getModel(ev);
        value = ev.currentTarget.type === 'checkbox' ? ev.currentTarget.checked : ev.currentTarget.value;
        if (ev.currentTarget.name !== '') {
          return model.set(ev.currentTarget.name, value, {
            validate: true
          });
        }
      };

      Form.prototype.textareaKeyup = function(ev) {
        ev.currentTarget.style.height = '32px';
        return ev.currentTarget.style.height = ev.currentTarget.scrollHeight + 6 + 'px';
      };

      Form.prototype.submit = function(ev) {
        var _this = this;
        ev.preventDefault();
        return this.model.save([], {
          success: function(model, response, options) {
            _this.trigger('save:success', model, response, options);
            return _this.reset();
          },
          error: function(model, xhr, options) {
            return _this.trigger('save:error', model, xhr, options);
          }
        });
      };

      Form.prototype.preRender = function() {};

      Form.prototype.render = function() {
        var View, attr, rtpl, _ref1,
          _this = this;
        this.preRender();
        if (this.data == null) {
          this.data = {};
        }
        this.data.viewId = this.cid;
        if (this.model != null) {
          this.data.model = this.model;
        }
        if (this.collection != null) {
          this.data.collection = this.collection;
        }
        if (this.tpl == null) {
          throw 'Unknow template!';
        }
        rtpl = _.isString(this.tpl) ? _.template(this.tpl, this.data) : this.tpl(this.data);
        this.$el.html(rtpl);
        this.el.setAttribute('data-view-cid', this.cid);
        if (this.subforms == null) {
          this.subforms = {};
        }
        _ref1 = this.subforms;
        for (attr in _ref1) {
          if (!__hasProp.call(_ref1, attr)) continue;
          View = _ref1[attr];
          this.addSubform(attr, View);
        }
        this.$('textarea').each(function(index, textarea) {
          return textarea.style.height = textarea.scrollHeight + 6 > 32 ? textarea.scrollHeight + 6 + 'px' : '32px';
        });
        this.postRender();
        return this;
      };

      Form.prototype.postRender = function() {};

      Form.prototype.reset = function() {
        this.model = this.model.clone();
        this.model.clear({
          silent: true
        });
        return this.el.querySelector('form').reset();
      };

      Form.prototype.createModels = function() {
        var _base,
          _this = this;
        if (this.model == null) {
          if ((_base = this.options).value == null) {
            _base.value = {};
          }
          this.model = new this.Model(this.options.value);
          if (this.model.isNew()) {
            return this.trigger('createModels:finished');
          } else {
            return this.model.fetch({
              success: function() {
                return _this.trigger('createModels:finished');
              }
            });
          }
        } else {
          return this.trigger('createModels:finished');
        }
      };

      Form.prototype.addValidation = function() {
        var _this = this;
        _.extend(this, validation);
        return this.validator({
          invalid: function(model, attr, msg) {
            return _this.$("[data-cid='" + model.cid + "'] [name='" + attr + "']").addClass('invalid').attr('title', msg);
          }
        });
        /* @on 'validator:validated', => $('button.save').prop('disabled', false).removeAttr('title')*/

        /* @on 'validator:invalidated', => $('button.save').prop('disabled', true).attr 'title', 'The form cannot be saved due to invalid values.'*/

      };

      Form.prototype.addListeners = function() {
        var _this = this;
        return this.listenTo(this.model, 'change', function() {
          return _this.triggerChange();
        });
      };

      Form.prototype.triggerChange = function() {
        var object;
        object = this.model != null ? this.model : this.collection;
        return this.trigger('change', object.toJSON(), object);
      };

      Form.prototype.addSubform = function(attr, View) {
        return this.renderSubform(attr, View, this.model);
      };

      Form.prototype.renderSubform = function(attr, View, model) {
        var htmlSafeAttr, placeholders, value, view,
          _this = this;
        value = attr.indexOf('.') > -1 ? Fn.flattenObject(model.attributes)[attr] : model.get(attr);
        if (value == null) {
          console.error('Subform value is undefined!', this.model);
        }
        view = new View({
          value: value,
          config: this.subformConfig[attr]
        });
        htmlSafeAttr = attr.split('.').join('_');
        placeholders = this.el.querySelectorAll("[data-cid='" + model.cid + "'] ." + htmlSafeAttr + "-placeholder");
        if (placeholders.length > 1) {
          _.each(placeholders, function(placeholder) {
            var el;
            el = Fn.closest(placeholder, '[data-cid]');
            if (el.getAttribute('data-cid') === model.cid && placeholder.innerHTML === '') {
              return placeholder.appendChild(view.el);
            }
          });
        } else {
          placeholders[0].appendChild(view.el);
        }
        return this.listenTo(view, 'change', function(data) {
          return model.set(attr, data);
        });
      };

      return Form;

    })(Views.Base);
  });

}).call(this);
