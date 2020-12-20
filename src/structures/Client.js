const { CommandoClient } = require("discord.js-commando");
const getServerLocale = require("@utils/GetServerLocale");

module.exports = class AshlynClient extends CommandoClient {
    constructor(options) {
        super(options);

        this.queue = new Map();
        this.games = new Map();
        this.getServerLocale = getServerLocale;
        this.serverSettings = new Map();
        this.locales = new Array();
    };
};