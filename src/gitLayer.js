var exec = require('child_process').exec;

var util  = require('util'),
    spawn = require('child_process').spawn,
    ls    = spawn('ls', ['-lh', '/usr']);

function runCmd(cmd){
    exec(cmd, {cwd: exports.getProjectRootDirectory()}, function(error, stdout, stderr) {
        return stdout;
    });
}

function runCmdWithDirectory(cmd, dir, callback){
    exec(cmd, {cwd: dir}, function(error, stdout, stderr) {
        callback(stdout.slice(0, - 1));
    });
}

exports.getVersion = function(callback){
    runCmdWithDirectory('git --version', process.cwd(), callback);
}

exports.getProjectRootDirectory = function(callback){
    runCmdWithDirectory('git rev-parse --show-toplevel', process.cwd(), callback);
}

exports.getUserConfigInfo = function (callback){
    exec('git config user.name', {cwd: process.cwd()}, function(error, stdout, stderr) {
            var username = stdout;
            exec('git config user.email', {cwd: process.cwd()}, function(error, stdout, stderr) {
                var email = stdout;
                var final_username = username.slice(0, -1);
                var final_email = email.slice(0, -1);
                callback({'username': final_username, 'email': final_email});
            });
    });
};

exports.getCurrentUsername = function (callback){
    exports.getUserConfigInfo(function(userinfo){
        callback(userinfo.username);
    });
};
