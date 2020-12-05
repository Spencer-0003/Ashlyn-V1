const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetNSFWRoleplayImage");

let getSpankText = (author, user) => {
    let spanks = [
        `${author} wants to be spanked by ${user}`,
        `${author} wants ${user} to spank them`,
        `${author} has been naughty and ${user} needs to teach them a lesson`
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
        if (user == message.author) {
            let embed = createEmbed({
                description: `${user.username} wants to get spanked`,
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: getSpankText(message.author.username, user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};