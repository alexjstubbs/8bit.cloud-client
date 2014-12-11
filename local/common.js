/* Common Modules
-------------------------------------------------- */
common = {
       express:                    require('express')
,      http:                       require('http')
,      path:                       require('path')
,      request:                    require('request')
,      mu2express:                 require('mu2express')
,      render:                     require('../local/render')
,      clientNotification:         require('../local/system/notifications/client.notification')
,      game:                       require('../local/api/game/game.helpers')
,      achievements:               require('../local/system/achievements/achievement.loop')
,      hex:                        require('../local/system/achievements/achievement.hex.helper')
,      hash:                       require('../local/system/achievements/achievement.hex.helper')
,      sounds:                     require('../local/system/system.sounds')
,      listroms:                   require('../local/api/game/game.platform.roms')
,      databases:                  require('../local/api/database/database.local')
,      listPlatforms:              require('../local/api/api.platforms')
,      profiles: 	               require('../local/api/api.profiles')
,      network:                    require('../local/api/network/network.online')
,      location:                   require('../local/api/network/network.location')
,      db:                         require('../local/api/game/game.image')
,      exec:                       require('../local/system/system.exec')
,      serverAPI:                  require('../local/api/server/server.api')
,      getSet:                     require('../local/api/api.sets')
,      systemWrite:                require('../local/system/system.write')
,      wireless:                   require('../local/api/network/network.wireless')

};

module.exports = common;