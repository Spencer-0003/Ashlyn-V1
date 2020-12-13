const Command = require("@structures/Command");
const moment = require("moment");
const createEmbed = require("@utils/CreateEmbed");

const filterLevels = {
    DISABLED: "Off",
    MEMBERS_WITHOUT_ROLES: "No Role",
    ALL_MEMBERS: "Everyone"
};

const verificationLevels = {
    NONE: "None",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    VERY_HIGH: "Highest"
};

module.exports = class ServerCommand extends Command {
    constructor(client) {
        super(client, {
            name: "server",
            group: "info",
            memberName: "server",
            description: "Responds with detailed information about the server.",
            guildOnly: true
        });
    };

    async run(message) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.SERVER;

        if (!message.guild.members.cache.has(message.guild.ownerID)) await message.guild.members.fetch(message.guild.ownerID);

        let embed = createEmbed({
            title: message.guild.name,
            thumbnail: message.guild.iconURL(),
            message: [{ name: "ID", value: message.guild.id, inline: true }, { name: translations.CREATED, value: moment.utc(message.guild.createdAt).format("MM/DD/YYYY h:mm A"), inline: true }, { name: translations.OWNER, value: message.guild.owner }, { name: translations.BOOSTS, value: message.guild.premiumSubscriptionCount || 0, inline: true }, { name: translations.BOOST_TIER, value: message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : "None", inline: true }, { name: translations.REGION, value: message.guild.region, inline: true }, { name: translations.EXPLICIT_FILTER, value: filterLevels[message.guild.explicitContentFilter], inline: true }, { name: translations.VERIFICATION_LEVEL, value: verificationLevels[message.guild.verificationLevel], inline: true }, { name: translations.MEMBERS, value: message.guild.memberCount, inline: true }]
        });

        return message.embed(embed);
    };
};