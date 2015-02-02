/* Network.isOnline
-------------------------------------------------- */
var fs 				= require('fs-extra'),
    Wireless		= require('wireless'),
    _ 				= require('lodash');

/* Options
-------------------------------------------------- */

function listWifiNetworks(nsp) {
//
// var iface = "en0";
//
// var wireless = new Wireless({
// 	iface: iface,
// 	updateFrequency: 12,
// 	vanishThreshold: 7,
// });
//
// wireless.enable(function(error) {
//     if (error) {
//         console.log("[ FAILURE] Unable to enable wireless card. Quitting...");
//         return;
//     }
//
//     console.log("[PROGRESS] Wireless card enabled.");
//     console.log("[PROGRESS] Starting wireless scan...");
//
//     wireless.start();
// });
//
// // A network disappeared (after the specified threshold)
// wireless.on('vanish', function(network) {
//     console.log("[  VANISH] " + network.ssid + " [" + network.address + "] ");
// });
//
// // A wireless network changed something about itself
// wireless.on('change', function(network) {
//     console.log("[  CHANGE] " + network.ssid);
// });
//
// wireless.on('signal', function(network) {
//     console.log("[  SIGNAL] " + network.ssid);
// });
//
// // We've joined a network
// wireless.on('join', function(network) {
//     console.log("[    JOIN] " + network.ssid + " [" + network.address + "] ");
// });
//
// // You were already connected, so it's not technically a join event...
// wireless.on('former', function(address) {
//     console.log("[OLD JOIN] " + address);
// });
//
// // We've left a network
// wireless.on('leave', function() {
//     console.log("[   LEAVE] Left the network");
// });
//
// // Just for debugging purposes
// wireless.on('command', function(command) {
//     console.log("[ COMMAND] " + command);
// });
//
// wireless.on('dhcp', function(ip_address) {
//     console.log("[    DHCP] Leased IP " + ip_address);
// });

/*
wireless.on('batch', function(networks) {
    console.log("[   BATCH] " + networks);
});
*/

// wireless.on('empty', function() {
//     console.log("[   EMPTY] Found no networks this scan");
// });
//
// wireless.on('error', function(message) {
//     console.log("[   ERROR] " + message);
// });
//
// wireless.on('appear', function(network) {
//     var quality = Math.floor(network.quality / 70 * 100);
//
//     var ssid = network.ssid || '<HIDDEN>';
//
//     var encryption_type = 'NONE';
//     if (network.encryption_wep) {
//         encryption_type = 'WEP';
//     } else if (network.encryption_wpa && network.encryption_wpa2) {
//         encryption_type = 'WPA&WPA2';
//     } else if (network.encryption_wpa) {
//         encryption_type = 'WPA';
//     } else if (network.encryption_wpa2) {
//         encryption_type = 'WPA2';
//     }
//
//     console.log("[  APPEAR] " + ssid + " [" + network.address + "] " + quality + "% " + network.strength + " dBm " + encryption_type);
//
//     if (!connected && network.ssid === SSID) {
//         connected = true;
//         wireless.join(network, '', function(err) {
//             if (err) {
//                 console.log("[   ERROR] Unable to connect.");
//                 return;
//             }
//
//             console.log("Yay, we connected! I will try to get an IP.");
//             wireless.dhcp(function(ip_address) {
//                 console.log("Yay, I got an IP address (" + ip_address + ")! I'm going to disconnect in 20 seconds.");
//
//                 setTimeout(function() {
//                     console.log("20 seconds are up! Attempting to turn off DHCP...");
//
//                     wireless.dhcpStop(function() {
//                         console.log("DHCP has been turned off. Leaving the network...");
//
//                         wireless.leave();
//                     });
//                 }, 20 * 1000);
//             });
//         });
//     }
// });
//
}

/*  Exports
-------------------------------------------------- */
exports.listWifiNetworks = listWifiNetworks;
