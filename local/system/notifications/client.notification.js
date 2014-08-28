/* System Notification
-------------------------------------------------- */
var execute = require(appDir+'/local/common').exec;

exports.clientNotification = function(req, res, callback) {

    var width = req.params.width;
    var icon = req.params.icon;
    var text = req.params.text;

    // /clientNotification/:width/:icon/:text

    // NOTE: kill process before starting another. Doing multiple notifications at the same time will kill pi video signal
    execute('/home/pi/ignition/helpers/openvg/client/notification "' + text + '" "/home/pi/ignition/public/img/themes/moon/' + icon + '" ' + width + '', function(stdout) {
        console.log("out: " + stdout);
    });

    res.send("");
    // var title = req.params.title;
    // var message = req.params.message;

    // systemNotification(title, message);

    // function systemNotification(title, message) {
    //     res.render('systemNotification', {
    //         'locals': [{
    //             'title': title,
    //             'message': message
    //         }]
    //     });
    // }
}