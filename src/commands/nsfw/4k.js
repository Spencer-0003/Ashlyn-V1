const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");

const superagent = require("superagent");

module.exports = class FourKCommand extends Command {
    constructor(client) {
        super(client, {
            name: "4k",
            group: "nsfw",
            memberName: "4k",
            description: "Sends 4k porn.",
            nsfw: true
        });
    };

    async run(message) {
        superagent.get("https://nekobot.xyz/api/image?type=4k").end((err, response) => {
            let embed = createEmbed({
                title: "Ashlyn: NSFW",
                image: (err || response.body.message),
                thumbnail: false
            });

            return message.embed(embed);
        });
    };
};