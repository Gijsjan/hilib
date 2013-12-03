(function() {
  var __hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Fn;
    Fn = require('hilib/functions/general');
    return {
      validate: function(attrs, options) {
        var attr, flatAttrs, invalids, settings, _ref;
        invalids = [];
        flatAttrs = Fn.flattenObject(attrs);
        _ref = this.validation;
        for (attr in _ref) {
          if (!__hasProp.call(_ref, attr)) continue;
          settings = _ref[attr];
          if (!settings.required && flatAttrs[attr].length !== 0) {
            if ((settings.pattern != null) && settings.pattern === 'number') {
              if (!/^\d+$/.test(flatAttrs[attr])) {
                invalids.push({
                  attr: attr,
                  msg: 'Please enter a valid number.'
                });
              }
            }
          } else if (settings.required && flatAttrs[attr].length === 0) {
            invalids.push({
              attr: attr,
              msg: 'Please enter a value.'
            });
          }
        }
        if (invalids.length) {
          return invalids;
        } else {

        }
      },
      validator: function(args) {
        var invalid, listenToObject, valid,
          _this = this;
        valid = args.valid, invalid = args.invalid;
        if (this.model != null) {
          listenToObject = this.model;
          this.model.validate = this.validate;
        } else if (this.collection != null) {
          listenToObject = this.collection;
          this.collection.each(function(model) {
            return model.validate = _this.validate;
          });
          this.listenTo(this.collection, 'add', function(model, collection, options) {
            return model.validate = _this.validate;
          });
        } else {
          console.error("Validator mixin: no model or collection attached to view!");
          return;
        }
        this.invalidAttrs = {};
        this.listenTo(listenToObject, 'invalid', function(model, errors, options) {
          return _.each(errors, function(error) {
            if (!_.size(_this.invalidAttrs)) {
              _this.trigger('validator:invalidated');
            }
            _this.invalidAttrs[error.attr] = error;
            return invalid(model, error.attr, error.msg);
          });
        });
        if (valid != null) {
          return this.listenTo(listenToObject, 'change', function(model, options) {
            var attr, flatChangedAttrs, _results;
            flatChangedAttrs = Fn.flattenObject(model.changedAttributes());
            _results = [];
            for (attr in flatChangedAttrs) {
              if (!__hasProp.call(flatChangedAttrs, attr)) continue;
              if (_this.invalidAttrs.hasOwnProperty(attr)) {
                valid(model, attr);
                delete _this.invalidAttrs[attr];
                if (!_.size(_this.invalidAttrs)) {
                  _results.push(_this.trigger('validator:validated'));
                } else {
                  _results.push(void 0);
                }
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          });
        }
      }
    };
  });

}).call(this);
