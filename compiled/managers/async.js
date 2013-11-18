(function() {
  define(function(require) {
    var Async, _;
    _ = require('underscore');
    return Async = (function() {
      function Async(names) {
        var name, _i, _len;
        if (names == null) {
          names = [];
        }
        _.extend(this, Backbone.Events);
        this.callbacksCalled = {};
        for (_i = 0, _len = names.length; _i < _len; _i++) {
          name = names[_i];
          this.callbacksCalled[name] = false;
        }
      }

      Async.prototype.called = function(name, data) {
        if (data == null) {
          data = true;
        }
        this.callbacksCalled[name] = data;
        if (_.every(this.callbacksCalled, function(called) {
          return called !== false;
        })) {
          return this.trigger('ready', this.callbacksCalled);
        }
      };

      return Async;

    })();
  });

}).call(this);
