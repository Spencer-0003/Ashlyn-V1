const Levels = require("discord-xp");

module.exports = (_client, member) => {
    if (member.bot) return;

    Levels.deleteUser(member.id, member.guild.id);
};