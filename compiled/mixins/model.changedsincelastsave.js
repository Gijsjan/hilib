(function() {
  define(function(require) {
    return function(attrs) {
      return {
        changedSinceLastSave: null,
        initChangedSinceLastSave: function() {
          var attr, _i, _len, _results,
            _this = this;
          this.on('sync', function() {
            return _this.changedSinceLastSave = null;
          });
          _results = [];
          for (_i = 0, _len = attrs.length; _i < _len; _i++) {
            attr = attrs[_i];
            _results.push(this.on("change:" + attr, function(model, options) {
              if (_this.changedSinceLastSave == null) {
                return _this.changedSinceLastSave = model.previousAttributes()[attr];
              }
            }));
          }
          return _results;
        },
        cancelChanges: function() {
          var attr, _i, _len;
          for (_i = 0, _len = attrs.length; _i < _len; _i++) {
            attr = attrs[_i];
            this.set(attr, this.changedSinceLastSave);
          }
          return this.changedSinceLastSave = null;
        }
      };
    };
  });

}).call(this);
