// Setup Custom Log

const oldLog = console.log;
console.log = (...args) => oldLog("[Ashlyn]", ...args);

// Load Modules

require("module-alias/register");
require("dotenv").config();

const { token } = process.env;
const fs = require("fs");
const path = require("path");

// Create Client

const Client = require("@structures/Client");
const client = new Client({
    commandPrefix: "!",
    owner: "519790100956184586",
    invite: "https://discord.gg/FhGVhR28pJ",
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["fun", "😀 Fun"],
        ["info", "📈 Info"],
        ["moderation", "📏 Moderation"],
        ["nsfw", "🥵 NSFW"],
        ["music", "🎧 Music"],
        ["roleplay", "🤗 Roleplay"],
        ["nsfw_roleplay", "🥵 Roleplay (NSFW)"],
        ["search", "🔍 Search"],
        ["utility", "🔦 Utility"]
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