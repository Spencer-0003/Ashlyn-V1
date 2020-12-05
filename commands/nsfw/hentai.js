const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class HentaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: "hentai",
            group: "nsfw",
            memberName: "hentai",
            description: "Sends random hentai",
            nsfw: true
        });
    };

    async run(message) {
        let image = await this.client.neko.nsfw.hentai();

        let embed = createEmbed({
            title: "Ashlyn: NSFW",
            image: image.url,
            thumbnail: false
        });

        return message.embed(embed);
    };
};