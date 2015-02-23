/* Common Modules
-------------------------------------------------- */
common = {

       express:                    require('express'),
       http:                       require('http'),
       mu2express:                 require('mu2express'),
       render:                     require(__base + 'render'),
       game:                       require(__base + 'api/game/game.helpers'),
       hash:                       require(__base + 'system/achievements/achievement.hex.helper'),
       listroms:                   require(__base + 'api/game/game.platform.roms'),
       databases:                  require(__base + 'api/database/database.local'),
       listPlatforms:              require(__base + 'api/api.platforms'),
       profiles: 	               require(__base + 'api/api.profiles'),
       network:                    require(__base + 'api/network/network.online'),
       location:                   require(__base + 'api/network/network.location'),
       db:                         require(__base + 'api/game/game.image'),
       hex:                        require(__base + "system/achievements/achievement.hex.helper"),
       exec:                       require(__base + 'system/system.exec'),
       serverAPI:                  require(__base + 'api/server/server.api'),
       getSet:                     require(__base + 'api/api.sets'),
       systemWrite:                require(__base + 'system/system.write'),
       systemRead:                 require(__base + 'system/system.read'),
       wireless:                   require(__base + 'api/network/network.wireless'),
       process:                    require(__base + "system/system.process"),
       settings:                   require(__base + "system/system.settings").settings

};

module.exports = common;
