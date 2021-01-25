module.exports = (client, oldState, newState) => {
    if (!newState.channelID && oldState.channelID) {
        let voiceChannel = oldState.guild.channels.cache.get(oldState.channelID);
        let botChannel = oldState.guild.me.voice.channel;

        if (voiceChannel === botChannel && voiceChannel.members.size === 1) {
            let serverQueue = client.queue.get(oldState.guild.id);
            if (serverQueue) {
                serverQueue.connection.dispatcher.destroy();
                voiceChannel.leave();
                client.queue.delete(oldState.guild.id);
            };
        };
    };
};
