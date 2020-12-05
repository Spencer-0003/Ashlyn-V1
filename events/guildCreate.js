const createEmbed = require("@utils/CreateEmbed");

module.exports = guild => {
    let embed = createEmbed({
        title: "Ashlyn: Welcome",
        description: `Thanks for adding me to ${guild.name}! To get a list of my commands, use !help`
    });

    if (guild.systemChannel && guild.systemChannel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        return guild.systemChannel.send(embed);
    } else {
        let defaultChannel;
        guild.channels.forEach((channel) => {
            if (channel.type == "text" && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                defaultChannel = channel;
                return;
            };
        });

        return defaultChannel.send(embed);
    };
};