var output = require('./src/output');
var tof = require('./src/trueORFalse');

function main (args){
    tof.isGitInstalled(function(boolVal){
        if(boolVal){
            var command = args.shift();
            switch(command){
                case 'init':
                    require('./src/cmd_init').main(args);
                    break;
                default:
                    output.usage();
                    break;
            }
        }
        else{
            output.error('git is not installed on your machine.');
        }
    });
}

main(process.argv.splice(2));