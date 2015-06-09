var colors = require('colors');
var args = process.argv.splice(2);
var command = args.shift();

switch(command){
    case 'init':
        break;
    case 'help':
        showHelp();
        break;
    default:
        showHelp();
        break;
}


function showHelp(){
        console.log();
        console.log('                 '+ 'gitWorks Usage'.underline);
        console.log();
        console.log('Update:                    '.yellow+'node gitWorks update');
        console.log('Init:                      '.blue+'node gitWorks init');
        console.log('Make New Work Item:        '.yellow+'node gitWorks new <description> priority [high|low]');
        console.log('Items Assigned To/By You:  '.blue+'node gitWorks mine');
        console.log('Items Assigned To Someone: '.yellow+'node gitWorks to <name>');
        console.log('Items Assigned By Someone: '.blue+'node gitWorks by <name>');
        console.log('See All Work Iterms:       '.yellow+'node gitWorks all');
        console.log('Change Status of Work Item:'.blue+'node gitWorks <item id> [working|done]');
}

function init(){
    
}
