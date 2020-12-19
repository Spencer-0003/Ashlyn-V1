const { bot_name } = process.env;
const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const createBar = require("string-progressbar");

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
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MUSIC;
        let embedTitle = `${bot_name}: ${translations.TITLE}`;

        let queue = this.client.queue;
        let serverQueue = queue.get(message.guild.id);
        const song = queue.songs[0];
        const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
        const left = song.duration - seek;

        if (!serverQueue) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NO_SONG
            });

            return message.embed(embed);
        };
    
        let embed = createEmbed({
            title: embedTitle,
            description: `[${song.title}](${song.url})`
            message: [{ name: "\u200b",
        new Date(seek * 1000).toISOString().substr(11, 8) +
          "[" +
          createBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
          "]" +
          (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8), value: null, inline: false }]
        });

        return message.embed(embed);
    };
};
