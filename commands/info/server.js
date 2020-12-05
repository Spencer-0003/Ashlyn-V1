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
        if (!message.guild.members.cache.has(message.guild.ownerID)) await message.guild.members.fetch(message.guild.ownerID);

        let embed = createEmbed({
            title: message.guild.name,
            thumbnail: message.guild.iconURL(),
            message: [{ name: "ID", value: message.guild.id, inline: true }, { name: "Created", value: moment.utc(message.guild.createdAt).format("MM/DD/YYYY h:mm A"), inline: true }, { name: "Owner", value: message.guild.owner }, { name: "Boosts", value: message.guild.premiumSubscriptionCount || 0, inline: true }, { name: "Boost Tier", value: message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : "None", inline: true }, { name: "Region", value: message.guild.region, inline: true }, { name: "Explicit Filter", value: filterLevels[message.guild.explicitContentFilter], inline: true }, { name: "Verification Level", value: verificationLevels[message.guild.verificationLevel], inline: true }, { name: "Members", value: message.guild.memberCount, inline: true }]
        });

        return message.embed(embed);
    };
};