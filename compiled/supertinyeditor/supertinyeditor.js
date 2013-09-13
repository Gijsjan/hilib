(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Fn, StringFn, SuperTinyEditor, Tpl, Views, _ref;
    Fn = require('helpers/general');
    StringFn = require('helpers/string');
    Views = {
      Base: require('views/base')
    };
    Tpl = require('text!viewshtml/supertinyeditor/supertinyeditor.html');
    return SuperTinyEditor = (function(_super) {
      __extends(SuperTinyEditor, _super);

      function SuperTinyEditor() {
        _ref = SuperTinyEditor.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      SuperTinyEditor.prototype.initialize = function() {
        var _base, _base1, _base2, _base3, _base4;
        SuperTinyEditor.__super__.initialize.apply(this, arguments);
        if ((_base = this.options).cssFile == null) {
          _base.cssFile = '';
        }
        if ((_base1 = this.options).html == null) {
          _base1.html = '';
        }
        if ((_base2 = this.options).width == null) {
          _base2.width = '300';
        }
        if ((_base3 = this.options).height == null) {
          _base3.height = '200';
        }
        if ((_base4 = this.options).wrap == null) {
          _base4.wrap = false;
        }
        return this.render();
      };

      SuperTinyEditor.prototype.render = function() {
        var rtpl;
        rtpl = _.template(Tpl);
        this.$el.html(rtpl());
        this.$currentHeader = this.$('.ste-header');
        this.renderControls();
        this.renderIframe();
        if (this.options.html === '') {
          $(this.iframeDocument).find('body').focus();
        }
        return this;
      };

      SuperTinyEditor.prototype.renderControls = function() {
        var controlName, div, _i, _len, _ref1, _results;
        _ref1 = this.options.controls;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          controlName = _ref1[_i];
          div = document.createElement('div');
          if (controlName === 'n') {
            div.className = 'ste-header';
            this.$('.ste-body').before(div);
            _results.push(this.$currentHeader = $(div));
          } else if (controlName === '|') {
            div.className = 'ste-divider';
            _results.push(this.$currentHeader.append(div));
          } else {
            div.className = 'ste-control ' + controlName;
            div.setAttribute('title', StringFn.ucfirst(controlName));
            div.setAttribute('data-action', controlName);
            _results.push(this.$currentHeader.append(div));
          }
        }
        return _results;
      };

      SuperTinyEditor.prototype.renderIframe = function() {
        var html, iframe,
          _this = this;
        iframe = this.el.querySelector('iframe');
        iframe.style.width = this.options.width + 'px';
        iframe.style.height = this.options.height + 'px';
        html = "<!DOCTYPE html>					<html>					<head><meta charset='UTF-8'><link rel='stylesheet' href='" + this.options.cssFile + "'></head>					<body class='ste-iframe-body' spellcheck='false' contenteditable='true'>" + (this.options.model.get(this.options.htmlAttribute)) + "</body>					</html>";
        this.iframeDocument = iframe.contentDocument;
        this.iframeDocument.designMode = 'On';
        this.iframeDocument.open();
        this.iframeDocument.write(html);
        this.iframeDocument.close();
        this.iframeBody = this.iframeDocument.querySelector('body');
        if (this.options.wrap) {
          this.iframeBody.style.whiteSpace = 'normal';
        }
        this.setFocus();
        this.iframeDocument.addEventListener('scroll', function() {
          var target;
          if (!_this.autoScroll) {
            target = {
              scrollLeft: $(iframe).contents().scrollLeft(),
              scrollWidth: iframe.contentWindow.document.documentElement.scrollWidth,
              clientWidth: iframe.contentWindow.document.documentElement.clientWidth
            };
            return Fn.timeoutWithReset(200, function() {
              return _this.trigger('scrolled', Fn.getScrollPercentage(target, 'horizontal'));
            });
          }
        });
        return this.iframeDocument.addEventListener('keyup', function(ev) {
          return Fn.timeoutWithReset(500, function() {
            return _this.model.set(_this.options.htmlAttribute, _this.getHTML());
          });
        });
      };

      SuperTinyEditor.prototype.events = function() {
        return {
          'click .ste-control': 'controlClicked'
        };
      };

      SuperTinyEditor.prototype.controlClicked = function(ev) {
        var action;
        action = ev.currentTarget.getAttribute('data-action');
        this.iframeDocument.execCommand(action, false, null);
        return this.trigger('change', action, this.iframeBody.innerHTML);
      };

      SuperTinyEditor.prototype.setModel = function(model) {
        this.iframeBody.innerHTML = model.get(this.options.htmlAttribute);
        this.model = model;
        return this.setFocus();
      };

      SuperTinyEditor.prototype.getHTML = function() {
        return this.iframeBody.innerHTML;
      };

      SuperTinyEditor.prototype.setIframeHeight = function(height) {
        return iframe.style.height = height;
      };

      SuperTinyEditor.prototype.setIframeWidth = function(width) {
        return iframe.style.width = width;
      };

      SuperTinyEditor.prototype.setFocus = function() {
        return this.iframeBody.focus();
      };

      SuperTinyEditor.prototype.setScrollPercentage = function(percentage, orientation) {
        var clientHeight, clientWidth, contentWindow, documentElement, left, pos, scrollHeight, scrollWidth, top,
          _this = this;
        if (orientation == null) {
          orientation = 'vertical';
        }
        contentWindow = this.el.querySelector('iframe').contentWindow;
        documentElement = contentWindow.document.documentElement;
        clientWidth = documentElement.clientWidth;
        scrollWidth = documentElement.scrollWidth;
        clientHeight = documentElement.clientHeight;
        scrollHeight = documentElement.scrollHeight;
        top = 0;
        left = 0;
        if (orientation === 'vertical') {
          pos = (scrollHeight - clientHeight) * percentage / 100;
          top = pos;
        } else {
          pos = (scrollWidth - clientWidth) * percentage / 100;
          left = pos;
        }
        this.autoScroll = true;
        contentWindow.scrollTo(left, top);
        return setTimeout((function() {
          return _this.autoScroll = false;
        }), 200);
      };

      return SuperTinyEditor;

    })(Views.Base);
  });

}).call(this);
