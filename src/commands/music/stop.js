const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const canModifyQueue = require("@utils/CanModifyQueue");

module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stop",
            group: "music",
            memberName: "stop",
            description: "Stops the current song from playing.",
            guildOnly: true
        });
    };

    run(message) {
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


        serverQueue.songs = [];

        if (serverQueue.connection.dispatcher) serverQueue.connection.dispatcher.end();

        let embed = createEmbed({
            title: embedTitle,
            description: translations.STOPPED
        });

        return message.embed(embed);
    };
};
