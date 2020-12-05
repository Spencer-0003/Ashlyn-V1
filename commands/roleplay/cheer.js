const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetRoleplayImage");

let getCheerText = (author, user) => {
    let cheers = [
        `${author} is cheering for ${user}`,
        `${author} is cheering ${user} on`
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
        if (user == message.author) {
            let embed = createEmbed({
                description: `${user.username} is cheering`,
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: getCheerText(message.author.username, user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};