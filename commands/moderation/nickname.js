const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class NicknameCommand extends Command {
    constructor(client) {
        super(client, {
            name: "nickname",
            aliases: ["nick"],
            group: "moderation",
            memberName: "nickname",
            description: "Changes the nickname of the chosen user.",
            userPermissions: ["MANAGE_NICKNAMES"],
            clientPermissions: ["MANAGE_NICKNAMES"],
            guildOnly: true,
            args: [
                {
                    key: "user",
                    prompt: "Who would you like to nickname?",
                    type: "user"
                },
                {
                    key: "nickname",
                    prompt: "What do you want to change this user's nickname to?",
                    type: "string",
                    default: ""
                }
            ],
        });
    };

    run(message, { user, nickname }) {
        if (user.id === message.guild.ownerID) {
            let embed = createEmbed({
                title: "Ashlyn: Nickname",
                description: "I can't the owner's nickname."
            });

            return message.embed(embed);
        };

        message.guild.members.cache.get(user.id).setNickname(nickname).then(() => {
            let embed = createEmbed({
                title: "Ashlyn: Nickname",
                description: `<@${user.id}>'s nickname has been changed to ${nickname}`
            });

            return message.embed(embed);
        });
    };
};