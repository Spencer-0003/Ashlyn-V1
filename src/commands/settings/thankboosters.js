const { mongo_db } = process.env;
const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const getCollection = require("@utils/GetCollection");

module.exports = class ThankBoostersCommand extends Command {
    constructor(client) {
        super(client, {
            name: "thankboosters",
            group: "settings",
            memberName: "thankboosters",
            guildOnly: true,
            description: "Allows you to auto thank boosters.",
            args: [
                {
                    key: "value",
                    prompt: "True or false?",
                    type: "string",
                    oneOf: ["true", "false"],
                }
            ]
        });
    };

    async run(message, { value }) {
        value = Boolean(value);
        let translations = this.client.getServerLocale(message.guild.id).COMMANDS.MODERATION;

        if(!message.member.hasPermission("ADMINISTRATOR") && !this.client.isOwner(message.author)) {
            return message.reply(translations.GLOBAL.ADMIN_ONLY);
        };

        getCollection(mongo_db, "Guild Settings", async function(collection, client) {
            let guildData = await collection.findOne({ GuildID: message.guild.id });

            await collection.updateOne(guildData, { $set: { ThankBoosters: value } });

            return client.close();
        });

        this.client.serverSettings.set(message.guild.id, { ThankBoosters: value });

        let embed = createEmbed({
            title: `${message.client.user.username}: ${translations.TITLE}`,
            description: `Thank boosters has been set to: ${value.toString()}`
        });

        return message.say(embed).catch(console.error);
    };
};