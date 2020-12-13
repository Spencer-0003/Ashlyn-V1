const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getServerLocale = require("@utils/GetServerLocale");

module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: "skip",
            aliases: ["s"],
            group: "music",
            memberName: "skip",
            description: "Skips the current song.",
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
                description: translations.NO_SONG
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

        serverQueue.connection.dispatcher.end();

        let embed = createEmbed({
            title: embedTitle,
            description: translations.SKIPPED
        });

        return message.embed(embed);
    };
};