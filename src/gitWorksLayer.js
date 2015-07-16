var fs = require('fs');
var StringDecoder = require('string_decoder').StringDecoder;
var gitLayer = require('./gitLayer');
var tof = require('./trueORFalse');
var output = require('./output');
var utils = require('./utils');

exports.createGitWorksFile = function(callback){
	gitLayer.getProjectRootDirectory(function(path){
		fs.writeFile(path+'/.gitWorks', '{"members":{}, "tasks":{}}', function(err) {
    		if(err) throw err;
            callback();
	    }); 
 	});
};

exports.addMember = function(userinfo, callback){
    exports.readGitWorksFile(function(gitWorksFile){
        gitWorksFile.members[utils.randomStringGenerator(5)] = userinfo;
        exports.writeGitWorksFile(gitWorksFile, function(){
            callback();
        });
    });                    
};

exports.addTask = function(task_data, callback){
    exports.readGitWorksFile(function(gitWorksFile){
        gitWorksFile.tasks[utils.randomStringGenerator(5)] = task_data;
        exports.writeGitWorksFile(gitWorksFile, function(){
            callback();
        });
    });
};

exports.getCurrentMemberId = function(callback){
    gitLayer.getCurrentUsername(function(username){
        exports.getMemberIdByName(username, function(memberId){
            callback(memberId);
        });
    });
};

exports.getMemberNameById = function(user_id, callback){
    exports.readGitWorksFile(function(gitWorksFile){
        callback(gitWorksFile.members[user_id]['username']);
    }); 
};

exports.getMemberIdByName = function(name, callback){
    var results = [];
    exports.readGitWorksFile(function(gitWorksFile){
        for (var user_id in gitWorksFile.members){
            if (gitWorksFile.members.hasOwnProperty(user_id)){
                if((gitWorksFile.members[user_id]['username'].toLowerCase()).indexOf(name.toLowerCase()) != -1){
                results.push(user_id);
                };
            }
        }
        if(results.length==0){
            utils.askUser('[ERROR] Member not found, please type another name',function(answer){
                exports.getMemberIdByName(answer, callback);
            });
        }
        else if(results.length==1){
            callback(results[0]);
        }
        else{
            output.note("Could not find the exact member, did you mean any of the follow:");
            for (var i = 0; i < results.length; i++) {
                console.log(""+(i+1).toString()+": "+gitWorksFile.members[results[i]].username+"("+gitWorksFile.members[results[i]].email+")")
            }
            utils.askUser('Please type the corresponding number of the member you meant',function(answer){
                callback(results[parseInt(answer)-1]);
            });
        }
    }); 
};

exports.readGitWorksFile = function(callback){
    tof.isGitWorksInitialized(function(boolVal){
        if(boolVal){
            gitLayer.getProjectRootDirectory(function(path){
                fs.readFile(path+'/.gitWorks', function read(err, data) {
                    if (err) throw err;
                    var decoder = new StringDecoder('utf8');
                    var gitWorksFileStr = decoder.write(data);
                    callback(JSON.parse(gitWorksFileStr));                
                });              
            });
        }
        else{
            error.warning('gitworks not initalized.');
        }    
    });
};

exports.writeGitWorksFile = function(gitWorksFile, callback){
    tof.isGitWorksInitialized(function(boolVal){
        if(boolVal){
            gitLayer.getProjectRootDirectory(function(path){
                fs.writeFile(path+'/.gitWorks', JSON.stringify(gitWorksFile), function(err){
    		        if(err) throw err;
                    callback();
	            });             
            });
        }
        else{
            error.warning('gitworks not initalized.');
        }    
    });
}
