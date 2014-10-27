var fs = require('fs');

filedata = fs.readFileSync('./hangout.js');
eval(filedata);

module.exports = gapi;
