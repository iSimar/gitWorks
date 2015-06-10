var output = require('./output');
var tof = require('./trueORFalse');
var gitLayer = require('./gitLayer');
var gitWorksLayer = require('./gitWorksLayer');

exports.main = function(args){
	 tof.isGitInitialized(function(boolVal){
	 	if(boolVal){
	 		tof.isGitWorksInitialized(function(boolVal){
	 			if(boolVal){
	 				output.warning('gitworks already initalized.');
	 			}
	 			else{
	 				gitWorksLayer.createGitWorksFile(function(){
	 					output.success('gitworks has been initalized.');
	 				});
	 			}
    		});
	 	}
	 	else{
	 		output.error('git must be initalized before using gitworks.');
	 	}
	 });
}