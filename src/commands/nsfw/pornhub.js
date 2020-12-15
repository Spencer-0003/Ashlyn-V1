const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");

const PornHub = require("pornhub.js");
const pornhub = new PornHub();

module.exports = class PornHubCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pornhub",
            group: "nsfw",
            memberName: "pornhub",
            description: "Searches pornhub for the chosen video",
            nsfw: true
        });
    };

    run(message) {
        let translations = this.client.getServerLocale(message.guild.id).COMMANDS.NSFW;

        let search = message.content.split(/\s+/g).slice(1).join(" ");

        if (!search) {
            let embed = createEmbed({
                title: "Ashlyn: NSFW",
                description: "No video specified."
            });

            return message.embed(embed);
        };

        pornhub.search("Video", search).then(res => {
            let data = res.data[0];
            let embed = createEmbed({
                title: data.title,
                message: [{ name: translations.DURATION, value: data.duration, inline: true }, { name: translations.HD_VIDEO, value: data.hd, inline: true }, { name: translations.PREMIUM_VIDEO, value: data.premium, inline: true }, { name: translations.VIDEO_URL, value: data.url }]
            });

            return message.embed(embed);
        });
    };
};