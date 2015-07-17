//This file contains functions that log something on the console.

var colors = require('colors');

exports.usage = function() {
    console.log();
    exports.error('Invalid Command');
	console.log();
    console.log('Initalize gitWorks:        '.green+'gitWorks init');
    console.log('Create a Task:             '.green+'gitWorks task -n'+' OR '.yellow+'gitworks task --new');
	console.log('List all Tasks:            '.green+'gitWorks task -l'+' OR '.yellow+'gitworks task --list');
	console.log('Add yourself as a Member:  '.green+'gitWorks addme');
    console.log();
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
