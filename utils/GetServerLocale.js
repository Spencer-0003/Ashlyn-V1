module.exports = guild => {
    return require(`@locales/${guild.locale || "english"}`);
};