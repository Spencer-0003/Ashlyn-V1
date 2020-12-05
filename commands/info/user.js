const Command = require("@structures/Command");
const moment = require("moment");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class UserCommand extends Command {
    constructor(client) {
        super(client, {
            name: "user",
            group: "info",
            memberName: "user",
            description: "Responds with detailed information on a user.",
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to get the avatar of?",
                    type: "user",
                    default: message => message.author
                }
            ],
        });
    };

    async run(message, { user }) {
        let embed = createEmbed({
            author: user.tag,
            thumbnail: user.displayAvatarURL(),
            message: [{ name: "Joined Discord", value: moment.utc(user.createdAt).format("MM/DD/YYYY h:mm A"), inline: true }, { name: "ID", value: user.id, inline: true }, { name: "Bot", value: user.bot ? "Yes" : "No", inline: true }]
        });

        if (message.guild) {
            let allRoles = "";
            let member = await message.guild.members.fetch(user.id);

            member.roles.cache.forEach(role => {
                if (role.name !== "@everyone") {
                    allRoles = allRoles += `${role}, `;
                };
            });

            let defaultRole = message.guild.roles.cache.get(message.guild.id);
            embed
                .addField("Server Join Date", moment.utc(member.joinedAt).format("MM/DD/YYYY h:mm A"))
                .addField("Highest Role", member.roles.highest.id === defaultRole.id ? "None" : member.roles.highest, true)
                .addField("Hoist Role", member.roles.hoist ? member.roles.hoist : "None", true)
                .addField(`Roles (${member.roles.cache.size - 1})`, member.roles.cache.size - 1 ? allRoles : "None");
        };

        return message.embed(embed);
    };
};