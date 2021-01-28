const { bot_name, error_log_channel } = process.env;
const createEmbed = require("@utils/CreateEmbed");

module.exports = (client, type, err, extra) => {
    let embed = createEmbed({
        title: `${bot_name}: Error`,
        message: [{ name: type, value: `\`\`\`\n${err}\`\`\`` }]
    });

    if (type == "Command Error") {
        let name = extra.name;
        embed.addField("Command Name", name.charAt(0).toUpperCase() + name.slice(1));
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