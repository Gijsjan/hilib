(function() {
  define(function(require) {
    var Backbone, Pubsub, Token, _;
    Backbone = require('backbone');
    _ = require('underscore');
    Pubsub = require('hilib/managers/pubsub');
    Token = (function() {
      Token.prototype.token = null;

      function Token() {
        _.extend(this, Backbone.Events);
        _.extend(this, Pubsub);
      }

      Token.prototype.set = function(token, type) {
        this.token = token;
        if (type == null) {
          type = 'SimpleAuth';
        }
        sessionStorage.setItem('huygens_token_type', type);
        return sessionStorage.setItem('huygens_token', this.token);
      };

      Token.prototype.getType = function() {
        return sessionStorage.getItem('huygens_token_type');
      };

      Token.prototype.get = function() {
        if (this.token == null) {
          this.token = sessionStorage.getItem('huygens_token');
        }
        if (this.token == null) {
          return false;
        }
        return this.token;
      };

      Token.prototype.clear = function() {
        sessionStorage.removeItem('huygens_token');
        return sessionStorage.removeItem('huygens_token_type');
      };

      return Token;

    })();
    return new Token();
  });

}).call(this);
