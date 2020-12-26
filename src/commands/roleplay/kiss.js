const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const { otaku_gif_api_key } = process.env;
const superagent = require("superagent");

let getKissText = (translations, author, user) => {
    let blushes = [
        translations.MESSAGE_ONE.format(author, user),
        translations.MESSAGE_TWO.format(author, user)
    ];

    return blushes[Math.floor(Math.random() * blushes.length)];
};

module.exports = class KissComamnd extends Command {
    constructor(client) {
        super(client, {
            name: "kiss",
            group: "roleplay",
            memberName: "kiss",
            description: "Kisses the given person",
            clientPermissions: ["EMBED_LINKS"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to kiss?",
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
                .get("https://api.otakugifs.xyz/gif/kiss")
                .set("X-API-KEY", otaku_gif_api_key)
                .end((err, response) => {
                    let embed = createEmbed({
                        description: translations.KISS.SOLO.format(message.author.username),
                        image: (err || response.body.url),
                        thumbnail: false,
                        footer: "Powered by otakugifs.xyz"
                    });

                    return message.embed(embed);
                });
        } else {
            superagent
                .get("https://api.otakugifs.xyz/gif/kiss")
                .set("X-API-KEY", otaku_gif_api_key)
                .end((err, response) => {
                    let embed = createEmbed({
                        description: getKissText(translations.KISS, message.author.username, user.username),
                        image: (err || response.body.url),
                        thumbnail: false,
                        footer: "Powered by otakugifs.xyz"
                    });

                    return message.embed(embed);
                });
        };
    };
};