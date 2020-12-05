const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetNSFWRoleplayImage");

function getFuckText(author, user) {
    let fucks = [
        `${author} wants to fuck ${user}`,
        `${author} wants to bang ${user}`,
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
        if (user == message.author) {
            let embed = createEmbed({
                description: `${user.username} wants to fuck`,
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: getFuckText(message.author.username, user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};