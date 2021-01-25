const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const fetch = require("node-fetch");

module.exports = class LyricsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "lyrics",
            group: "music",
            memberName: "lyrics",
            description: "Displays the lyrics of the currently playing song.",
        });
    };

    async run(message) {
        // let translations = this.client.getServerLocale(message.guild).COMMANDS.MUSIC;
        // let embedTitle = `${message.client.user.username}: ${translations.TITLE}`;

        // let queue = this.client.queue;
        // let serverQueue = queue.get(message.guild.id);

        // if (!serverQueue) {
        //     let embed = createEmbed({
        //         title: embedTitle,
        //         description: translations.NO_SONG
        //     });

        //     return message.embed(embed);
        // };

        // let songTitle = serverQueue.song.title;

        // let details = await fetch(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(songTitle)}`).json();
        // console.log(details);

        // if (details.error) {
        //     let embed = createEmbed({
        //         title: embedTitle,
        //         description: "Invalid."
        //     });

        //     return message.embed(embed);
        // };

        // let embed = createEmbed({
        //     title: details.title,
        //     // description: details.lyrics,
        //     // thumbnail: details.genius,
        //     // author: details.author
        // });

        // if (embed.description.length >= 2048) {
        //     embed.description = `${embed.description.substr(0, 2045)}...`;
        // };

        // return message.embed(embed);

        return message.channel.send("Lyrics is disabled at the moment.");
    };
};