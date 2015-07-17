//This file contains helper functions that return a Boolean value.
var fs = require('fs');

var gitLayer = require('./gitLayer');
var gitWorksLayer = require('./gitWorksLayer');
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
		callback(fs.existsSync(val+'/.gitWorks'));
	});
}

exports.isGitUserConfigInfoValid = function(callback){
    gitLayer.getUserConfigInfo(function(userinfo){
        if(userinfo.username=='' || userinfo.email=='')
            callback(false);
        else
            callback(true);
    });
}

exports.isCurrentUserAMember = function(callback){
    gitWorksLayer.getCurrentMemberId(function(current_user_id){
        if(current_user_id)
            callback(true);
        else
            callback(false);
    });
}

exports.isUserAMember = function(userinfo,callback){
    gitWorksLayer.getMemberIdByEmail(userinfo.email, function(user_id){
        if(user_id)
            callback(true);
        else
            callback(false);
    });
}
