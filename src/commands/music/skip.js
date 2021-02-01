const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const canModifyQueue = require("@utils/CanModifyQueue");

module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: "skip",
            aliases: ["s"],
            group: "music",
            memberName: "skip",
            description: "Skips the current song.",
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

        if (serverQueue.connection && serverQueue.connection.dispatcher) {
            let oldLoop = serverQueue.loop;
            serverQueue.loop = false;
            serverQueue.connection.dispatcher.end();
            serverQueue.loop = oldLoop;
        };

        let embed = createEmbed({
            title: embedTitle,
            description: translations.SKIPPED
        });

        return message.embed(embed);
    };
};
