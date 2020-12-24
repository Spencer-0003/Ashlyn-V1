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
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MODERATION;
        let embedTitle = `${message.client.user.username}: ${translations.TITLE}`;

        let muteRole = message.guild.roles.cache.find(role => role.name === "Muted");

        if (!message.guild.members.cache.get(user.id).roles.cache.has(muteRole.id)) {
            let errorEmbed = createEmbed({
                title: embedTitle,
                description: "This user is not muted.",
            });

            return message.say(errorEmbed);
        };

        let unmuteEmbed = createEmbed({
            title: embedTitle,
            description: translations.DM_UNMUTE_MESSAGE.format(message.guild.name),
            message: [{ name: translations.MODERATOR, value: `<@${message.author.id}>` }]
        });

        if (message.guild.member(user).roles.cache.has(muteRole.id)) {
            message.guild.member(user).roles.remove(muteRole);
            user.send(unmuteEmbed);
        };
    };
};