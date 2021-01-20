// Load Env

require("module-alias/register");
require("dotenv").config();

const { token, mongo_url, mongo_db, bot_name, otaku_gif_api_key } = process.env;

// Setup Custom Log

const oldLog = console.log;
console.log = (...args) => oldLog(`[${bot_name}]`, ...args);

// Add string.format

String.prototype.format = function() {
    let args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
    });
};

const fs = require("fs");
const path = require("path");

const { MongoClient } = require("mongodb");
const { MongoDBProvider } = require("commando-provider-mongo");

const log = require("@utils/LogError");
const logs = require("discord-logs");

// Create Client

const Client = require("@structures/Client");
const client = new Client({
    commandPrefix: "!",
    owner: "519790100956184586",
    invite: "https://discord.gg/wfyhsxZ6CV",
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["fun", "😀 Fun"],
        ["games", "🎮 Games"],
        ["info", "📈 Info"],
        ["levels", "➕ Levels"],
        ["moderation", "📏 Moderation"],
        ["nsfw", "🥵 NSFW"],
        ["music", "🎧 Music"],
        ["roleplay", "🤗 Roleplay"],
        ["nsfw_roleplay", "🥵 Roleplay (NSFW)"],
        ["search", "🔍 Search"],
        ["settings", "⚙️ Settings"],
        // ["owner", "👑 Owner"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        // eval: false,
        help: false,
        ping: false,
        prefix: false,
        commandState: false,
        unknownCommand: false
    })
    .registerCommandsIn(path.join(__dirname, "commands"));

client.registry.findGroups("util")[0].name = "🔦 Utility";
logs(client);

// Set Provider

client.setProvider(MongoClient.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }).then(mongoClient => {
    console.log("Connected to database.");
    return new MongoDBProvider(mongoClient, mongo_db);
}).catch(err => {
    throw new Error(err);
}));

// Check if API key exists

if (!otaku_gif_api_key) {
    console.log("[WARNING] If you don't supply an API key, roleplay commands will be disabled.");
};

// Add Events

fs.readdir("src/events", (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    if (client.shard.ids[0] === 0) {
        console.log("Loaded events.");
    };
});

// Add Locales

fs.readdir("src/locales", (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith(".json")) return;
        let localeName = file.split(".")[0];

        client.locales.push(localeName);
    });

    if (client.shard.ids[0] === 0) {
        console.log("Loaded locales.");
    };
});

// Login

client.login(token);

// Error handling

client.on("commandError", (command, err) => log(client, "Command Error", err, command));
process.on("unhandledRejection", (err, p) => log(client, "Unhandled Rejection", err, p));
process.on("rejectionHandled", err => log(client, "Rejection Handled", err));
process.on("uncaughtExceptionMonitor", err => log(client, "Uncaught Exception Monitor", err));
process.on("warning", err => log(client, "Warning", err));
