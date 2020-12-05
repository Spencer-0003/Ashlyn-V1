module.exports = client => {
    if (client.shard.ids[0] === 0) {
        console.clear();
        console.log("Logged into bot account.");
        client.user.setActivity("with !help", {
            type: "PLAYING"
        });

        console.log("Set status.");
    };
};