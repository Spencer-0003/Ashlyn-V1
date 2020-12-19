const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetRoleplayImage");

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
        let translations = this.client.getServerLocale(message.guild).COMMANDS.ROLEPLAY.CUDDLE;

        if (user == message.author) {
            let embed = createEmbed({
                description: translations.SOLO.format(user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: getCuddleText(translations, message.author.username, user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};