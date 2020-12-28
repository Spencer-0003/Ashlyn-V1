const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const canModifyQueue = require("@utils/CanModifyQueue");

module.exports = class LoopCommand extends Command {
    constructor(client) {
        super(client, {
            name: "loop",
            group: "music",
            memberName: "loop",
            description: "Sets looping for the current guild.",
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
                description: translations.SONG_NOT_PLAYING
            });

            return message.embed(embed);
        };
        if (!canModifyQueue(message.member)) return;

        serverQueue.loop = !serverQueue.loop;

        let embed = createEmbed({
            title: embedTitle,
            description: serverQueue.loop ? translations.ENABLED_LOOPING : translations.DISABLED_LOOPING
        });

        return message.embed(embed);
    };
};
