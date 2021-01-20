const { bot_name, error_log_channel } = process.env;
const createEmbed = require("@utils/CreateEmbed");

module.exports = (client, type, err, extra) => {
    let embed = createEmbed({
        title: `${bot_name}: Error`,
        message: [{ name: type, value: `\`\`\`\n${err}\`\`\`` }]
    });

    if (extra && type == "commandError") {
        embed.addField("Command Name", extra.info.name);
    };

    if (extra && type == "unhandledRejection") {
        embed.addField("Promise", `\`\`\`\n${extra}\`\`\``);
    };

    if (type == "unhandledRejection") {
        embed.addField("Stack", err.stack);
    };

    client.channels.fetch(error_log_channel).then(channel => {
        channel.send(embed);
    });
};