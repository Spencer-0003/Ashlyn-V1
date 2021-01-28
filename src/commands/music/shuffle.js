const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const canModifyQueue = require("@utils/CanModifyQueue");

module.exports = class ShuffleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "shuffle",
            group: "music",
            memberName: "shuffle",
            description: "Sets looping for the current guild.",
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

        let songs = serverQueue.songs;
        for (let i = songs.length - 1; i > 1; i--) {
            let a = 1 + Math.floor(Math.random() * i);
            [songs[i], songs[a]] = [songs[a], songs[i]];
        };

        serverQueue.songs = songs;
        this.client.queue.set(message.guild.id, serverQueue);

        let embed = createEmbed({
            title: embedTitle,
            description: translations.SHUFFLED
        });

        return message.embed(embed);
    };
};
