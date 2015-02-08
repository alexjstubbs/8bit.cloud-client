/* Screen Renders
-------------------------------------------------- */
var fs = require('fs-extra');

/* Main App (DASHBOARD)
-------------------------------------------------- */
var ignite = function(req, res, next) {
      res.render('ignite', {
        'locals': [
              {
                url: '../../',
          }
      ]
    });
};

/*  Audio
-------------------------------------------------- */
var audio = function(req, res, next) {

    var sound = req.params.file;

    var mp3 = fs.readFileSync("./client/src/audio/"+sound);

    res.writeHead(200, {'Content-Type': 'audio/mp3' });
    res.end(mp3, 'binary');

    console.log("Playing Audio: "+sound);
};

/* Wifi Config
-------------------------------------------------- */
var WifiConfig = function(req, res, next) {
    var path = __appdirectory+'/.WifiConfig';

    if (fs.existsSync(path)) {
        _eula = fs.readFileSync(path);
    }

    else {
        _eula = "FAILURE TO LOAD Wifi Configuration File. Check permissions and that the file exists.";
    }

    res.writeHead(200, {'Content-Type': 'text/plain' });
    res.end(_eula, 'text/plain');
};


/* Exports
-------------------------------------------------- */
exports.ignite        = ignite;
exports.WifiConfig    = WifiConfig;
exports.audio         = audio;
