const { mongo_url } = process.env;
const Levels = require("discord-xp");
Levels.setURL(mongo_url);

module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;

    let randomXp = Math.floor(Math.random() * 9) + 1;
    let hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);

    if (hasLeveledUp) {
        let user = await Levels.fetch(message.author.id, message.guild.id);
        return message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
    };
};