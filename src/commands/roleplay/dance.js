const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const { otaku_gif_api_key } = process.env;
const superagent = require("superagent");

module.exports = class DanceComamnd extends Command {
    constructor(client) {
        super(client, {
            name: "dance",
            group: "roleplay",
            memberName: "dance",
            description: "Dances with the given person",
            clientPermissions: ["EMBED_LINKS"],
            args: [
                {
                    key: "user",
                    prompt: "Who are you dancing with?",
                    type: "user",
                    default: message => message.author
                }
            ]
        });
    };

    run(message, { user }) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.ROLEPLAY;

        if (!this.client.roleplayEnabled) {
            let embed = createEmbed({
                description: translations.NO_API_KEY,
            });

            return message.embed(embed);
        };

        if (user == message.author) {
            superagent
                .get("https://api.otakugifs.xyz/gif/dance")
                .set("X-API-KEY", otaku_gif_api_key)
                .end((err, response) => {
                    let embed = createEmbed({
                        description: translations.DANCE.SOLO.format(user.username),
                        image: (err || response.body.url),
                        thumbnail: false,
                        footer: "Powered by otakugifs.xyz"
                    });

                    return message.embed(embed);
                });
        } else {
            superagent
                .get("https://api.otakugifs.xyz/gif/dance")
                .set("X-API-KEY", otaku_gif_api_key)
                .end((err, response) => {
                    let embed = createEmbed({
                        description: translations.DANCE.TOGETHER.format(message.author.username, user.username),
                        image: (err || response.body.url),
                        thumbnail: false,
                        footer: "Powered by otakugifs.xyz"
                    });

                    return message.embed(embed);
                });
        };
    };
};