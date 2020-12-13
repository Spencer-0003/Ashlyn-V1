// Setup Custom Log

const oldLog = console.log;
console.log = (...args) => oldLog("[Ashlyn]", ...args);

// Add string.format

String.prototype.format = function() {
    let args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
    });
};

// Load Modules

require("module-alias/register");
require("dotenv").config();

const { token, mongo_url, mongo_db } = process.env;
const fs = require("fs");
const path = require("path");

const { MongoClient } = require("mongodb");
const MongoDBProvider = require("commando-provider-mongo");

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
        eval: false,
        help: false,
        ping: false,
        prefix: false,
        commandState: false,
        unknownCommand: false
    })
    .registerCommandsIn(path.join(__dirname, "commands"));

client.registry.findGroups("util")[0].name = "🔦 Utility";

// Set Provider

client.setProvider(MongoClient.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }).then(mongoClient => {
    console.log("Connected to database.");
    return new MongoDBProvider(mongoClient, mongo_db);
}).catch(err => {
    throw new Error(err);
}));

// Add Events

fs.readdir("./events", (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        if (client.shard.ids[0] === 0) {
            console.log(`Loaded event "${eventName}"`);
        };

        client.on(eventName, event.bind(null, client));
    });
});

// Login

client.login(token);