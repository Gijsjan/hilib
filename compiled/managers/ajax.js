(function() {
  define(function(require) {
    var $, defaultOptions;
    $ = require('jquery');
    $.support.cors = true;
    defaultOptions = {
      token: true
    };
    return {
      token: null,
      get: function(args, options) {
        if (options == null) {
          options = {};
        }
        return this.fire('get', args, options);
      },
      post: function(args, options) {
        if (options == null) {
          options = {};
        }
        return this.fire('post', args, options);
      },
      put: function(args, options) {
        if (options == null) {
          options = {};
        }
        return this.fire('put', args, options);
      },
      poll: function(url, testFn) {
        dopoll(function() {
          var xhr,
            _this = this;
          xhr = ajax.get({
            url: url
          });
          return xhr.done(function(data, textStatus, jqXHR) {
            if (!testFn(data)) {
              return dopoll();
            }
          });
        });
        return dopoll();
      },
      fire: function(type, args, options) {
        var ajaxArgs,
          _this = this;
        options = $.extend({}, defaultOptions, options);
        ajaxArgs = {
          type: type,
          dataType: 'json',
          contentType: 'application/json; charset=utf-8',
          processData: false,
          crossDomain: true
        };
        if ((this.token != null) && options.token) {
          ajaxArgs.beforeSend = function(xhr) {
            return xhr.setRequestHeader('Authorization', "SimpleAuth " + _this.token);
          };
        }
        return $.ajax($.extend(ajaxArgs, args));
      }
    };
  });

}).call(this);
