// Performance Improving!
module.exports = (client, oldState, newState) => {
    if (newState.channelID === null && oldState.channelID !== null) {
        let voiceChannel = oldState.guild.channels.cache.get(oldState.channelID);
        const botChannel = oldState.guild.me.voice.channel;

        if (voiceChannel === botChannel) {
            if (voiceChannel.members.size === 1) {
                let serverQueue = client.queue.get(oldState.guild.id);
                if (serverQueue) {
                    serverQueue.connection.dispatcher.destroy();
                    voiceChannel.leave();
                    client.queue.delete(oldState.guild.id);
                    serverQueue.textChannel.send("I left the channel because nobody left.");
                    return;
                }
                voiceChannel.leave();
                client.queue.delete(oldState.guild.id);
            }
        }
    }
};
