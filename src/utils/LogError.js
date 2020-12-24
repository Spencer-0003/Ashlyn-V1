const { error_log_channel } = process.env;
const createEmbed = require("@utils/CreateEmbed");

module.exports = (client, type, err) => {
    let embed = createEmbed({
        title: `${client.user.username}: Error`,
        message: [{ name: type, value: `\`\`\`\n${err}\`\`\`` }]
    });

    client.channels.fetch(error_log_channel).then(channel => {
        channel.send(embed);
    });
};