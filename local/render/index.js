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

/* Welcome (SIGN UP, SETTINGS)
-------------------------------------------------- */
var welcome = function(req, res, next) {
      res.render('welcome', {
        'locals': [
              { 
                url: '../../',
          }
      ]
    });
};

/* Exports
-------------------------------------------------- */
exports.ignite = ignite;