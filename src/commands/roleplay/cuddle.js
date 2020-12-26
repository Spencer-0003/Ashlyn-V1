const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const { otaku_gif_api_key } = process.env;
const superagent = require("superagent");

let getCuddleText = (translations, author, user) => {
    let cuddles = [
        translations.MESSAGE_ONE.format(author, user),
        translations.MESSAGE_TWO.format(author, user),
    ];

    return cuddles[Math.floor(Math.random() * cuddles.length)];
};

module.exports = class CuddleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "cuddle",
            group: "roleplay",
            memberName: "cuddle",
            description: "Cuddles with the given person",
            clientPermissions: ["EMBED_LINKS"],
            args: [
                {
                    key: "user",
                    prompt: "Who are you cuddling with?",
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
                .get("https://api.otakugifs.xyz/gif/cuddle")
                .set("X-API-KEY", otaku_gif_api_key)
                .end((err, response) => {
                    let embed = createEmbed({
                        description: translations.CUDDLE.SOLO.format(user.username),
                        image: (err || response.body.url),
                        thumbnail: false,
                        footer: "Powered by otakugifs.xyz"
                    });

                    return message.embed(embed);
                });
        } else {
            superagent
                .get("https://api.otakugifs.xyz/gif/cuddle")
                .set("X-API-KEY", otaku_gif_api_key)
                .end((err, response) => {
                    let embed = createEmbed({
                        description: getCuddleText(translations.CUDDLE, message.author.username, user.username),
                        image: (err || response.body.url),
                        thumbnail: false,
                        footer: "Powered by otakugifs.xyz"
                    });

                    return message.embed(embed);
                });
        };
    };
};