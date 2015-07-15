var output = require('./src/output');
var tof = require('./src/trueORFalse');

var cmd_map = {
                 'init': './src/cmd_init',
                 'task': './src/cmd_task'
              };

function main (args){
    tof.isGitInstalled(function(boolVal){
        if(boolVal){
            tof.isGitInitialized(function(boolVal_2){
	 	        if(boolVal_2){
                    var command = args.shift();
                    if(cmd_map.hasOwnProperty(command))
                        require(cmd_map[command]).main(args);
                    else
                        output.usage();
                }
                else{
                    output.error('git must be initalized before using gitworks.');
                }
            });
        }
        else{
            output.error('git is not installed on your machine.');
        }
    });
}

main(process.argv.splice(2));
