/* Game Image
-------------------------------------------------- */
var fs = require('fs-extra');

exports.gameImage = function(req, res, callback) {

    var platform = req.params.platform,
        name = req.params.name;

    var path = './databases/images/'+platform+'/'+name+'/3d.png',
        img;

    if (fs.existsSync(path)) {
        img = fs.readFileSync(path);
    }

    else {
        img = fs.readFileSync('./client/src/img/no-boxart.png');
    }

    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');

}
