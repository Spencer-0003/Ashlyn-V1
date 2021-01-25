const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: "queue",
            aliases: ["q"],
            group: "music",
            memberName: "queue",
            description: "Shows the queue list.",
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

        let embed = createEmbed({
            title: embedTitle
        });

        serverQueue.songs.forEarch(song => {
            embed.addField(song.title, `Requested by ${song.requestedBy}.`);
        });

        return message.say(embed);
    };
};