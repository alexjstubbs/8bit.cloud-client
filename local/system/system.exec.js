/* System execute helper
-------------------------------------------------- */
var exec = require('child_process').exec;

function execute(command, callback) {
    exec(command, function(error, stdout, stderr) {
        callback(error);
    });
};

module.exports = execute;