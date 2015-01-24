/* Game Image
-------------------------------------------------- */
var fs   = require('fs-extra')
,   PATH = require('path')
,   exec = require('child_process').exec;

exports.gameImage = function(req, res, callback) {

    var platform = req.params.platform,
        name     = req.params.name;
        type     = req.params.type;

        if (!type) type = 'box';

    var path = './databases/images/'+platform+'/'+name+'/'+type+'.png',
        img;

        path = path.replace(":", " - ");
        path = path.replace("_", " ");
        path = path.trim();
        path = path.replace(/\s{2,}/g, ' ');

    if (fs.existsSync(path)) {
        img = fs.readFileSync(path);
    }

    else {

        // Use 'find' to find alternates. (currently too slow)
        // var child = exec('find ./ -name \'*'+name+'*\'');
        //
        // console.log('find ./ -name \'*'+name+'*\' -exec ls -lrt {} \\;');
        //
        // child.stdout.on('data', function(data) {
        //     console.log('!!(stdout) | ' + data);
        // });
        //
        // child.stderr.on('data', function(data) {
        //     console.log('!!(stderr) | ' + data);
        // });
        //
        // child.on('close', function(code) {
        //     // TODO: If crash, restart with dialog and dump.
        //     console.log('!!(exitcode): ' + code);
        // });

        img = fs.readFileSync('./client/src/img/no-boxart.png');


    }

    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');


}
