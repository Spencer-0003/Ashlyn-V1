const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");
const getServerLocale = require("@utils/GetServerLocale");

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

        serverQueue.volume = vol;
        serverQueue.connection.dispatcher.setVolumeLogarithmic(vol / 5);

        let embed = createEmbed({
            title: "Ashlyn: Music",
            description: `${translations.SET_VOLUME} ${vol}.`
        });

        return message.embed(embed);
    };
};