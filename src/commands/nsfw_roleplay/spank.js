const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetNSFWRoleplayImage");

function getSpankText(translations, author, user) {
    let spanks = [
        translations.MESSAGE_ONE.format(author, user),
        translations.MESSAGE_TWO.format(author, user),
        translations.MESSAGE_THREE.format(author, user)
    ];

    return spanks[Math.floor(Math.random() * spanks.length)];
};

module.exports = class SpankComamnd extends Command {
    constructor(client) {
        super(client, {
            name: "spank",
            group: "nsfw_roleplay",
            memberName: "spank",
            description: "Spank a deviant.",
            nsfw: true,
            clientPermissions: ["EMBED_LINKS"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to get spanked by?",
                    type: "user",
                    default: message => message.author
                }
            ]
        });
    };

    run(message, { user }) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.NSFW_ROLEPLAY.BLOWJOB;

        if (user == message.author) {
            let embed = createEmbed({
                description: translations.SOLO.format(user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: getSpankText(translations, message.author.username, user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};