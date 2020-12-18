module.exports = async client => {
    // let total = 0;
    let guilds = await client.shard.broadcastEval("guilds");
    console.log(guilds);
    // guilds.forEach(element => {
    //     console.log("NAME: " + element.name);
    //     console.log("MEMBERS: " + element.memberCount);
    // });
    let req = await client.shard.fetchClientValues("users.cache.size");

    // shard.broadcastEval("this.guilds.map(u => u.id)").then(result => {
    //     for (var i = 0; i<result.length; i++){
    //         console.log(result[i]);
    //     }
    // });

    return req.reduce((p, n) => p + n, 0);
};