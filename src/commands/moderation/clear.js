const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class ClearCommand extends Command {
    constructor(client) {
        super(client, {
            name: "clear",
            aliases: ["purge"],
            group: "moderation",
            memberName: "clear",
            description: "Clears the chosen amount of messages.",
            userPermissions: ["MANAGE_MESSAGES"],
            clientPermissions: ["MANAGE_MESSAGES"],
            guildOnly: true,
            args: [
                {
                    key: "amount",
                    prompt: "How many messages would you like to delete?",
                    type: "integer"
                },
            ],
        });
    };

    run(message, { amount }) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MODERATION;
        let embedTitle = `Ashlyn: ${translations.TITLE}`;

        amount++;
        if (amount <= 1 || amount > 100) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.INVALID_AMOUNT
            });

            return message.embed(embed);
        };

        message.channel.bulkDelete(amount).then(() => {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.CLEARED_MESSAGES.format((amount - 1).toString())
            });

            return message.embed(embed);
        });
    };
};