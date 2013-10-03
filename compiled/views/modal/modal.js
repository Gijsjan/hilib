(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, Modal, Tpl, modalManager, _ref;
    Backbone = require('backbone');
    Tpl = require('text!viewshtml/modal/modal.html');
    modalManager = require('hilib/managers/modal');
    return Modal = (function(_super) {
      __extends(Modal, _super);

      function Modal() {
        _ref = Modal.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Modal.prototype.className = "modal";

      Modal.prototype.initialize = function() {
        Modal.__super__.initialize.apply(this, arguments);
        return this.render();
      };

      Modal.prototype.render = function() {
        var data, marginLeft, rtpl, scrollTop, top, viewportHeight;
        data = _.extend({
          title: "My modal",
          cancelAndSubmit: true,
          cancelValue: 'Cancel',
          submitValue: 'Submit'
        }, this.options);
        rtpl = _.template(Tpl, data);
        this.$el.html(rtpl);
        if (this.options.$html) {
          this.$(".body").html(this.options.$html);
        }
        modalManager.add(this);
        if (this.options.width != null) {
          this.$('.modalbody').css('width', this.options.width);
          marginLeft = -1 * parseInt(this.options.width, 10) / 2;
          if (this.options.width.slice(-1) === '%') {
            marginLeft += '%';
          }
          if (this.options.width.slice(-2) === 'vw') {
            marginLeft += 'vw';
          }
          this.$('.modalbody').css('margin-left', marginLeft);
        }
        if (this.options.height != null) {
          this.$('.modalbody').css('height', this.options.height);
        }
        scrollTop = document.querySelector('body').scrollTop;
        viewportHeight = document.documentElement.clientHeight;
        top = (viewportHeight - this.$('.modalbody').height()) / 2;
        if (scrollTop > 0) {
          this.$('.modalbody').css('top', top + scrollTop);
        }
        return this.$('.modalbody').css('margin-top', this.$('.modalbody').height() / -2);
      };

      Modal.prototype.events = {
        "click button.submit": "onSubmit",
        "click button.cancel": "onCancel",
        "click .overlay": "onOverlayClicked"
      };

      Modal.prototype.onSubmit = function(ev) {
        return this.trigger("submit");
      };

      Modal.prototype.onCancel = function(ev) {
        this.trigger("cancel");
        return this.fadeOut(0);
      };

      Modal.prototype.onOverlayClicked = function(ev) {
        return modalManager.remove(this);
      };

      Modal.prototype.fadeOut = function(delay) {
        var speed,
          _this = this;
        if (delay == null) {
          delay = 1000;
        }
        speed = delay === 0 ? 0 : 500;
        this.$(".modalbody").delay(delay).fadeOut(speed);
        return setTimeout((function() {
          return modalManager.remove(_this);
        }), delay + speed - 100);
      };

      Modal.prototype.message = function(type, message) {
        if (["success", "warning", "error"].indexOf(type) === -1) {
          return console.error("Unknown message type!");
        }
        return this.$("p.message").html(message).addClass(type);
      };

      Modal.prototype.messageAndFade = function(type, message, delay) {
        this.$(".modalbody .body").hide();
        this.$("footer").hide();
        this.message(type, message);
        return this.fadeOut(delay);
      };

      return Modal;

    })(Backbone.View);
  });

}).call(this);
