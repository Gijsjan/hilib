(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
define(function(require) {
  var $;
  $ = require('jquery');
  return (function(jQuery) {
    jQuery.expr[":"].contains = $.expr.createPseudo(function(arg) {
      return function(elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
      };
    });
    jQuery.fn.scrollTo = function(newPos, args) {
      var defaults, extraOffset, options, scrollTop, top;
      defaults = {
        start: function() {},
        complete: function() {},
        duration: 500
      };
      options = $.extend(defaults, args);
      if (options.start) {
        options.start();
      }
      scrollTop = this.scrollTop();
      top = this.offset().top;
      extraOffset = 60;
      newPos = newPos + scrollTop - top - extraOffset;
      if (newPos !== scrollTop) {
        return this.animate({
          scrollTop: newPos
        }, options.duration, options.complete);
      } else {
        return options.complete();
      }
    };
    jQuery.fn.highlight = function(delay) {
      delay = delay || 3000;
      this.addClass('highlight');
      return setTimeout(((function(_this) {
        return function() {
          return _this.removeClass('highlight');
        };
      })(this)), delay);
    };

    /*
    		Render remove button in element
     */
    return jQuery.fn.appendCloseButton = function(args) {
      var $closeButton, close, corner, html;
      if (args == null) {
        args = {};
      }
      corner = args.corner, html = args.html, close = args.close;
      if (html == null) {
        html = '<img src="/images/hilib/icon.close.png">';
      }
      if (corner == null) {
        corner = 'topright';
      }
      $closeButton = $('<div class="closebutton">').html(html);
      $closeButton.css('position', 'absolute');
      $closeButton.css('opacity', '0.2');
      $closeButton.css('cursor', 'pointer');
      switch (corner) {
        case 'topright':
          $closeButton.css('right', '8px');
          $closeButton.css('top', '8px');
          break;
        case 'bottomright':
          $closeButton.css('right', '8px');
          $closeButton.css('bottom', '8px');
      }
      this.prepend($closeButton);
      $closeButton.hover((function(ev) {
        return $closeButton.css('opacity', 100);
      }), (function(ev) {
        return $closeButton.css('opacity', 0.2);
      }));
      return $closeButton.click((function(_this) {
        return function() {
          return close();
        };
      })(this));
    };
  })(jQuery);
});


},{"jquery":"FMcRG8"}]},{},[1])