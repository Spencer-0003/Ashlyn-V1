const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");
const getRoleplayImage = require("@utils/Roleplay/GetRoleplayImage");

module.exports = class DanceComamnd extends Command {
    constructor(client) {
        super(client, {
            name: "dance",
            group: "roleplay",
            memberName: "dance",
            description: "Dances with the given person",
            clientPermissions: ["EMBED_LINKS"],
            args: [
                {
                    key: "user",
                    prompt: "Who are you dancing with?",
                    type: "user",
                    default: message => message.author
                }
            ]
        });
    };

    run(message, { user }) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.ROLEPLAY.DANCE;

        if (user == message.author) {
            let embed = createEmbed({
                description: translations.SOLO.format(user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        } else {
            let embed = createEmbed({
                description: translations.TOGETHER.format(message.author.username, user.username),
                thumbnail: false,
                image: getRoleplayImage(this.name)
            });

            return message.embed(embed);
        };
    };
};