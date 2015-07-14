var fs = require('fs');
var gitLayer = require('./gitLayer');
var jsonFile = require('json-file-plus');

exports.createGitWorksFile = function(callback){
	gitLayer.getProjectRootDirectory(function(val){
		fs.writeFile(val.slice(0, - 1)+'/.gitWorks', '{members:[], tasks:[]}', function(err) {
    		if(err) throw err;
    		callback();
		}); 
	});
};

exports.addMember = function(callback){
	gitLayer.getProjectRootDirectory(function(val){
// 		jsonFile('package.json', function (err, file) {
//     if (err) throw err;
 
//     file.set({
//         foo: 'bar',
//         bar: {
//             baz: true
//         }
//     });
 
//     file.save(callback);
// });
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
