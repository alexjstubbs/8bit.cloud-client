/*  Proccess' Functions
-------------------------------------------------- */
var exec = require('child_process').exec;

/*  Kill All
-------------------------------------------------- */
var killall = function(nsp, params, callback) {

    exec('killall '+params, function(stderr, stdout) {

        if (nsp) {
            nsp.emit({stdout: stderr, stderr: stderr});
        }

        if (callback) {
            callback(stderr, stdout);
        }

    });
};

/*  Exports
-------------------------------------------------- */
exports.killall = killall;
