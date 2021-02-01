const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const canModifyQueue = require("@utils/CanModifyQueue");

module.exports = class VolumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "volume",
            aliases: ["vol"],
            group: "music",
            memberName: "volume",
            description: "Changes the volume of the bot.",
            guildOnly: true,
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
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MUSIC;
        let embedTitle = `${message.client.user.username}: ${translations.TITLE}`;

        let queue = this.client.queue;
        let serverQueue = queue.get(message.guild.id);
        if (!serverQueue) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NO_SONG
            });

            return message.embed(embed);
        };

        if (!canModifyQueue(message.member)) return;

        if (serverQueue.connection && serverQueue.connection.dispatcher) {
            serverQueue.volume = vol;
            serverQueue.connection.dispatcher.setVolumeLogarithmic(vol / 5);
        };

        let embed = createEmbed({
            title: embedTitle,
            description: `${translations.SET_VOLUME} ${vol}.`
        });

        return message.embed(embed);
    };
};
