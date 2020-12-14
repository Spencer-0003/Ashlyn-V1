const getServerCount = require("@utils/GetServerCount");

module.exports = async client => {
    if (client.shard.ids[0] === 0) {
        console.clear();
        console.log("Logged into bot account.");
        client.user.setActivity(`with ${await getServerCount(client)} servers`, {
            type: "PLAYING"
        });

        console.log("Set status.");
    };
};