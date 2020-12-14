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
                message: [{ name: "Duration", value: data.duration, inline: true }, { name: "HD", value: data.hd, inline: true }, { name: "Premium", value: data.premium, inline: true }, { name: "URL", value: data.url }]
            });

            return message.embed(embed);
        });
    };
};