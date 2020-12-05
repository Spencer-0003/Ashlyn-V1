module.exports = async client => {
    let req = await client.shard.fetchClientValues("guilds.size");

    return req.reduce((p, n) => p + n, 0);
};