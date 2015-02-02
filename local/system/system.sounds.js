/* System API: Sounds
-------------------------------------------------- */
var execute = require(appDir+'/local/common').exec;

exports.play = function(req, res) {

    event = req.params.event;
    res.send('null');

    sound = 'aplay ./audio/'+event;

    execute(sound,function(stdout){
      console.log(stdout);
    });

};
