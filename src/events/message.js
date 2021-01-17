const { mongo_url } = process.env;
const Levels = require("discord-xp");
const AntiSpam = require("discord-anti-spam");

const antiSpam = new AntiSpam({
    warnThreshold: 3,
    kickThreshold: 7,
    banThreshold: 7,
    maxInterval: 2000,
    warnMessage: "{@user}, Please stop spamming.",
    kickMessage: "**{user_tag}** has been kicked for spamming.",
    banMessage: "**{user_tag}** has been banned for spamming.",
    maxDuplicatesWarning: 7,
    maxDuplicatesKick: 10,
    maxDuplicatesBan: 12,
    exemptPermissions: ["ADMINISTRATOR"],
    ignoreBots: true,
    verbose: true,
    ignoredUsers: []
});

const createEmbed = require("@utils/CreateEmbed");
Levels.setURL(mongo_url);

const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;

module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;

    antiSpam.message(message);

    if (regex.test(message.content) && client.serverSettings.get(message.guild.id).NoInvites && message.deletable) {
        await message.delete();

        let translations = await client.getServerLocale(message.guild).COMMANDS.MODERATION;

        let embed = await createEmbed({
            title: `${client.user.username}: ${translations.TITLE}`,
            description: "No invites!"
        });

        return message.say(embed);
    };

    try {
        let randomXp = Math.floor(Math.random() * 9) + 1;
        let hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);

        if (hasLeveledUp) {
            let user = await Levels.fetch(message.author.id, message.guild.id);
            return message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`).catch(err => {
                console.log("Failed to send level up notification: " + err);
            });
        };
    } catch(err) {
        console.log(`Error appending XP: ${err}`);
    };
};
