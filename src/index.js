/*
    Ashlyn
    Development started 05/12/20 4:19am
*/

// Load Env

require("dotenv").config();
const { token, bot_name } = process.env;

// Setup Custom Log

const oldLog = console.log;
console.log = (...args) => oldLog(`[${bot_name}]`, ...args);

if (!token) {
    throw new Error(`[${bot_name}] Missing token.`);
};

// Create Shards

const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("src/bot.js", {
    token,
    totalShards: "auto"
});

manager.on("shardCreate", shard => console.log(`Shard ${shard.id} launched`));
manager.spawn();