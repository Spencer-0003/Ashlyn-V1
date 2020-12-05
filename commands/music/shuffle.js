const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class ShuffleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "shuffle",
            group: "music",
            memberName: "shuffle",
            description: "Sets looping for the current guild.",
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

        let songs = serverQueue.songs;
        for (let i = songs.length - 1; i > 1; i--) {
            let a = 1 + Math.floor(Math.random() * i);
            [songs[i], songs[a]] = [songs[a], songs[i]];
        };

        serverQueue.songs = songs;
        this.client.queue.set(message.guild.id, serverQueue);

        let embed = createEmbed({
            title: "Ashlyn: Music",
            description: "I have shuffled the queue."
        });

        return message.embed(embed);
    };
};