/* Game Image
-------------------------------------------------- */
var fs = require('fs-extra');

exports.gameImage = function(req, res, callback) {

    var platform = req.params.platform,
        name     = req.params.name;
        type     = req.params.type;

        if (!type) type = 'front';

    var path = './databases/images/'+platform+'/'+name+'/'+type+'.png',
        img;

        path = path.replace(":", " - ");
        path = path.replace("_", " ");
        path = path.trim();
        path = path.replace(/\s{2,}/g, ' ');

        console.log(path);

    if (fs.existsSync(path)) {
        img = fs.readFileSync(path);
    }

    else {

        // var child = exec('find ./ -name \'*'+name+'*\'  -exec ls -lrt {} \;');
        //
        // child.stdout.on('data', function(data) {
        //     console.log('(stdout) | ' + data);
        // });
        //
        // child.on('close', function(code) {
        //     // TODO: If crash, restart with dialog and dump.
        //     console.log('(exitcode): ' + code);
        // });

        // find ./ -name '*dragon*'  -exec ls -lrt {} \;

        img = fs.readFileSync('./client/src/img/no-boxart.png');
    }

    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');


}
