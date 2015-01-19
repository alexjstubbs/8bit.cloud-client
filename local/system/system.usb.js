/*  USB Detection
-------------------------------------------------- */
var monitor = require('usb-detection');

/*  USB Detection
-------------------------------------------------- */

var monitorUSB = function() {

    monitor.on('add', function(err, devices) {

        if (err) {
            console.log(err);
        }

        console.log(devices);

    });


    monitor.on('remove', function(err, devices) {

        if (err) {
            console.log(err);
        }

        console.log(devices);

    });
}

monitorUSB();

/*  Exports
-------------------------------------------------- */
exports.minitorUSB = monitorUSB;
