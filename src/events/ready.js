const { mongo_db } = process.env;
const getServerCount = require("@utils/GetServerCount");
const getUserCount = require("@utils/GetUserCount");
const getCollection = require("@utils/GetCollection");

module.exports = async client => {
    if (client.shard.ids[0] === 0) {
        console.clear();
        console.log("Logged into bot account.");
        client.user.setActivity(`with ${await getServerCount(client)} servers and ${await getUserCount(client)} users`, {
            type: "PLAYING"
        });

        setInterval(async () => {
            client.user.setActivity(`with ${await getServerCount(client)} servers and ${await getUserCount(client)} users`, {
                type: "PLAYING"
            });
        }, 600000);

        console.log("Set status.");

        let guilds = await client.shard.broadcastEval("this.guilds.cache");

        guilds.forEach(element => {
            element.forEach(guild => {
                getCollection(mongo_db, "Auto Moderation", async function(collection, _client) {
                    let guildData = await collection.findOne({ GuildID: guild.id });

                    if (guildData) {
                        client.serverSettings.set(guild.id, { invitesBlocked: guildData.NoInvites });
                    } else {
                        client.serverSettings.set(guild.id, { invitesBlocked: false });
                    };

                    return _client.close();
                });
            });
        });
    };
};