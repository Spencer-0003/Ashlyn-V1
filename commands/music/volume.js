const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class VolumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "volume",
            aliases: ["vol"],
            group: "music",
            memberName: "volume",
            description: "Changes the volume of the bot.",
            args: [
                {
                    key: "vol",
                    prompt: "What do you want to set the volume to?",
                    type: "integer",
                }
            ]
        });
    };

    run(message, { vol }) {
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

        serverQueue.volume = vol;
        serverQueue.connection.dispatcher.setVolumeLogarithmic(vol / 5);

        let embed = createEmbed({
            title: "Ashlyn: Music",
            description: `I have set the volume ${vol}.`
        });

        return message.embed(embed);
    };
};