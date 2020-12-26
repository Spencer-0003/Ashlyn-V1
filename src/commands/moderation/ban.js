const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            group: "moderation",
            memberName: "ban",
            description: "Bans the chosen user",
            userPermissions: ["BAN_MEMBERS"],
            clientPermissions: ["BAN_MEMBERS"],
            guildOnly: true,
            args: [
                {
                    key: "user",
                    prompt: "Who would you like to ban?",
                    type: "user"
                },
                {
                    key: "banReason",
                    prompt: "Why do you want to ban them?",
                    type: "string",
                },
            ],
        });
    };

    async run(message, { user, banReason }) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MODERATION;
        let embedTitle = `${message.client.user.username}: ${translations.TITLE}`;

        let embed = createEmbed({
            title: embedTitle,
            description: translations.DM_BAN_MESSAGE.format(message.guild.name, banReason),
            message: [{ name: translations.MODERATOR, value: `<@${message.author.id}>` }]
        });

        if (user === message.author) {
            let errorEmbed = createEmbed({
                title: embedTitle,
                description: translations.SELF_BAN,
            });

            return message.say(errorEmbed);
        };

        await user.send(embed).catch(() => {
            console.log(translations.DM_FAIL);
        });

        message.guild.member(user).ban({
            reason: banReason
        });

        let banEmbed = createEmbed({
            title: embedTitle,
            description: translations.BAN_MESSAGE.format(user, banReason),
            message: [{ name: translations.MODERATOR, value: `<@${message.author.id}>` }]
        });

        return message.embed(banEmbed);
    };
};