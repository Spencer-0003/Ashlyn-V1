const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetNSFWRoleplayImage");

function getBlowJobText(translations, author, user) {
    let blowjobs = [
        translations.MESSAGE_ONE.format(author, user),
        translations.MESSAGE_TWO.format(author, user),
    ];

    return blowjobs[Math.floor(Math.random() * blowjobs.length)];
};

module.exports = class BlowJobComamnd extends Command {
    constructor(client) {
        super(client, {
            name: "blowjob",
            aliases: ["bj"],
            group: "nsfw_roleplay",
            memberName: "blowjob",
            description: "Swallow a hot, sticky, load.",
            nsfw: true,
            clientPermissions: ["EMBED_LINKS"],
            args: [
                {
                    key: "user",
                    prompt: "Who do you want to swallow?",
                    type: "user",
                    default: message => message.author
                }
            ]
        });
    };

    run(message, { user }) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.NSFW_ROLEPLAY.BLOWJOB_MESSAGES;

        if (user == message.author) {
            let embed = createEmbed({
                description: translations.SOLO.format(user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: getBlowJobText(translations, message.author.username, user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};