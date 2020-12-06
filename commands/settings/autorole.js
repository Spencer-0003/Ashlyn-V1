const Command = require("@structures/Command");
const createEmbed = require("@utils/Embed");

module.exports = class AutoRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "autorole",
            group: "settings",
            memberName: "autorole",
            guildOnly: true,
            description: "Allows you to auto role members when they join your server.",
            args: [
                {
                    key: "role",
                    prompt: "What role would like to set",
                    type: "role"
                }
            ]
        });
    };

    run(message, { role }) {
        if(!message.member.hasPermission("ADMINISTRATOR") && !this.client.isOwner(message.author)) {
            return message.reply("Only administrators may change the command prefix.");
        };

        message.guild.autoRole = role;

        let embed = createEmbed({
            title: "Ashlyn: Auto Role",
            description: `The auto role has been set to <@${role.id}>`
        });

        return message.channel.embed(embed);
    };
};