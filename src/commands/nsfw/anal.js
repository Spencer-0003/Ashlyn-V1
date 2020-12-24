const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const superagent = require("superagent");

module.exports = class AnalCommand extends Command {
    constructor(client) {
        super(client, {
            name: "anal",
            group: "nsfw",
            memberName: "anal",
            description: "Sends a random image of anal.",
            nsfw: true
        });
    };

    async run(message) {
        superagent.get("https://nekobot.xyz/api/image?type=anal").end((err, response) => {
            let embed = createEmbed({
                title: `${message.client.user.username}: NSFW`,
                image: (err || response.body.message),
                thumbnail: false
            });

            return message.embed(embed);
        });
    };
};