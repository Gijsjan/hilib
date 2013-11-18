define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

this["JST"] = this["JST"] || {};

this["JST"]["src/views/supertinyeditor/diacritics"] = function anonymous(locals) {
var buf = [];
buf.push("<ul class=\"diacritics\"><% for (i in diacritics) { %><li><%= diacritics[i] %></li><% } %></ul>");;return buf.join("");
};

return this["JST"];

});