define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

this["JST"] = this["JST"] || {};

this["JST"]["hilib/views/modal/main.jade"] = function anonymous(locals) {
var buf = [];
buf.push("<div class=\"overlay\"></div><div class=\"modalbody\"><header><% if (title !== '') { %><h2><%= title %></h2><% } %>\n<p class=\"message\"></p></header><div class=\"body\"></div><% if (cancelAndSubmit) { %><footer><button class=\"cancel\"><%= cancelValue %></button><button class=\"submit\"><%= submitValue %></button></footer><% } %></div>");;return buf.join("");
};

return this["JST"];

});