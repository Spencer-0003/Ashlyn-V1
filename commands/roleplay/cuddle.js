const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetRoleplayImage");

let getCuddleText = (author, user) => {
    let cuddles = [
        `${author} is embracing ${user} for cuddles`,
        `${author} is cuddling ${user}`
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
        if (user == message.author) {
            let embed = createEmbed({
                description: `${user.username} wants to cuddle`,
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: getCuddleText(message.author.username, user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};