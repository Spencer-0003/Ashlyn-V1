const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const { canModifyQueue } = require("@utils/canModifyQueue");

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
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MUSIC;
        let embedTitle = `${message.client.user.username}: ${translations.TITLE}`;

        let queue = this.client.queue;
        let serverQueue = queue.get(message.guild.id);
        if (!canModifyQueue(message.member)) return;

        if (!serverQueue) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NO_SONG
            });

            return message.embed(embed);
        };


        serverQueue.songs = [];

        if (serverQueue.connection.dispatcher) serverQueue.connection.dispatcher.end();

        let embed = createEmbed({
            title: embedTitle,
            description: translations.STOPPED
        });

        return message.embed(embed);
    };
};
