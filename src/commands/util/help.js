const { util: { permissions } } = require("discord.js-commando");
const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            group: "util",
            memberName: "help",
            description: "Tells you all the commands or gives info about the chosen command",
            args: [
                {
                    key: "command",
                    prompt: "Which command would you like to view the help for?",
                    type: "command",
                    default: ""
                }
            ]
        });
    };

    async run(message, { command }) {
        if (!command) {
            let embeds = [];
            for (let i = 0; i < Math.ceil(this.client.registry.groups.size / 10); i++) {
                let embed = createEmbed({
                    title: `${message.client.user.username}: Commands`,
                    description: `Page ${i + 1} of commands.`
                });

                embeds.push(embed);
            };

            let cmdCount = 0;
            let i = 0;
            let embedIndex = 0;

            for (let group of this.client.registry.groups.values()) {
                i++;
                let owner = this.client.isOwner(message.author);
                let commands = group.commands.filter(cmd => {
                    if (owner) return true;
                    if (cmd.ownerOnly || cmd.hidden) return false;
                    if (cmd.nsfw && !message.channel.nsfw) return false;
                    return true;
                });

                if (!commands.size) continue;

                cmdCount += commands.size;
                if (i > (embedIndex * 10) + 10) embedIndex++;
                embeds[embedIndex].addField(group.name, commands.map(cmd => `\`${cmd.name}\``).join(' '));
            };

            let allShown = cmdCount === this.client.registry.commands.size;
            embeds[embeds.length - 1].setFooter(`${this.client.registry.commands.size} Commands${allShown ? '' : ` (${cmdCount} Shown)`}`);
            try {
                let msgs = [];
                for (let embed of embeds) msgs.push(await message.direct({ embed }));
                if (message.channel.type !== "dm") msgs.push(await message.say("Please check your DMs :slight_smile:"));
                return null;
            } catch {
                if (message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                    let errorEmbed = createEmbed({
                        title: `${message.client.user.username}: Help`,
                        description: "Failed to send DM, do you have DMs disabled?"
                    });

                    return message.embed(errorEmbed);
                };

                return null;
            };
        };

        let userPerms = command.userPermissions ? command.userPermissions.map(perm => permissions[perm]).join(", ") : "None";
        let clientPerms = command.clientPermissions ? command.clientPermissions.map(perm => permissions[perm]).join(", ") : "None";

        let embed = createEmbed({
            title: `${message.client.user.username}: Help`,
            description: `Command: ${command.name}`,
            message: [{ name: "**Aliases:**", value: command.aliases.join(", ") || "None" }, { name: "**Description:**", value: command.description }, { name: "**Group:**", value: command.group.name }, { name: "**NSFW:**", value: command.nsfw ? "Yes" : "No" }, { name: "**Permissions You Need:**", value: userPerms }, { name: "**Permissions I Need:**", value: clientPerms }]
        });

        try {
            message.author.send(embed);

            if (message.channel.type !== "dm") message.say("Please check your DMs :slight_smile:");
        } catch {
            if (message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                let errorEmbed = createEmbed({
                    title: `${message.client.user.username}: Help`,
                    description: "Failed to send DM, do you have DMs disabled?"
                });

                return message.embed(errorEmbed);
            };

            return null;
        };

        return null;
    };
};