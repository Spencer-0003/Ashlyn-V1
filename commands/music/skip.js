const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");

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

        serverQueue.connection.dispatcher.end();

        let embed = createEmbed({
            title: "Ashlyn: Music",
            description: "Song skipped."
        });

        return message.embed(embed);
    };
};