'use strict';

var Handlebars = require('handlebars');
var path = require('path');
var fs = require('fs');
var settings = require('../config/settings');

// helper function for rendering a view with Handlebars on the Server-side
module.exports = function(res, data, template) {
    var templateStr = fs.readFileSync( path.join(settings.root, 'dev/templates/') + template, 'utf8' );
    var compiledSrc = Handlebars.compile(templateStr);

    return compiledSrc(data);
};