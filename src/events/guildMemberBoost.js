const createEmbed = require("@utils/CreateEmbed");

module.exports = (client, member) => {
    // requested by moderator
    if (member.guild.id === "110373943822540800") return;

    let embed = createEmbed({
        title: `${client.user.username}: Boost`,
        description: `Thanks for boosting ${member.guild.name}!`
    });

    member.send(embed).catch(err => {
        console.error(`Failed to thank booster: ${member.user.username}\nError: ${err}`);
    });
};