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
        amount++;

        if (amount <= 1 || amount > 100) {
            let embed = createEmbed({
                title: "Ashlyn: Moderation",
                description: `Invalid amount of messages`
            });

            return message.embed(embed);
        };

        return message.channel.bulkDelete(amount).then(() => {
            let embed = createEmbed({
                title: "Ashlyn: Moderation",
                description: `Successfully deleted  ${(amount - 1).toString()} messages.`
            });

            message.embed(embed);
        });
    };
};