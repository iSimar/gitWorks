//This file contains functions that log something on the console.

var colors = require('colors');

exports.usage = function() {
	console.log();
	console.log('                 '+ 'gitWorks Usage'.underline);
	console.log();
	console.log('Update:                    '.yellow+'gitWorks update');
	console.log('Init:                      '.blue+'gitWorks init');
	console.log('Make New Work Item:        '.yellow+'gitWorks new <description> priority [high|low]');
	console.log('Items Assigned To/By You:  '.blue+'gitWorks mine');
	console.log('Items Assigned To Someone: '.yellow+'gitWorks to <name>');
	console.log('Items Assigned By Someone: '.blue+'gitWorks by <name>');
	console.log('See All Work Iterms:       '.yellow+'gitWorks all');
	console.log('Change Status of Work Item:'.blue+'node gitWorks <item id> [working|done]');
}

exports.error = function(message){
	console.log('ERROR '.red + message.gray);
}

exports.success = function(message){
	console.log('SUCCESS '.green + message.gray);
}

exports.warning = function(message){
	console.log('WARNING '.yellow + message.gray);
}

exports.note = function(message){
	console.log('NOTE '.cyan + message.gray);
}

exports.log = function(message){
	console.log('LOG '.blue + message.gray);
}
