define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

this["JST"] = this["JST"] || {};

this["JST"]["hilib/views/form/autosuggest/main.jade"] = function anonymous(locals) {
var buf = [];
buf.push("<div class=\"input\"><input data-view-id=\"<%= viewId %>\" value=\"<%= selected.get('title') %>\"/><div class=\"caret\"></div></div><% if (settings.editable) { %><button class=\"edit\">Edit</button><% } %>\n<% if (settings.mutable) { %><button class=\"add\">Add</button><% } %><ul class=\"list\"></ul>");;return buf.join("");
};

return this["JST"];

});