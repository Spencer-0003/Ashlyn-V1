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
        let rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

        if (rawLeaderboard.length < 1) {
            let embed = createEmbed({
                title: "Ashlyn: Leaderboard",
                description: "Leaderboard is empty."
            });

            return message.channel.embed(embed);
        };

        let leaderboard = await Levels.computeLeaderboard(this.client, rawLeaderboard, true);
        let embed = createEmbed({
            title: "Ashlyn: Leaderboard",
            description: `Top 10 users in ${message.guild.name}`
        });

        leaderboard.map(e => {
            embed.addField(`${e.position} - ${e.username}`, `Level: ${e.level}  XP: ${e.xp.toLocaleString()}`);
        });

        // return message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
        return message.say(embed);
    };
};