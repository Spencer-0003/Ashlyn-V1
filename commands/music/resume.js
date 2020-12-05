const { Command } = require("discord.js-commando");
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
        let queue = this.client.queue;
        let serverQueue = queue.get(message.guild.id);
        let voiceChannel = message.member.voice.channel;

        if (!serverQueue) {
            let embed = createEmbed({
                title: "Ashlyn: Music",
                description: "No song is currently playing."
            });

            return message.embed(embed);
        };

        if (voiceChannel !== serverQueue.voiceChannel) {
            let embed = createEmbed({
                title: "Ashlyn: Music",
                description: "You are not in the voice channel."
            });

            return message.embed(embed);
        };

        if (serverQueue.playing) {
            let embed = createEmbed({
                title: "Ashlyn: Music",
                description: "Music is already playing."
            });

            return message.embed(embed);
        };

        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();

        let embed = createEmbed({
            title: "Ashlyn: Music",
            description: "Music has been resumed."
        });

        return message.embed(embed);
    };
};