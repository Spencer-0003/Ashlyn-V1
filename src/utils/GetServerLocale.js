module.exports = guild => {
    if (!guild) {
        return require("@locales/english");
    };

    return require(`@locales/${guild.locale || "english"}`);
};