var fs = require('fs');

exports.ignite = function(req, res, next) {
      res.render('ignite', {
        'locals': [
              { 
                url: '../../',
          }
      ]
    });
};