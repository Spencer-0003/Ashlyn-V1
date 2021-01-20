module.exports = member => {
    let { channelID } = member.voice;
    let botChannel = member.guild.voice.channelID;

    if (channelID !== botChannel) {
        member.send("You need to join the voice channel first!").catch(console.error);
        return false;
    };

    return true;
};
