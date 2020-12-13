const { CommandoClient } = require("discord.js-commando");

module.exports = class AshlynClient extends CommandoClient {
    constructor(options) {
        super(options);

        this.queue = new Map();
        this.games = new Map();
    };
};