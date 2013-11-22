define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

this["JST"] = this["JST"] || {};

this["JST"]["hilib/mixins/dropdown/main"] = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),collection = locals_.collection,selected = locals_.selected,active = locals_.active;// iterate collection.models
;(function(){
  var $$obj = collection.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var model = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'data-id':(model.id), "class": [('list'),(selected===model?active:'')] }, {"class":true,"data-id":true})) + ">" + (jade.escape(null == (jade.interp = model.get('title')) ? "" : jade.interp)) + "</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var model = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'data-id':(model.id), "class": [('list'),(selected===model?active:'')] }, {"class":true,"data-id":true})) + ">" + (jade.escape(null == (jade.interp = model.get('title')) ? "" : jade.interp)) + "</li>");
    }

  }
}).call(this);
;return buf.join("");
};

this["JST"]["hilib/views/form/autosuggest/main"] = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),viewId = locals_.viewId,selected = locals_.selected,settings = locals_.settings;buf.push("<div class=\"input\"><input" + (jade.attrs({ 'data-view-id':(viewId), 'value':(selected.get('title')) }, {"data-view-id":true,"value":true})) + "/><div class=\"caret\"></div></div>");
if ( settings.editable)
{
buf.push("<button class=\"edit\">Edit</button>");
}
if ( settings.mutable)
{
buf.push("<button class=\"add\">Add</button>");
}
buf.push("<ul class=\"list\"></ul>");;return buf.join("");
};

this["JST"]["hilib/views/form/combolist/main"] = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),viewId = locals_.viewId,settings = locals_.settings,selected = locals_.selected;buf.push("<div class=\"input\"><input" + (jade.attrs({ 'type':("text"), 'data-view-id':(viewId), 'placeholder':(settings.placeholder) }, {"type":true,"data-view-id":true,"placeholder":true})) + "/><div class=\"caret\"></div></div>");
if ( settings.editable)
{
buf.push("<button class=\"edit\">Edit</button>");
}
buf.push("<ul class=\"list\"></ul><ul class=\"selected\">");
// iterate selected.models
;(function(){
  var $$obj = selected.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var model = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'data-id':(model.id), "class": [('selected')] }, {"data-id":true})) + "><span>" + (jade.escape(null == (jade.interp = model.get('title')) ? "" : jade.interp)) + "</span></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var model = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'data-id':(model.id), "class": [('selected')] }, {"data-id":true})) + "><span>" + (jade.escape(null == (jade.interp = model.get('title')) ? "" : jade.interp)) + "</span></li>");
    }

  }
}).call(this);

buf.push("</ul>");;return buf.join("");
};

this["JST"]["hilib/views/form/editablelist/main"] = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),viewId = locals_.viewId,settings = locals_.settings,selected = locals_.selected;buf.push("<input" + (jade.attrs({ 'data-view-id':(viewId), 'placeholder':(settings.placeholder) }, {"data-view-id":true,"placeholder":true})) + "/><button>Add to list</button><ul class=\"selected\">");
// iterate selected.models
;(function(){
  var $$obj = selected.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var model = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'data-id':(model.id) }, {"data-id":true})) + "><span>" + (jade.escape(null == (jade.interp = model.id) ? "" : jade.interp)) + "</span></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var model = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'data-id':(model.id) }, {"data-id":true})) + "><span>" + (jade.escape(null == (jade.interp = model.id) ? "" : jade.interp)) + "</span></li>");
    }

  }
}).call(this);

buf.push("</ul>");;return buf.join("");
};

this["JST"]["hilib/views/modal/main"] = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),title = locals_.title,titleClass = locals_.titleClass,cancelAndSubmit = locals_.cancelAndSubmit,cancelValue = locals_.cancelValue,submitValue = locals_.submitValue;buf.push("<div class=\"overlay\"></div><div class=\"modalbody\"><header>");
if ( (title !== ''))
{
buf.push("<h2" + (jade.attrs({ "class": [(titleClass)] }, {"class":true})) + ">" + (null == (jade.interp = title) ? "" : jade.interp) + "</h2>");
}
buf.push("<p class=\"message\"></p></header><div class=\"body\"></div>");
if ( (cancelAndSubmit))
{
buf.push("<footer><button class=\"cancel\">" + (jade.escape(null == (jade.interp = cancelValue) ? "" : jade.interp)) + "</button><button class=\"submit\">" + (jade.escape(null == (jade.interp = submitValue) ? "" : jade.interp)) + "</button></footer>");
}
buf.push("</div>");;return buf.join("");
};

this["JST"]["hilib/views/supertinyeditor/diacritics"] = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),diacritics = locals_.diacritics;buf.push("<ul class=\"diacritics\">");
// iterate diacritics
;(function(){
  var $$obj = diacritics;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var diacritic = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade.interp = diacritic) ? "" : jade.interp)) + "</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var diacritic = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade.interp = diacritic) ? "" : jade.interp)) + "</li>");
    }

  }
}).call(this);

buf.push("</ul>");;return buf.join("");
};

return this["JST"];

});