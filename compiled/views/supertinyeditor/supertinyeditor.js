(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Fn, Longpress, StringFn, SuperTinyEditor, Tpl, Views, _ref;
    Fn = require('hilib/functions/general');
    StringFn = require('hilib/functions/string');
    require('hilib/functions/jquery.mixin');
    Longpress = require('hilib/views/longpress/main');
    Views = {
      Base: require('views/base')
    };
    Tpl = require('text!hilib/views/supertinyeditor/supertinyeditor.html');
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
        this.setFocus();
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
          } else if (controlName.substr(0, 2) === 'b_') {
            controlName = controlName.substr(2);
            div.className = 'ste-button';
            div.setAttribute('data-action', controlName);
            div.setAttribute('title', StringFn.ucfirst(controlName));
            div.innerHTML = StringFn.ucfirst(controlName);
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
        var html, iframe, lp,
          _this = this;
        iframe = this.el.querySelector('iframe');
        iframe.style.width = this.options.width + 'px';
        iframe.style.height = this.options.height + 'px';
        html = "<!DOCTYPE html>					<html>					<head><meta charset='UTF-8'><link rel='stylesheet' href='" + this.options.cssFile + "'></head>					<body class='ste-iframe-body' spellcheck='false' contenteditable='true'>" + (this.model.get(this.options.htmlAttribute)) + "</body>					</html>";
        this.iframeDocument = iframe.contentDocument;
        this.iframeDocument.designMode = 'On';
        this.iframeDocument.open();
        this.iframeDocument.write(html);
        this.iframeDocument.close();
        this.iframeBody = this.iframeDocument.querySelector('body');
        if (this.options.wrap) {
          this.iframeBody.style.whiteSpace = 'normal';
        }
        lp = new Longpress({
          parent: this.el.querySelector('.ste-body')
        });
        this.iframeDocument.addEventListener('scroll', function() {
          var target;
          if (!_this.autoScroll) {
            target = {
              scrollLeft: $(iframe).contents().scrollLeft(),
              scrollWidth: iframe.contentWindow.document.documentElement.scrollWidth,
              clientWidth: iframe.contentWindow.document.documentElement.clientWidth,
              scrollTop: $(iframe).contents().scrollTop(),
              scrollHeight: iframe.contentWindow.document.documentElement.scrollHeight,
              clientHeight: iframe.contentWindow.document.documentElement.clientHeight
            };
            return Fn.timeoutWithReset(200, function() {
              return _this.trigger('scrolled', Fn.getScrollPercentage(target));
            });
          }
        });
        return this.iframeDocument.addEventListener('keyup', function(ev) {
          return Fn.timeoutWithReset(500, function() {
            return _this.saveHTMLToModel();
          });
        });
      };

      SuperTinyEditor.prototype.events = function() {
        return {
          'click .ste-control': 'controlClicked',
          'click .ste-button': 'buttonClicked'
        };
      };

      SuperTinyEditor.prototype.controlClicked = function(ev) {
        var action;
        action = ev.currentTarget.getAttribute('data-action');
        this.iframeDocument.execCommand(action, false, null);
        return this.saveHTMLToModel();
      };

      SuperTinyEditor.prototype.buttonClicked = function(ev) {
        var action;
        action = ev.currentTarget.getAttribute('data-action');
        return this.trigger(action);
      };

      SuperTinyEditor.prototype.saveHTMLToModel = function() {
        return this.model.set(this.options.htmlAttribute, this.iframeBody.innerHTML);
      };

      SuperTinyEditor.prototype.setModel = function(model) {
        this.setInnerHTML(model.get(this.options.htmlAttribute));
        this.model = model;
        return this.setFocus();
      };

      SuperTinyEditor.prototype.setInnerHTML = function(html) {
        return this.iframeBody.innerHTML = html;
      };

      SuperTinyEditor.prototype.setIframeHeight = function(height) {
        var iframe;
        iframe = this.el.querySelector('iframe');
        return iframe.style.height = height + 'px';
      };

      SuperTinyEditor.prototype.setFocus = function() {
        return Fn.setCursorToEnd(this.iframeBody, this.el.querySelector('iframe').contentWindow);
      };

      SuperTinyEditor.prototype.setScrollPercentage = function(percentages) {
        var clientHeight, clientWidth, contentWindow, documentElement, left, scrollHeight, scrollWidth, top,
          _this = this;
        contentWindow = this.el.querySelector('iframe').contentWindow;
        documentElement = contentWindow.document.documentElement;
        clientWidth = documentElement.clientWidth;
        scrollWidth = documentElement.scrollWidth;
        clientHeight = documentElement.clientHeight;
        scrollHeight = documentElement.scrollHeight;
        top = (scrollHeight - clientHeight) * percentages.top / 100;
        left = (scrollWidth - clientWidth) * percentages.left / 100;
        this.autoScroll = true;
        contentWindow.scrollTo(left, top);
        return setTimeout((function() {
          return _this.autoScroll = false;
        }), 200);
      };

      SuperTinyEditor.prototype.show = function() {
        return this.el.style.display = 'block';
      };

      SuperTinyEditor.prototype.hide = function() {
        return this.el.style.display = 'none';
      };

      SuperTinyEditor.prototype.visible = function() {
        return this.el.style.display === 'block';
      };

      return SuperTinyEditor;

    })(Views.Base);
  });

}).call(this);