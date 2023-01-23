const GW2 = require('gw2api-client');
const cacheMemory = require('gw2api-client/src/cache/memory');


const gw2 = GW2();
const gw2base = GW2();

const GUILD_WARS_API_KEY = process.env.GUILD_WARS_API_KEY;
gw2.authenticate(GUILD_WARS_API_KEY);
gw2.cacheStorage(cacheMemory({ gcTick: 5 * 60 * 1000 }));

module.exports = { gw2, gw2base };
