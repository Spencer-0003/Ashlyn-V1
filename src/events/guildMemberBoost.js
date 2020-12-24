const createEmbed = require("@utils/CreateEmbed");

module.exports = (client, member) => {
    let embed = createEmbed({
        title: `${client.user.username}: Boost`,
        description: `Thanks for boosting ${member.guild.name}!`
    });

    try {
        member.send(embed);
    } catch(err) {
        console.error(`Failed to thank booster: ${member.user.username}\nError: ${err}`);
    };
};