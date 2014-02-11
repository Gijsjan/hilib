(function() {
  var Backbone;

  Backbone = require('backbone');

  module.exports = {
    subscribe: function(ev, done) {
      return this.listenTo(Backbone, ev, done);
    },
    publish: function() {
      return Backbone.trigger.apply(Backbone, arguments);
    }
  };

}).call(this);
