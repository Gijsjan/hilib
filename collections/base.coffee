(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Backbone, Base, Pubsub,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone = require('backbone');

Pubsub = require('../mixins/pubsub');

Base = (function(_super) {
  __extends(Base, _super);

  function Base() {
    return Base.__super__.constructor.apply(this, arguments);
  }

  Base.prototype.initialize = function() {
    return _.extend(this, Pubsub);
  };

  Base.prototype.removeById = function(id) {
    var model;
    model = this.get(id);
    return this.remove(model);
  };

  Base.prototype.has = function(model) {
    if (this.get(model.cid) != null) {
      return true;
    } else {
      return false;
    }
  };

  return Base;

})(Backbone.Collection);

module.exports = Base;


},{"../mixins/pubsub":2,"backbone":"RqfiKp"}],2:[function(require,module,exports){
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


},{"backbone":"RqfiKp"}]},{},[1])