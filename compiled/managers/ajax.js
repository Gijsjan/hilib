(function() {
  define(function(require) {
    var $, defaultOptions, token;
    $ = require('jquery');
    $.support.cors = true;
    token = require('hilib/managers/token');
    defaultOptions = {
      token: true
    };
    return {
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
      poll: function(args) {
        var done, dopoll, testFn, url,
          _this = this;
        url = args.url, testFn = args.testFn, done = args.done;
        dopoll = function() {
          var xhr;
          xhr = _this.get({
            url: url
          });
          return xhr.done(function(data, textStatus, jqXHR) {
            if (testFn(data)) {
              return done(data, textStatus, jqXHR);
            } else {
              return setTimeout(dopoll, 5000);
            }
          });
        };
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
        if (options.token && (token.get() != null)) {
          ajaxArgs.beforeSend = function(xhr) {
            return xhr.setRequestHeader('Authorization', "" + (token.getType()) + " " + (token.get()));
          };
        }
        return $.ajax($.extend(ajaxArgs, args));
      }
    };
  });

}).call(this);
