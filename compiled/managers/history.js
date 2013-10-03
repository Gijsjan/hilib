(function() {
  define(function(require) {
    var History;
    History = (function() {
      function History() {}

      History.prototype.history = [];

      History.prototype.update = function() {
        if (window.location.pathname !== '/login') {
          this.history.push(window.location.pathname);
        }
        return sessionStorage.setItem('history', JSON.stringify(this.history));
      };

      History.prototype.clear = function() {
        return sessionStorage.removeItem('history');
      };

      History.prototype.last = function() {
        return this.history[this.history.length - 1];
      };

      return History;

    })();
    return new History();
  });

}).call(this);
