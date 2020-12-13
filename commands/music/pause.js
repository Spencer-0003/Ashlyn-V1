const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getServerLocale = require("@utils/GetServerLocale");

module.exports = class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pause",
            group: "music",
            memberName: "pause",
            description: "Pauses the chosen song.",
        });
    };

    run(message) {
        let translations = getServerLocale(message.guild).COMMANDS.MUSIC;
        let embedTitle = `Ashlyn: ${translations.TITLE}`;

        let queue = this.client.queue;
        let serverQueue = queue.get(message.guild.id);
        let voiceChannel = message.member.voice.channel;

        if (!serverQueue) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.SONG_NOT_PLAYING
            });

            return message.embed(embed);
        };

        if (voiceChannel !== serverQueue.voiceChannel) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NOT_IN_VOICE
            });

            return message.embed(embed);
        };

        if (!serverQueue.playing) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.ALREADY_PAUSED
            });

            return message.embed(embed);
        };

        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();

        let embed = createEmbed({
            title: embedTitle,
            description: translations.SUCCESSFULLY_PAUSED
        });

        return message.embed(embed);
    };
};