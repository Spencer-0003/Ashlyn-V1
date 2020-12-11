const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class UndeafenCommand extends Command {
    constructor(client) {
        super(client, {
            name: "undeafen",
            group: "moderation",
            description: "Undeafen the chosen user",
            userPermissions: ["DEAFEN_MEMBERS"],
            clientPermissions: ["DEAFEN_MEMBERS"],
            guildOnly: true,
            args: [
                {
                    key: "user",
                    prompt: "Who would you like to undeafen?",
                    type: "user",
                }
            ],
        });
    };

    run(message, { user }) {
        if (user === message.author) {
            let errorEmbed = createEmbed({
                title: "Ashlyn: Moderation",
                description: `You can't deafen yourself.`,
            });

            return message.say(errorEmbed);
        };

        if (!message.guild.member(user).serverDeaf) {
            let errorEmbed = createEmbed({
                title: "Ashlyn: Moderation",
                description: `This user is not deafened.`,
            });

            return message.say(errorEmbed);
        };

        user.setDeaf(false);

        let embed = createEmbed({
            title: "Ashlyn: Moderation",
            description: `I have undeafened <@${user.id}>.`,
        });

        return message.say(embed);
    };
};