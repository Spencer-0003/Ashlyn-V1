const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const superagent = require("superagent");

module.exports = class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: "lyrics",
            group: "music",
            memberName: "lyrics",
            description: "Displays the lyrics of the currently playing song.",
        });
    };

    run(message) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MUSIC;
        let embedTitle = `${message.client.user.username}: ${translations.TITLE}`;

        let queue = this.client.queue;
        let serverQueue = queue.get(message.guild.id);

        if (!serverQueue) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NO_SONG
            });

            return message.embed(embed);
        };

        let songTitle = serverQueue.song.title;
        superagent.get(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(songTitle)}`).end((err, response) => {
            if (err) {
                let embed = createEmbed({
                    title: `${message.client.user.username}: Error`,
                    description: err
                });

                return message.embed(embed);
            };

            let embed = createEmbed({
                title: response.body.title,
                description: response.body.lyrics,
                thumbnail: response.body.thumbnail.genius,
                author: response.body.author
            });

            if (embed.description.length >= 2048) {
                embed.description = `${embed.description.substr(0, 2045)}...`;
            };

            return message.embed(embed);
        });
    };
};