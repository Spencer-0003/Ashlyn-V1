const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getServerLocale = require("@utils/GetServerLocale");

module.exports = class PlayingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "playing",
            aliases: ["np"],
            group: "music",
            memberName: "playing",
            description: "Tells you what song is playing."
        });
    };

    run(message) {
        let translations = getServerLocale(message.guild).COMMANDS.MUSIC;
        let embedTitle = `Ashlyn: ${translations.TITLE}`;

        let queue = this.client.queue;
        let serverQueue = queue.get(message.guild.id);

        if (!serverQueue) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NO_SONG
            });

            return message.embed(embed);
        };

        let embed = createEmbed({
            title: embedTitle,
            description: `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`
        });

        return message.embed(embed);
    };
};