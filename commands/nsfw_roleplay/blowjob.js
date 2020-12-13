const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetNSFWRoleplayImage");

function getBlowJobText(author, user) {
    let blowjobs = [
        `${author} wants to swallow ${user}`,
        `${author} swallowed ${user}'s hot load`,
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
        let translations = this.client.getServerLocale(message.guild).COMMANDS.NSFW_ROLEPLAY;

        if (user == message.author) {
            let embed = createEmbed({
                description: translations.SOLO_BLOWJOB.format(user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: getBlowJobText(message.author.username, user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};