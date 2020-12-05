const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");

const superagent = require("superagent");

module.exports = class AssCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ass",
            group: "nsfw",
            memberName: "ass",
            description: "Sends a random image of an ass",
            nsfw: true
        });
    };

    async run(message) {
        superagent.get("https://nekobot.xyz/api/image?type=ass").end((err, response) => {
            let embed = createEmbed({
                title: "Ashlyn: NSFW",
                image: (err || response.body.message),
                thumbnail: false
            });

            return message.embed(embed);
        });
    };
};