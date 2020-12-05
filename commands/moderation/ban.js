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
        let embed = createEmbed({
            title: "Ashlyn: Moderation",
            description: `You have been banned from ${message.guild.name} for "${banReason}"`,
            message: [{ name: "Moderator", value: `<@${message.author.id}>` }]
        });

        if (user === message.author) {
            let errorEmbed = createEmbed({
                title: "Ashlyn: Moderation",
                description: `You can't ban yourself.`,
            });

            return message.say(errorEmbed);
        };

        try {
            await user.send(embed);
        } catch {
            message.say("Failed to DM this user.");
        };

        message.guild.member(user).ban({
            reason: banReason
        });

        let banEmbed = createEmbed({
            title: "Ashlyn: Moderation",
            description: `I have banned ${user} for "${banReason}"`,
            message: [{ name: "Moderator", value: `<@${message.author.id}>` }]
        });

        return message.embed(banEmbed);
    };
};