/* Common Modules
-------------------------------------------------- */
common = {
    express: require('express'),
    http: require('http'),
    path: require('path'),
    request: require('request'),
    mu2express: require('mu2express'),
    render: require('../local/render'),
    // systemNotification: require('../local/system/notifications/system.notification'),
    clientNotification: require('../local/system/notifications/client.notification'),
    game: require('../local/api/game/game.helpers'),
    achievements: require('../local/system/achievements/achievement.loop'),
    hex: require('../local/system/achievements/achievement.hex.helper'),
    hash: require('../local/system/achievements/achievement.hex.helper'),
    sounds: require('../local/system/system.sounds'),
    listroms: require('../local/api/game/game.platform.roms'),
    databases: require('../local/api/database/database.local'),
    listPlatforms: require('../local/api/api.platforms'),
    network: require('../local/api/network/network.online'),
    db: require('../local/api/game/game.image'),
    exec: require('../local/system/system.exec')
};

module.exports = common;