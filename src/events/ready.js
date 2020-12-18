const getServerCount = require("@utils/GetServerCount");
const getUserCount = require("@utils/GetUserCount");

module.exports = async client => {
    if (client.shard.ids[0] === 0) {
        console.clear();
        console.log("Logged into bot account.");
        client.user.setActivity(`with ${await getServerCount(client)} servers and ${await getUserCount(client)} users`, {
            type: "PLAYING"
        });

        console.log("Set status.");
    };
};