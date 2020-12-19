const { bot_name } = process.env;
const createEmbed = require("@utils/CreateEmbed");

module.exports = (client, guild) => {
    let embed = createEmbed({
        title: `${bot_name}: Welcome`,
        description: `Thanks for adding me to ${guild.name}! To get a list of my commands, use !help`
    });

    if (guild.systemChannel && guild.systemChannel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        return guild.systemChannel.send(embed);
    } else {
        let defaultChannel;
        guild.channels.cache.map(channel => {
            if (channel.type == "text" && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                defaultChannel = channel;
                return;
            };
        });

        return defaultChannel.send(embed);
    };
};