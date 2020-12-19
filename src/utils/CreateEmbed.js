const { bot_name } = process.env;
const { MessageEmbed } = require("discord.js");

module.exports = options => {
    let embed = new MessageEmbed()
        .setTitle(options.title || "")
        .setColor(0x00B0FF || options.colour)
        .setDescription(options.description || "")
        .setImage(options.image || "")
        .setFooter(options.footer || bot_name)
        .setAuthor(options.author || "")
        .setTimestamp();

    if (options.thumbnail !== false) {
        embed.setThumbnail(options.thumbnail || "https://i.imgur.com/FoezDWf.png");
    };

    if (options.message) {
        options.message.forEach(field => {
            embed.addField(field.name, field.value, field.inline);
        });
    };

    return embed;
};