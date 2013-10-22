(function() {
  define(function(require) {
    var ajax, token;
    ajax = require('hilib/managers/ajax');
    token = require('hilib/managers/token');
    return {
      syncOverride: function(method, model, options) {
        var data, defaults, jqXHR, name, obj, settings, _i, _len, _ref,
          _this = this;
        if (options.attributes != null) {
          obj = {};
          _ref = options.attributes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            name = _ref[_i];
            obj[name] = this.get(name);
          }
          data = JSON.stringify(obj);
        } else {
          data = JSON.stringify(model.toJSON());
        }
        defaults = {
          url: this.url(),
          dataType: 'text',
          data: data
        };
        settings = $.extend(defaults, options);
        if (method === 'create') {
          ajax.token = token.get();
          jqXHR = ajax.post(settings);
          jqXHR.done(function(data, textStatus, jqXHR) {
            var xhr;
            if (jqXHR.status === 201) {
              xhr = ajax.get({
                url: jqXHR.getResponseHeader('Location')
              });
              return xhr.done(function(data, textStatus, jqXHR) {
                console.log('done after url loc');
                _this.trigger('sync');
                return settings.success(data);
              });
            }
          });
          return jqXHR.fail(function(response) {
            return console.log('fail', response);
          });
        } else if (method === 'update') {
          ajax.token = token.get();
          jqXHR = ajax.put(settings);
          jqXHR.done(function(response) {
            return _this.trigger('sync');
          });
          return jqXHR.fail(function(response) {
            return console.log('fail', response);
          });
        }
      }
    };
  });

}).call(this);
