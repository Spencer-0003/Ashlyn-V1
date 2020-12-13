const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: "queue",
            aliases: ["q"],
            group: "music",
            memberName: "queue",
            description: "Shows the queue list.",
        });
    };

    run(message) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MUSIC;
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

        return message.say(`__**Queue**__\n${serverQueue.songs.map(song => song.title).join("\n")}`);
    };
};