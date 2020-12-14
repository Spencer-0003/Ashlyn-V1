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
        let translations = this.client.getServerLocale(message.guild).COMMANDS.USER;
        let globalTranslations = this.client.getServerLocale(message.guild).GLOBAL;

        let embed = createEmbed({
            author: user.tag,
            thumbnail: user.displayAvatarURL(),
            message: [{ name: translations.JOINED_DISCORD, value: moment.utc(user.createdAt).format("MM/DD/YYYY h:mm A"), inline: true }, { name: "ID", value: user.id, inline: true }, { name: translations.BOT, value: user.bot ? globalTranslations.YES : globalTranslations.NO, inline: true }]
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
                .addField(translations.SERVER_JOIN_DATE, moment.utc(member.joinedAt).format("MM/DD/YYYY h:mm A"))
                .addField(translations.HIGHEST_ROLE, member.roles.highest.id === defaultRole.id ? translations.NONE : member.roles.highest, true)
                .addField(translations.HOIST_ROLE, member.roles.hoist ? member.roles.hoist : translations.NONE, true)
                .addField(`${translations.ROLES} (${member.roles.cache.size - 1})`, member.roles.cache.size - 1 ? allRoles : translations.NONE);
        };

        return message.embed(embed);
    };
};