var fs = require('fs');
var StringDecoder = require('string_decoder').StringDecoder;
var gitLayer = require('./gitLayer');
var tof = require('./trueORFalse');
var output = require('./output');
var utils = require('./utils');

exports.createGitWorksFile = function(callback){
	gitLayer.getProjectRootDirectory(function(path){
		fs.writeFile(path+'/.gitWorks', '{"members":[], "tasks":[]}', function(err) {
    		if(err) throw err;
            callback();
	    }); 
 	});
};

exports.addMember = function(userinfo, callback){
    exports.readGitWorksFile(function(gitWorksFile){
        userinfo.id = utils.randomStringGenerator(5);
        gitWorksFile.members.push(userinfo);
        exports.writeGitWorksFile(gitWorksFile, function(){
            callback();
        });
    });                    
};

exports.addTask = function(task_data, callback){
    exports.readGitWorksFile(function(gitWorksFile){
        gitWorksFile.tasks.push(task_data);
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

exports.getMemberNameById = function(id, callback){
    exports.readGitWorksFile(function(gitWorksFile){
        for (var i = 0; i < gitWorksFile.members.length; i++) {
            if(gitWorksFile.members[i].id == id){
                callback(gitWorksFile.members[i].username);
                break;
            };
        }
    }); 
};

exports.getMemberIdByName = function(name, callback){
    var results = [];
    exports.readGitWorksFile(function(gitWorksFile){
        for (var i = 0; i < gitWorksFile.members.length; i++) {
            if((gitWorksFile.members[i].username.toLowerCase()).indexOf(name.toLowerCase()) != -1){
                results.push(gitWorksFile.members[i]);
            };
        }
        if(results.length==0){
            utils.askUser('[ERROR] Member not found, please type another name',function(answer){
                exports.getMemberIdByName(answer, callback);
            });
        }
        else if(results.length==1){
            callback(results[0].id);
        }
        else{
            output.note("Could not find the exact member, did you mean any of the follow:");
            for (var i = 0; i < results.length; i++) {
                console.log(""+(i+1).toString()+": "+results[i].username+"("+results[i].email+")")
            }
            utils.askUser('Please type the corresponding number of the member you meant',function(answer){
                callback(results[parseInt(answer)].id);
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
