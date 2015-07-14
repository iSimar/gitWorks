var fs = require('fs');
var StringDecoder = require('string_decoder').StringDecoder;
var gitLayer = require('./gitLayer');
var tof = require('./trueORFalse');
var output = require('./output');

exports.createGitWorksFile = function(callback){
	gitLayer.getProjectRootDirectory(function(path){
		fs.writeFile(path+'/.gitWorks', '{"members":[], "tasks":[]}', function(err) {
    		if(err) throw err;
            callback();
	    }); 
 	});
};

exports.addMember = function(userinfo, callback){
    gitLayer.getProjectRootDirectory(function(path){
        tof.isGitWorksInitialized(function(boolVal){
            if(boolVal){
                fs.readFile(path+'/.gitWorks', function read(err, data) {
                    if (err) throw err;
                    var decoder = new StringDecoder('utf8');
                    var gitWorksConfigStr = decoder.write(data);
                    var gitWorksConfig = JSON.parse(gitWorksConfigStr);
                    gitWorksConfig.members.push(userinfo);
                    fs.writeFile(path+'/.gitWorks', JSON.stringify(gitWorksConfig), function(err){
    		            if(err) throw err;
                        callback();
	                }); 
                });
            }
            else{
	 		    output.error('git must be initalized before using gitworks.');
	 	    }
        });
    });
};

		// jsonFile(val.slice(0, - 1)+'/.gitWorks', function (err, file) {
  //   		if (err) throw err;
		//     file.set({
		//         foo: 'bar',
		//         bar: {
		//             baz: true
		//         }
		//     });
		//     file.save(callback);
		// });
