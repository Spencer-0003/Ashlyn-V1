const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stop",
            group: "music",
            memberName: "stop",
            description: "Stops the current song from playing.",
        });
    };

    run(message) {
        let queue = this.client.queue;
        let serverQueue = queue.get(message.guild.id);
        let voiceChannel = message.member.voice.channel;

        if (!serverQueue) {
            let embed = createEmbed({
                title: "Ashlyn: Music",
                description: "No music is currently playing."
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

        serverQueue.songs = [];

        if (serverQueue.connection.dispatcher) serverQueue.connection.dispatcher.end();

        let embed = createEmbed({
            title: "Ashlyn: Music",
            description: "I have stopped the music."
        });

        return message.embed(embed);
    };
};