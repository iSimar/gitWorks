var output = require('./output');
var tof = require('./trueORFalse');
var gitLayer = require('./gitLayer');
var gitWorksLayer = require('./gitWorksLayer');

exports.main = function(args){
    tof.isGitWorksInitialized(function(boolVal_3){
        if(boolVal_3){
            output.warning('gitworks is already initalized.');
        }
        else{
            gitWorksLayer.createGitWorksFile(function(){
                gitLayer.getUserConfigInfo(function(userinfo){
                    gitWorksLayer.addMember(userinfo, function(){
                        output.success('gitworks has been initalized.');
                    });
                });
            });
        }    
    });
};
