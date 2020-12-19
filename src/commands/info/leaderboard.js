const { bot_name } = process.env;
const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const Levels = require("discord-xp");

module.exports = class LeaderboardCommand extends Command {
    constructor(client) {
        super(client, {
            name: "leaderboard",
            group: "info",
            memberName: "leaderboard",
            description: "Shows you the rank leaderboard.",
            guildOnly: true
        });
    };

    async run(message) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.LEADERBOARD;
        let embedTitle = `${bot_name}: ${translations.TITLE}`;

        let rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

        if (rawLeaderboard.length < 1) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.EMPTY_LEADERBOARD
            });

            return message.channel.embed(embed);
        };

        let leaderboard = await Levels.computeLeaderboard(this.client, rawLeaderboard, true);
        let embed = createEmbed({
            title: embedTitle,
            description: `${translations.TOP_1O_USERS} ${message.guild.name}`
        });

        leaderboard.map(e => {
            embed.addField(`${e.position} - ${e.username}`, `Level: ${e.level}  XP: ${e.xp.toLocaleString()}`);
        });

        return message.say(embed);
    };
};