const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetRoleplayImage");

module.exports = class DanceComamnd extends Command {
    constructor(client) {
        super(client, {
            name: "dance",
            group: "roleplay",
            memberName: "dance",
            description: "Dances with the given person",
            clientPermissions: ["EMBED_LINKS"],
            args: [
                {
                    key: "user",
                    prompt: "Who are you dancing with?",
                    type: "user",
                    default: message => message.author
                }
            ]
        });
    };

    run(message, { user }) {
        if (user == message.author) {
            let embed = createEmbed({
                description: `${user.username} is dancing`,
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: `${message.author.username} wants to dance with ${user.username}`,
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};