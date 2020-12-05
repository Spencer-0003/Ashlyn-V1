const { CommandoClient } = require("discord.js-commando");
const NekosLife = require("nekos.life");
const Kitsu = require("kitsu");

module.exports = class AshlynClient extends CommandoClient {
    constructor(options) {
        super(options);

        this.queue = new Map();
        this.neko = new NekosLife();
        this.kitsu = new Kitsu();
    };
};