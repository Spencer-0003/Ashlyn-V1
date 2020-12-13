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
                }
            ],
        });
    };

    run(message, { user, nickname }) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MODERATION;
        let embedTitle = `Ashlyn: ${translations.NICKNAME}`;

        if (user.id === message.guild.ownerID) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.SET_OWNER_NICKNAME
            });

            return message.embed(embed);
        };

        message.guild.members.cache.get(user.id).setNickname(nickname).then(() => {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NICKNAME_CHANGE.format(user.id, nickname)
            });

            return message.embed(embed);
        });
    };
};