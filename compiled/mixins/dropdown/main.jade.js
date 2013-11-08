define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

this["JST"] = this["JST"] || {};

this["JST"]["hilib/mixins/dropdown/main.jade"] = function anonymous(locals) {
var buf = [];
buf.push("<% collection.each(function(model) { %><li data-id=\"<%= model.id %>\" class=\"list <% if (selected===model) { %>active<% } %>\"><%= model.get('title') %></li><% }); %>");;return buf.join("");
};

return this["JST"];

});