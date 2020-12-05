const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");

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
        let queue = this.client.queue;
        let serverQueue = queue.get(message.guild.id);
        let voiceChannel = message.member.voice.channel;

        if (!serverQueue) {
            let embed = createEmbed({
                title: "Ashlyn: Music",
                description: "No music is currently playing."
            });

            return message.embed(embed);
        };

        if (voiceChannel !== serverQueue.voiceChannel) {
            let embed = createEmbed({
                title: "Ashlyn: Music",
                description: "You are not in the voice channel."
            });

            return message.embed(embed);
        };

        serverQueue.loop = !serverQueue.loop;

        let embed = createEmbed({
            title: "Ashlyn: Music",
            description: `I have ${serverQueue.loop ? "enabled" : "disabled"} looping.`
        });

        return message.embed(embed);
    };
};