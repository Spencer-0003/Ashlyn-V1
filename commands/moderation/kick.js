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
                    default: ""
                },
                {
                    key: "kickReason",
                    prompt: "Why do you want to kick them?",
                    type: "string",
                    default: ""
                },
            ],
        });
    };

    async run(message, { user, kickReason }) {
        let embed = createEmbed({
            title: "Ashlyn: Moderation",
            description: `You have been kicked from ${message.guild.name} for "${kickReason}"`,
            message: [{ name: "Moderator", value: `<@${message.author.id}>` }]
        });

        if (user === message.author) {
            let errorEmbed = createEmbed({
                title: "Ashlyn: Moderation",
                description: `You can't kick yourself.`,
            });

            return message.say(errorEmbed);
        };

        try {
            await user.send(embed);
        } catch {
            message.say("Failed to DM this user.");
        };

        let kickEmbed = createEmbed({
            title: "Ashlyn: Moderation",
            description: `I have kicked ${user} for "${kickReason}"`,
            message: [{ name: "Moderator", value: `<@${message.author.id}>` }]
        });

        message.guild.member(user).kick({
            reason: kickReason
        });

        return message.embed(kickEmbed);
    };
};