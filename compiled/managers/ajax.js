(function() {
  define(function(require) {
    var $, defaultOptions;
    $ = require('jquery');
    $.support.cors = true;
    defaultOptions = {
      token: true,
      tokenType: 'SimpleAuth'
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
        if ((this.token != null) && options.token) {
          ajaxArgs.beforeSend = function(xhr) {
            return xhr.setRequestHeader('Authorization', "" + options.tokenType + " " + _this.token);
          };
        }
        return $.ajax($.extend(ajaxArgs, args));
      }
    };
  });

}).call(this);
