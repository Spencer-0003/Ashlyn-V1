const createEmbed = require("@utils/CreateEmbed");

module.exports = guild => {
    let defaultChannel;
    guild.channels.forEach((channel) => {
        if (channel.type == "text" && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
            defaultChannel = channel;
            return;
        };
    });

    let embed = createEmbed({
        title: "Ashlyn: Welcome",
        description: `Thanks for adding me to ${guild.name}! To get a list of my commands, use !help`
    });

    return defaultChannel.send(embed);
};