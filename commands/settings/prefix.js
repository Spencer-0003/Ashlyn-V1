// Edited version of the default help command.

const { oneLine } = require("common-tags");
const Command = require("@structures/Command");

module.exports = class PrefixCommand extends Command {
    constructor(client) {
        super(client, {
            name: "prefix",
            group: "settings",
            memberName: "prefix",
            description: "Shows or sets the command prefix.",
            format: "[prefix/\"default\"/\"none\"]",
            details: oneLine`
				If no prefix is provided, the current prefix will be shown.
				If the prefix is "default", the prefix will be reset to the bot's default prefix.
				If the prefix is "none", the prefix will be removed entirely, only allowing mentions to run commands.
				Only administrators may change the prefix.
			`,
            examples: ["prefix", "prefix -", "prefix omg!", "prefix default", "prefix none"],

            args: [
                {
                    key: "prefix",
                    prompt: "What would you like to set the bot's prefix to?",
                    type: "string",
                    max: 15,
                }
            ]
        });
    };

    async run(message, args) {
        let translations = this.client.getServerLocale(message.guild.id);

        if(!args.prefix) {
            let prefix = message.guild ? message.guild.commandPrefix : this.client.commandPrefix;
            return message.reply(translations.COMMANDS.HELP.PREFIX_MESSAGE.format(prefix));
        };

        // Check the user's permission before changing anything
        if(message.guild) {
            if(!message.member.hasPermission("ADMINISTRATOR") && !this.client.isOwner(message.author)) {
                return message.reply(translations.GLOBAL.ADMIN_ONLY);
            }
        } else if(!this.client.isOwner(message.author)) {
            return message.reply(translations.GLOBAL.OWNER_ONLY);
        }

        // Save the prefix
        const prefix = args.prefix;
        if(message.guild) message.guild.commandPrefix = prefix; else this.client.commandPrefix = prefix;

        await message.reply(translations.COMMANDS.PREFIX.format(message.anyUsage("command")));
        return null;
    };
};
