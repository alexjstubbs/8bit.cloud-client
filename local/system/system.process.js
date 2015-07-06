/*  Proccess' Functions
-------------------------------------------------- */
var exec = require('child_process').exec;

/*  Execute a system command via front-end
-------------------------------------------------- */
var execute = function(nsp, params) {

    var child = exec(params);

    child.stdout.on('data', function(data) {
        console.log('(stdout) | ' + data);
    });

    child.stderr.on('data', function(data) {
        console.log('(stderr) | ' + data);
    });

};

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

/*  Send Signal
-------------------------------------------------- */
var signal = function(nsp, params, callback) {

    exec('killall -s '+params.signal+' '+params.processname+'', function(stderr, stdout) {

        if (nsp) {
            nsp.emit({stdout: stderr, stderr: stderr});
        }

        if (callback) {
            callback(stderr, stdout);
        }

    });
};

/*  Kill
-------------------------------------------------- */
var kill = function(nsp, params, callback) {

    exec('kill '+params, function(stderr, stdout) {

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
exports.execute = execute;
exports.killall = killall;
exports.signal  = signal;
exports.kill    = kill;
