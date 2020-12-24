const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const { mongo_url } = process.env;
const Levels = require("discord-xp");
Levels.setURL(mongo_url);

module.exports = class RankCommand extends Command {
    constructor(client) {
        super(client, {
            name: "rank",
            group: "info",
            memberName: "rank",
            description: "Tells you the specified user's rank.",
            guildOnly: true,
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to see the rank of?",
                    type: "user",
                    default: message => message.author
                }
            ]
        });
    };

    async run(message, { user }) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.RANK;
        let embedTitle = `${message.client.user.username}: ${translations.TITLE}`;

        let resolvedUser = await Levels.fetch(user.id, message.guild.id);

        if (!resolvedUser) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NO_XP
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                title: embedTitle,
                description: `<@${user.id}> ${translations.IS_RANK} ${resolvedUser.level}`
            });

            return message.embed(embed);
        };
    };
};