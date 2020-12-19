const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetNSFWRoleplayImage");

function getFuckText(translations, author, user) {
    let fucks = [
        translations.MESSAGE_ONE.format(author, user),
        translations.MESSAGE_TWO.format(author, user)
    ];

    return fucks[Math.floor(Math.random() * fucks.length)];
};

module.exports = class FuckCommand extends Command {
    constructor(client) {
        super(client, {
            name: "fuck",
            aliases: ["sex"],
            group: "nsfw_roleplay",
            memberName: "fuck",
            description: "Have sex with someone.",
            nsfw: true,
            clientPermissions: ["EMBED_LINKS"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to fuck?",
                    type: "user",
                    default: message => message.author
                }
            ]
        });
    };

    run(message, { user }) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.NSFW_ROLEPLAY.FUCK;

        if (user == message.author) {
            let embed = createEmbed({
                description: translations.SOLO.format(user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: getFuckText(translations, message.author.username, user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};