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

/* Wifi Configu
-------------------------------------------------- */
var WifiConfig = function(req, res, next) {
    var path = appDir+'/.WifiConfig';

    if (fs.existsSync(path)) {
        _eula = fs.readFileSync(path);
    }

    else {
        _eula = "FAILURE TO LOAD Wifi Configuration File. Check permissions and that the file exists.";
    }

    res.writeHead(200, {'Content-Type': 'text/plain' });
    res.end(_eula, 'text/plain');
}


/* Exports
-------------------------------------------------- */
exports.ignite        = ignite;
exports.WifiConfig    = WifiConfig;
