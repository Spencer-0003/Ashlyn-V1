const { mongo_url, bot_name } = process.env;
const Levels = require("discord-xp");
const createEmbed = require("@utils/CreateEmbed");
Levels.setURL(mongo_url);

const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;

module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;

    let translations = await client.getServerLocale(message.guild).COMMANDS.MODERATION;

    if (regex.exec(message.content) && client.serverSettings.get(message.guild.id).invitesBlocked && message.deletable) {
        try {
            await message.delete();

            let embed = createEmbed({
                title: `${bot_name}: ${translations.TITLE}`,
                description: "No invites!"
            });

            return message.say(embed);
        } catch(err) {
            message.channel.send("Thats why i can't delete this invite : " + err);
        }
    };

    let randomXp = Math.floor(Math.random() * 9) + 1;
    let hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);

    if (hasLeveledUp) {
        let user = await Levels.fetch(message.author.id, message.guild.id);
        return message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
    };
};
