/* Game Image
-------------------------------------------------- */
var fs = require('fs');

exports.gameImage = function(req, res, callback) {

    var platform = req.params.platform;
    var name = req.params.name;

    var img = fs.readFileSync('./local/database/games/'+platform+'/'+name+'/cover.png');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
   
}