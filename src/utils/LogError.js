const { bot_name, error_log_channel } = process.env;
const createEmbed = require("@utils/CreateEmbed");

module.exports = (client, type, err, extra) => {
    let embed = createEmbed({
        title: `${bot_name}: Error`,
        message: [{ name: type, value: `\`\`\`\n${err}\`\`\`` }]
    });

    if (type == "Command Error") {
        embed.addField("Command Name", extra.info.name);
    };

    if (type == "Unhandled Rejection") {
        embed.addField("Promise", `\`\`\`\n${extra}\`\`\``);
    };

    if (type == "Unhandled Rejection" || type == "Client Error") {
        embed.addField("Stack", `\`\`\`\n${err.stack}\`\`\``);
    };

    client.channels.fetch(error_log_channel).then(channel => {
        channel.send(embed);
    });
};