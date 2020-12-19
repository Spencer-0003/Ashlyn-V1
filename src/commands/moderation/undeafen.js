const { bot_name} = process.env;
const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class UndeafenCommand extends Command {
    constructor(client) {
        super(client, {
            name: "undeafen",
            group: "moderation",
            memberName: "undeafen",
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
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MODERATION;
        let embedTitle = `${bot_name}: ${translations.TITLE}`;

        if (user === message.author) {
            let errorEmbed = createEmbed({
                title: embedTitle,
                description: translations.SELF_DEAFEN,
            });

            return message.say(errorEmbed);
        };

        if (!message.guild.member(user).serverDeaf) {
            let errorEmbed = createEmbed({
                title: embedTitle,
                description: translations.NOT_DEAFENED,
            });

            return message.say(errorEmbed);
        };

        user.setDeaf(false);

        let embed = createEmbed({
            title: embedTitle,
            description: translations.SUCCESSFULLY_UNDEAFENED.format(user)
        });

        return message.say(embed);
    };
};