const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class EarRapeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "earrape",
            aliases: ["order66"],
            group: "music",
            memberName: "earrape",
            description: "Changes the volume of the bot.",
            hidden: true,
            ownerOnly: true
        });
    };

    run(message) {
        let queue = this.client.queue;
        let serverQueue = queue.get(message.guild.id);
        let voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            let embed = createEmbed({
                title: "Ashlyn: Music",
                description: "You need to be in a voice channel."
            });

            return message.embed(embed);
        };

        if (!serverQueue) {
            let embed = createEmbed({
                title: "Ashlyn: Music",
                description: "No music is currently playing."
            });

            return message.embed(embed);
        };

        serverQueue.volume = 100;
        serverQueue.connection.dispatcher.setVolumeLogarithmic(100 / 5);

        let embed = createEmbed({
            title: "Ashlyn: Music",
            description: "Done."
        });

        return message.embed(embed);
    };
};