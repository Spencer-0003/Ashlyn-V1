const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const canModifyQueue = require("@utils/CanModifyQueue");

module.exports = class EarRapeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "earrape",
            aliases: ["order66"],
            group: "music",
            memberName: "earrape",
            description: "Changes the volume of the bot.",
            hidden: true,
            ownerOnly: true,
            guildOnly: true
        });
    };

    run(message) {
        let queue = this.client.queue;
        let serverQueue = queue.get(message.guild.id);
        if (!serverQueue) {
            let embed = createEmbed({
                title: `${message.client.user.username}: Music`,
                description: "No music is currently playing."
            });

            return message.embed(embed);
        };
        if (!canModifyQueue(message.member)) return;

        serverQueue.volume = 100;
        serverQueue.connection.dispatcher.setVolumeLogarithmic(100 / 5);

        let embed = createEmbed({
            title: `${message.client.user.username}: Music`,
            description: "Done."
        });

        return message.embed(embed);
    };
};
