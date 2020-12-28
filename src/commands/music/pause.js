const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const { canModifyQueue } = require("@utils/canModifyQueue");

module.exports = class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pause",
            group: "music",
            memberName: "pause",
            description: "Pauses the chosen song.",
        });
    };

    run(message) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MUSIC;
        let embedTitle = `${message.client.user.username}: ${translations.TITLE}`;

        let queue = this.client.queue;
        let serverQueue = queue.get(message.guild.id);
        if (!canModifyQueue(message.member)) return;

        if (!serverQueue) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.SONG_NOT_PLAYING
            });

            return message.embed(embed);
        };

        if (!serverQueue.playing) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.ALREADY_PAUSED
            });

            return message.embed(embed);
        };

        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();

        let embed = createEmbed({
            title: embedTitle,
            description: translations.SUCCESSFULLY_PAUSED
        });

        return message.embed(embed);
    };
};
