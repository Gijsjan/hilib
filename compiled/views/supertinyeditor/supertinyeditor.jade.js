define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

this["JST"] = this["JST"] || {};

this["JST"]["hilib/views/supertinyeditor/supertinyeditor.jade"] = function anonymous(locals) {
var buf = [];
buf.push("<div class=\"supertinyeditor\"><div class=\"ste-header\"></div><div class=\"ste-body\"><iframe></iframe></div></div>");;return buf.join("");
};

return this["JST"];

});