const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class UnbanCommand extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            group: "moderation",
            memberName: "unban",
            description: "Unbans the chosen user",
            userPermissions: ["BAN_MEMBERS"],
            clientPermissions: ["BAN_MEMBERS"],
            guildOnly: true,
            args: [
                {
                    key: "userId",
                    prompt: "Who would you like to unban?",
                    type: "string"
                }
            ],
        });
    };

    async run(message, { userId }) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MODERATION;
        let embedTitle = `Ashlyn: ${translations.TITLE}`;

        let bans = await message.guild.fetchBans();
        let isBanned = bans.find(banned => banned.user.id === userId);

        if (!isBanned) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NOT_BANNED
            });

            return message.embed(embed);
        };

        message.guild.members.unban(userId).then(() => {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.UNBAN_MESSAGE.format(userId)
            });

            return message.embed(embed);
        });
    };
};