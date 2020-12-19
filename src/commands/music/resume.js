const { bot_name } = process.env;
const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class ResumeComamnd extends Command {
    constructor(client) {
        super(client, {
            name: "resume",
            group: "music",
            memberName: "resume",
            description: "Resumes the chosen song.",
        });
    };

    run(message) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MUSIC;
        let embedTitle = `${bot_name}: ${translations.TITLE}`;

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

        if (serverQueue.playing) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.ALREADY_PLAYING
            });

            return message.embed(embed);
        };

        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();

        let embed = createEmbed({
            title: embedTitle,
            description: translations.SUCCESSFULLY_RESUMED
        });

        return message.embed(embed);
    };
};