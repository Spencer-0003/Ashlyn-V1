const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetRoleplayImage");

let getCheerText = (translations, author, user) => {
    let cheers = [
        translations.MESSAGE_ONE.format(author, user),
        translations.MESSAGE_TWO.format(author, user),
    ];

    return cheers[Math.floor(Math.random() * cheers.length)];
};

module.exports = class CheerCommand extends Command {
    constructor(client) {
        super(client, {
            name: "cheer",
            group: "roleplay",
            memberName: "cheer",
            description: "Cheers for the given person",
            clientPermissions: ["EMBED_LINKS"],
            args: [
                {
                    key: "user",
                    prompt: "Who are you cheering for?",
                    type: "user",
                    default: message => message.author
                }
            ]
        });
    };

    run(message, { user }) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.ROLEPLAY.CHEER;

        if (user == message.author) {
            let embed = createEmbed({
                description: translations.SOLO.format(user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: getCheerText(translations, message.author.username, user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};