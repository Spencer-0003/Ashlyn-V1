const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: "mute",
            group: "moderation",
            memberName: "mute",
            description: "Mute the chosen user",
            userPermissions: ["MUTE_MEMBERS"],
            clientPermissions: ["MUTE_MEMBERS"],
            guildOnly: true,
            args: [
                {
                    key: "user",
                    prompt: "Who would you like to mute?",
                    type: "user"
                },
                {
                    key: "muteDuration",
                    prompt: "How long do you want to mute them for? (seconds)",
                    type: "integer"
                },
                {
                    key: "muteReason",
                    prompt: "Why do you want to mute them?",
                    type: "string",
                    default: ""
                }
            ],
        });
    };

    async run(message, { user, muteDuration, muteReason }) {
        let embed = createEmbed({
            title: "Ashlyn: Moderation",
            description: `You have been muted in ${message.guild.name} for "${muteReason}"`,
            message: [{ name: "Moderator", value: `<@${message.author.id}>` }]
        });

        let muteRole = message.guild.roles.cache.find(role => role.name === "Muted");

        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: "Muted",
                    color: "grey",
                    permissions: 0
                }
            });

            message.guild.channels.cache.forEach(async channel => {
                await channel.createOverwrite(muteRole.id, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SPEAK: false,
                    CONNECT: false
                });
            });
        };

        if (user === message.author) {
            let errorEmbed = createEmbed({
                title: "Ashlyn: Moderation",
                description: `You can't mute yourself.`,
            });

            return message.say(errorEmbed);
        };

        if (message.guild.member(user).roles.cache.has(muteRole)) {
            let errorEmbed = createEmbed({
                title: "Ashlyn: Moderation",
                description: "This user is already muted.",
            });

            return message.say(errorEmbed);
        };

        message.guild.member(user).roles.add(muteRole);

        try {
            await user.send(embed);
        } catch {
            message.say("Failed to DM this user.");
        };

        setTimeout(() => {
            let unmuteEmbed = createEmbed({
                title: "Ashlyn: Moderation",
                description: `You have been unmuted in ${message.guild.name}`,
                message: [{ name: "Moderator", value: `<@${message.author.id}>` }]
            });

            if (message.guild.member(user).roles.has(muteRole)) {
                message.guild.member(user).roles.remove(muteRole);
                try {
                    user.send(unmuteEmbed);
                } catch {
                    message.say("Failed to DM this user.");
                };
            };
        }, muteDuration * 1000);

        return null;
    };
};