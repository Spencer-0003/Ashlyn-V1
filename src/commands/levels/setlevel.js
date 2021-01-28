const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const Levels = require("discord-xp");

module.exports = class SetLevelCommand extends Command {
    constructor(client) {
        super(client, {
            name: "setlevel",
            group: "levels",
            memberName: "setlevel",
            description: `Sets the rank of a chosen user.`,
            userPermissions: ["ADMINISTRATOR"],
            guildOnly: true,
            args: [
                {
                    key: "user",
                    prompt: "Whose rank do you want to change?",
                    type: "user",
                    default: message => message.author
                },
                {
                    key: "level",
                    prompt: "What level do you want to set?",
                    type: "integer"
                }
            ]
        });
    };

    run(message, { user, level }) {
        Levels.appendLevel(user.id, message.guild.id, level);

        let embed = createEmbed({
            title: `${this.client.user.username}: XP`,
            description: `${user.username}'s rank has been set to ${level}`
        });

        return message.say(embed);
    };
};