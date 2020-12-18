module.exports = async client => {
    let total = 0;
    let guilds = await client.shard.broadcastEval("this.guilds.cache");

    guilds.forEach(element => {
        element.forEach(element2 => {
            total = total + element2.memberCount;
        });
    });

    return total;
};