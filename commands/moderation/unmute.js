const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class UnmuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: "unmute",
            group: "moderation",
            memberName: "unmute",
            description: "Unmute the chosen user",
            userPermissions: ["MUTE_MEMBERS"],
            clientPermissions: ["MUTE_MEMBERS"],
            guildOnly: true,
            args: [
                {
                    key: "user",
                    prompt: "Who would you like to unmute?",
                    type: "user"
                },
            ],
        });
    };

    run(message, { user }) {
        let muteRole = message.guild.roles.cache.find(role => role.name === "Muted");

        if (!message.guild.members.cache.get(user.id).roles.cache.has(muteRole.id)) {
            let errorEmbed = createEmbed({
                title: "Ashlyn: Moderation",
                description: "This user is not muted.",
            });

            return message.say(errorEmbed);
        };

        let unmuteEmbed = createEmbed({
            title: "Ashlyn: Moderation",
            description: `You have been unmuted in ${message.guild.name}`,
            message: [{ name: "Moderator", value: `<@${message.author.id}>` }]
        });

        if (message.guild.member(user).roles.cache.has(muteRole.id)) {
            message.guild.member(user).roles.remove(muteRole);
            user.send(unmuteEmbed);
        };
    };
};