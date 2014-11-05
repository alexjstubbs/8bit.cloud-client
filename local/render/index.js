/* Screen Renders
-------------------------------------------------- */

var fs          = require('fs-extra');

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

/* EULA
-------------------------------------------------- */
var EULA = function(req, res, next) {
    var path = appDir+'/.EULA';

    if (fs.existsSync(path)) {
        _eula = fs.readFileSync(path);
    }

    else {
        _eula = "FAILURE TO LOAD EULA";
    }

    res.writeHead(200, {'Content-Type': 'text/plain' });
    res.end(_eula, 'text/plain');
}

/* Exports
-------------------------------------------------- */
exports.ignite = ignite;
exports.EULA = EULA;