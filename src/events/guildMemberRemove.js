// Will be updated in the future, this is just a placeholder.

module.exports = (client, member) => {
    if (member.bot) return;

    console.log(`${member.user.tag} has left ${member.guild.name}`);
};