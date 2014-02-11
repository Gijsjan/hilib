(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $;

$ = require('jquery');

module.exports = {
  ucfirst: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /*
  	Slugify a string
   */
  slugify: function(str) {
    var from, index, strlen, to;
    from = "àáäâèéëêìíïîòóöôùúüûñç·/_:;";
    to = "aaaaeeeeiiiioooouuuunc-----";
    str = str.trim().toLowerCase();
    strlen = str.length;
    while (strlen--) {
      index = from.indexOf(str[strlen]);
      if (index !== -1) {
        str = str.substr(0, strlen) + to[index] + str.substr(strlen + 1);
      }
    }
    return str.replace(/[^a-z0-9 -]/g, '').replace(/\s+|\-+/g, '-').replace(/^\-+|\-+$/g, '');
  },

  /*
  	Strips the tags from a string
  	
  	Example: "This is a <b>string</b>." => "This is a string."
  	
  	return String
   */
  stripTags: function(str) {
    return $('<span />').html(str).text();
  },

  /*
  	Removes non numbers from a string
  	
  	Example: "Count the 12 monkeys." => "12"
  	
  	return String
   */
  onlyNumbers: function(str) {
    return str.replace(/[^\d.]/g, '');
  },
  hashCode: function(str) {
    var c, chr, hash, i, _i, _len;
    if (str.length === 0) {
      return false;
    }
    hash = 0;
    for (i = _i = 0, _len = str.length; _i < _len; i = ++_i) {
      chr = str[i];
      c = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + c;
      hash = hash & hash;
    }
    return hash;
  },
  insertAt: function(str, needle, index) {
    return str.slice(0, index) + needle + str.slice(index);
  }
};


},{"jquery":"FMcRG8"}]},{},[1])