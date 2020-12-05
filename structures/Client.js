const { CommandoClient } = require("discord.js-commando");
const NekosLife = require("nekos.life");

module.exports = class AshlynClient extends CommandoClient {
    constructor(options) {
        super(options);

        this.queue = new Map();
        this.neko = new NekosLife();
    };
};