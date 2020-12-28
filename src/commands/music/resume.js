const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const { canModifyQueue } = require("@utils/canModifyQueue");

module.exports = class ResumeComamnd extends Command {
    constructor(client) {
        super(client, {
            name: "resume",
            group: "music",
            memberName: "resume",
            description: "Resumes the chosen song.",
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

        if (serverQueue.playing) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.ALREADY_PLAYING
            });

            return message.embed(embed);
        };

        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();

        let embed = createEmbed({
            title: embedTitle,
            description: translations.SUCCESSFULLY_RESUMED
        });

        return message.embed(embed);
    };
};
