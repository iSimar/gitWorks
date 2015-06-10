//This file contains helper functions that return a Boolean value.
var fs = require('fs');

var gitLayer = require('./gitLayer');
var output = require('./output');

exports.isGitInstalled = function (callback){
	gitLayer.getVersion(function(val){
		callback(val.substring(0,11) == 'git version');
	});

}

exports.isGitInitialized = function(callback){
	gitLayer.getProjectRootDirectory(function(val){
		callback(!val=='');
	});
}

exports.isGitWorksInitialized = function(callback){
	gitLayer.getProjectRootDirectory(function(val){
		callback(fs.existsSync(val.slice(0, - 1)+'/.gitWorks'));
	});
}