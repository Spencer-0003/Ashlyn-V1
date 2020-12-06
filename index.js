/*
    Ashlyn
    Development started 05/12/20 4:19am
*/

// Setup Custom Log

const oldLog = console.log;
console.log = (...args) => oldLog("[Ashlyn]", ...args);

// Load Env

require("dotenv").config();
const { token } = process.env;

if (!token) {
    throw new Error("[Ashlyn] Missing token.");
};

// Create Shards

const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("./bot.js", {
    token,
    totalShards: "auto"
});

manager.on("shardCreate", shard => console.log(`Shard ${shard.id} launched`));
manager.spawn();