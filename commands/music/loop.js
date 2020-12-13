const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getServerLocale = require("@utils/GetServerLocale");

module.exports = class LoopCommand extends Command {
    constructor(client) {
        super(client, {
            name: "loop",
            group: "music",
            memberName: "loop",
            description: "Sets looping for the current guild.",
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

        serverQueue.loop = !serverQueue.loop;

        let embed = createEmbed({
            title: embedTitle,
            description: serverQueue.loop ? translations.ENABLED_LOOPING : translations.DISABLED_LOOPING
        });

        return message.embed(embed);
    };
};