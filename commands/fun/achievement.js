const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const fs = require("fs");
const { ICONS, AchievementCreator } = require("mc-achievements");

module.exports = class AchivementCommand extends Command {
    constructor(client) {
        super(client, {
            name: "achievement",
            group: "fun",
            memberName: "achievement",
            description: "Gives you an achivement.",
        });
    };

    async run(message) {
        let achivement = message.content.split(/\s+/g).slice(1).join(" ");

        if (!achivement) {
            let embed = createEmbed({
                title: "Ashlyn: achievements",
                description: "No achivement specified."
            });

            return message.embed(embed);
        };

        await AchievementCreator.create(ICONS.dirt, "achievement Get!", achivement).then(buffer => {
            fs.writeFileSync("achievement.png", buffer);
        });

        return message.say({
            files: ["achievement.png"]
        });
    };
};