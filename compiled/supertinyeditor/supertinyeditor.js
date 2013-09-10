(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var StringFn, SuperTinyEditor, Tpl, Views, _ref;
    StringFn = require('helpers2/string');
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
        SuperTinyEditor.__super__.initialize.apply(this, arguments);
        return this.render();
      };

      SuperTinyEditor.prototype.render = function() {
        var rtpl;
        rtpl = _.template(Tpl);
        this.$el.html(rtpl());
        this.$currentHeader = this.$('.ste-header');
        this.renderControls();
        this.renderIframe();
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
        var html, iframe, _base, _base1;
        if ((_base = this.options).cssFile == null) {
          _base.cssFile = '';
        }
        if ((_base1 = this.options).html == null) {
          _base1.html = '';
        }
        iframe = this.el.querySelector('iframe');
        html = "<!DOCTYPE html>					<html>					<head><meta charset='UTF-8'><link rel='stylesheet' href='" + this.options.cssFile + "'></head>					<body class='supertinyeditor-body' spellcheck='false' contenteditable='true'>" + this.options.html + "</body>					</html>";
        this.doc = iframe.contentDocument;
        this.doc.designMode = 'On';
        this.doc.open();
        this.doc.write(html);
        return this.doc.close();
      };

      SuperTinyEditor.prototype.events = function() {
        return {
          'click .ste-control': 'controlClicked'
        };
      };

      SuperTinyEditor.prototype.controlClicked = function(ev) {
        var action;
        action = ev.currentTarget.getAttribute('data-action');
        this.doc.execCommand(action, false, null);
        return this.trigger('change', action, this.$('body').html());
      };

      return SuperTinyEditor;

    })(Views.Base);
  });

}).call(this);
