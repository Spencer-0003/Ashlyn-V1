const Command = require("@structures/Command");

module.exports = class AshlynCommand extends Command {
    constructor(client, info) {
        super(client, info);
        this.throttling = info.unknown ? null : info.throttling || { usages: 1, duration: 2 };
    };
};