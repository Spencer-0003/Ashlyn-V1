const { mongo_url, mongo_db } = process.env;
const Levels = require("discord-xp");
const createEmbed = require("@utils/CreateEmbed");
const getCollection = require("@utils/GetCollection");
Levels.setURL(mongo_url);

function isAdvertisement(guild, invite) {
    guild.fetchInvites().then(invites => {
        for (let v of invites) {
            if (invite === v[0]) {
                return false;
            };
        };

        return true;
    });
};

module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;
    if (message.partial) await message.fetch();

    if (message.content.includes("discord.gg/")) {
        getCollection(mongo_db, "Auto Moderation", async function(collection, _client) {
            let guildData = await collection.findOne({ GuildID: message.guild.id });

            if (guildData && guildData.NoInvites) {
                if (isAdvertisement(message.guild, message.content.split("discord.gg/")[1])) {
                    try {
                        message.delete();
                    } catch {
                        message.say("Failed to delete message.");
                    };

                    let embed = createEmbed({
                        title: "Ashlyn: Moderation",
                        description: "No outside invites!"
                    });

                    message.say(embed);
                };
            };

            return _client.close();
        });
    };

    let randomXp = Math.floor(Math.random() * 9) + 1;
    let hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);

    if (hasLeveledUp) {
        let user = await Levels.fetch(message.author.id, message.guild.id);
        return message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
    };
};
