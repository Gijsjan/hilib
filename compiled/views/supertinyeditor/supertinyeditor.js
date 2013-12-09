(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Fn, Longpress, StringFn, SuperTinyEditor, Views, tpls, _ref;
    Fn = require('hilib/functions/general');
    StringFn = require('hilib/functions/string');
    require('hilib/functions/jquery.mixin');
    Longpress = require('hilib/views/longpress/main');
    Views = {
      Base: require('views/base')
    };
    tpls = require('hilib/templates');
    return SuperTinyEditor = (function(_super) {
      __extends(SuperTinyEditor, _super);

      function SuperTinyEditor() {
        _ref = SuperTinyEditor.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      SuperTinyEditor.prototype.className = 'supertinyeditor';

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
        this.el.innerHTML = tpls['hilib/views/supertinyeditor/main']();
        this.$currentHeader = this.$('.ste-header');
        this.renderControls();
        this.renderIframe();
        return this;
      };

      SuperTinyEditor.prototype.renderControls = function() {
        var controlName, diacritics, diacriticsUL, div, _i, _len, _ref1, _results;
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
          } else if (controlName === 'diacritics') {
            div.className = 'ste-control-diacritics ' + controlName;
            div.setAttribute('title', StringFn.ucfirst(controlName));
            div.setAttribute('data-action', controlName);
            diacriticsUL = document.createElement('div');
            diacriticsUL.className = 'diacritics-placeholder';
            diacritics = 'ĀĂÀÁÂÃÄÅĄⱭ∀ÆāăàáâãäåąɑæαªƁßβɓÇĆĈĊČƆçςćĉċč¢ɔÐĎĐḎƊðďđɖḏɖɗÈÉÊËĒĖĘẸĚƏÆƎƐ€èéêëēėęẹěəæεɛ€ƑƩƒʃƭĜĞĠĢƢĝğġģɠƣĤĦĥħɦẖÌÍÎÏĪĮỊİIƗĲìíîïīįịiiɨĳιĴĲĵɟĳĶƘķƙĹĻĽŁΛĺļľłλÑŃŅŇŊƝ₦ñńņňŋɲÒÓÔÕÖŌØŐŒƠƟòóôõöōøőœơɵ°Ƥ¶ƥ¶ŔŘɌⱤŕřɍɽßſŚŜŞṢŠÞ§ßſśŝşṣšþ§ŢŤṮƬƮţťṯƭʈÙÚÛÜŪŬŮŰŲɄƯƱùúûüūŭůűųưμυʉʊƲʋŴẄΩŵẅωÝŶŸƔƳýŷÿɣyƴŹŻŽƵƷẔźżžƶẕʒƹ£¥€₩₨₳Ƀ¤¡‼‽¿‽‰…••±‐–—±†‡′″‴‘’‚‛“”„‟≤‹≥›≈≠≡';
            diacriticsUL.innerHTML = tpls['hilib/views/supertinyeditor/diacritics']({
              diacritics: diacritics
            });
            div.appendChild(diacriticsUL);
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
        var iframe, steBody,
          _this = this;
        iframe = document.createElement('iframe');
        iframe.style.width = this.options.width + 'px';
        iframe.style.height = this.options.height + 'px';
        iframe.src = "about:blank";
        iframe.onload = function() {
          _this.iframeDocument = iframe.contentDocument;
          _this.iframeDocument.designMode = 'On';
          _this.iframeDocument.open();
          _this.iframeDocument.write("<!DOCTYPE html>										<html>										<head><meta charset='UTF-8'><link rel='stylesheet' href='" + _this.options.cssFile + "'></head>										<body class='ste-iframe-body' spellcheck='false' contenteditable='true'>" + (_this.model.get(_this.options.htmlAttribute)) + "</body>										</html>");
          _this.iframeDocument.close();
          _this.iframeBody = _this.iframeDocument.querySelector('body');
          if (_this.options.wrap) {
            _this.iframeBody.style.whiteSpace = 'normal';
          }
          _this.setFocus();
          _this.longpress = new Longpress({
            parent: _this.el.querySelector('.ste-body')
          });
          _this.iframeDocument.addEventListener('scroll', function() {
            if (!_this.autoScroll) {
              return _this.triggerScroll();
            }
          });
          return _this.iframeDocument.addEventListener('keyup', function(ev) {
            return Fn.timeoutWithReset(500, function() {
              _this.triggerScroll();
              return _this.saveHTMLToModel();
            });
          });
        };
        steBody = this.el.querySelector('.ste-body');
        return steBody.appendChild(iframe);
      };

      SuperTinyEditor.prototype.events = function() {
        return {
          'click .ste-control': 'controlClicked',
          'click .ste-control-diacritics ul.diacritics li': 'diacriticClicked',
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

      SuperTinyEditor.prototype.diacriticClicked = function(ev) {
        var range, sel, textNode;
        sel = this.el.querySelector('iframe').contentWindow.getSelection();
        range = sel.getRangeAt(0);
        range.deleteContents();
        textNode = ev.currentTarget.childNodes[0].cloneNode();
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        sel.removeAllRanges();
        sel.addRange(range);
        return this.saveHTMLToModel();
      };

      SuperTinyEditor.prototype.destroy = function() {
        this.longpress.destroy();
        return this.remove();
      };

      SuperTinyEditor.prototype.saveHTMLToModel = function() {
        return this.model.set(this.options.htmlAttribute, this.iframeBody.innerHTML);
      };

      SuperTinyEditor.prototype.triggerScroll = function() {
        var iframe, target;
        iframe = this.el.querySelector('iframe');
        target = {
          scrollLeft: $(iframe).contents().scrollLeft(),
          scrollWidth: iframe.contentWindow.document.documentElement.scrollWidth,
          clientWidth: iframe.contentWindow.document.documentElement.clientWidth,
          scrollTop: $(iframe).contents().scrollTop(),
          scrollHeight: iframe.contentWindow.document.documentElement.scrollHeight,
          clientHeight: iframe.contentWindow.document.documentElement.clientHeight
        };
        return this.trigger('scrolled', Fn.getScrollPercentage(target));
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

      SuperTinyEditor.prototype.setIframeWidth = function(width) {
        var iframe;
        iframe = this.el.querySelector('iframe');
        return iframe.style.width = width + 'px';
      };

      SuperTinyEditor.prototype.setFocus = function() {
        var win;
        if ((this.iframeBody != null) && (win = this.el.querySelector('iframe').contentWindow)) {
          return Fn.setCursorToEnd(this.iframeBody, win);
        }
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

      return SuperTinyEditor;

    })(Views.Base);
  });

}).call(this);
