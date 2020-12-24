const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: "kick",
            group: "moderation",
            memberName: "kick",
            description: "Kicks the chosen user",
            userPermissions: ["KICK_MEMBERS"],
            clientPermissions: ["KICK_MEMBERS"],
            guildOnly: true,
            args: [
                {
                    key: "user",
                    prompt: "Who would you like to kick?",
                    type: "user",
                },
                {
                    key: "kickReason",
                    prompt: "Why do you want to kick them?",
                    type: "string",
                },
            ],
        });
    };

    async run(message, { user, kickReason }) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MODERATION;
        let embedTitle = `${message.client.user.username}: ${translations.TITLE}`;

        let embed = createEmbed({
            title: embedTitle,
            description: translations.DM_BAN_MESSAGE.format(message.guild.name, kickReason),
            message: [{ name: translations.MODERATOR, value: `<@${message.author.id}>` }]
        });

        if (user === message.author) {
            let errorEmbed = createEmbed({
                title: embedTitle,
                description: translations.SELF_KICK,
            });

            return message.say(errorEmbed);
        };

        try {
            await user.send(embed);
        } catch {
            message.say(translations.DM_FAIL);
        };

        let kickEmbed = createEmbed({
            title: embedTitle,
            description: translations.KICK_MESSAGE.format(user, kickReason),
            message: [{ name: translations.MODERATOR, value: `<@${message.author.id}>` }]
        });

        message.guild.member(user).kick({
            reason: kickReason
        });

        return message.embed(kickEmbed);
    };
};