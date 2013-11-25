(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, Modal, dom, modalManager, tpls, _ref;
    Backbone = require('backbone');
    tpls = require('hilib/templates');
    dom = require('hilib/functions/DOM');
    modalManager = require('hilib/managers/modal');
    return Modal = (function(_super) {
      __extends(Modal, _super);

      function Modal() {
        _ref = Modal.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Modal.prototype.className = "modal";

      Modal.prototype.defaultOptions = function() {
        return {
          title: '',
          titleClass: '',
          cancelAndSubmit: true,
          cancelValue: 'Cancel',
          submitValue: 'Submit',
          loader: true
        };
      };

      Modal.prototype.initialize = function(options) {
        this.options = options;
        Modal.__super__.initialize.apply(this, arguments);
        return this.render();
      };

      Modal.prototype.render = function() {
        var body, data, marginLeft, marginTop, rtpl, scrollTop, top, viewportHeight;
        data = _.extend(this.defaultOptions(), this.options);
        rtpl = tpls['hilib/views/modal/main'](data);
        this.$el.html(rtpl);
        body = dom(this.el).q('.body');
        if (this.options.html) {
          body.html(this.options.html);
        } else {
          body.hide();
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
          if (this.options.width === 'auto') {
            marginLeft = this.$('.modalbody').width() / -2;
          }
          this.$('.modalbody').css('margin-left', marginLeft);
        }
        if (this.options.height != null) {
          this.$('.modalbody').css('height', this.options.height);
        }
        scrollTop = document.querySelector('body').scrollTop;
        viewportHeight = document.documentElement.clientHeight;
        top = (viewportHeight - this.$('.modalbody').height()) / 2;
        marginTop = Math.max(this.$('.modalbody').height() / -2, (viewportHeight - 400) * -0.5);
        this.$('.modalbody').css('margin-top', marginTop);
        return this.$('.modalbody .body').css('max-height', viewportHeight - 400);
      };

      Modal.prototype.events = {
        "click button.submit": 'submit',
        "click button.cancel": function() {
          return this.cancel();
        },
        "click .overlay": function() {
          return this.cancel();
        },
        "keydown input": function(ev) {
          if (ev.keyCode === 13) {
            ev.preventDefault();
            return this.submit(ev);
          }
        }
      };

      Modal.prototype.submit = function(ev) {
        var el;
        el = dom(ev.currentTarget);
        if (!el.hasClass('loader')) {
          this.el.querySelector('button.cancel').style.display = 'none';
          el.addClass('loader');
          return this.trigger('submit');
        }
      };

      Modal.prototype.cancel = function() {
        this.trigger('cancel');
        return this.close();
      };

      Modal.prototype.close = function() {
        this.trigger('close');
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
          return _this.close();
        }), delay + speed - 100);
      };

      Modal.prototype.message = function(type, message) {
        if (["success", "warning", "error"].indexOf(type) === -1) {
          return console.error("Unknown message type!");
        }
        this.$("p.message").show();
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
