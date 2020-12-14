const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetRoleplayImage");

let getBlushText = (translations, author, user) => {
    let blushes = [
        translations.MESSAGE_ONE.format(author, user),
        translations.MESSAGE_TWO.format(user, author)
    ];

    return blushes[Math.floor(Math.random() * blushes.length)];
};

module.exports = class BlushCommand extends Command {
    constructor(client) {
        super(client, {
            name: "blush",
            group: "roleplay",
            memberName: "blush",
            description: "Blushes at the given person",
            clientPermissions: ["EMBED_LINKS"],
            args: [
                {
                    key: "user",
                    prompt: "Who are you blushing at?",
                    type: "user",
                    default: message => message.author
                }
            ]
        });
    };

    run(message, { user }) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.ROLEPLAY.BLUSH;

        if (user == message.author) {
            let embed = createEmbed({
                description: translations.SOLO.format(user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: getBlushText(translations, message.author.username, user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};