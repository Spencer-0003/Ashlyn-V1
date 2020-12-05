const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetRoleplayImage");

let getBlushText = (author, user) => {
    let blushes = [
        `${author} turned red because of ${user}`,
        `${user} made ${author} turn red`
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
        if (user == message.author) {
            let embed = createEmbed({
                description: `${user.username} is blushing`,
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: getBlushText(message.author.username, user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};