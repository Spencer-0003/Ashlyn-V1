const createEmbed = require("@utils/CreateEmbed");

module.exports = (client, member) => {
    if (!client.serverSettings.get(member.guild.id) || !client.serverSettings.get(member.guild.id).ThankBoosters) return;

    let embed = createEmbed({
        title: `${client.user.username}: Boost`,
        description: `Thanks for boosting ${member.guild.name}!`
    });

    member.send(embed).catch(err => {
        console.error(`Failed to thank booster: ${member.user.username}\nError: ${err}`);
    });
};