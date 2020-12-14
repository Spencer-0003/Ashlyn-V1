const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

function generateResponse(client, guild) {
    let translations = client.getServerLocale(guild).COMMANDS.MAGIC_8_BALL;
    let responses = [translations.YES, translations.NO, translations.SOURCES, translations.DONT_THINK_SO, translations.UNLIKELY];

    return responses[Math.floor(Math.random() * responses.length)];
};

module.exports = class MagicBallCommand extends Command {
    constructor(client) {
        super(client, {
            name: "8ball",
            group: "fun",
            memberName: "8ball",
            description: "Tells you the truth.",
            args: [
                {
                    key: "question",
                    prompt: "What is your question?",
                    type: "string",
                }
            ]
        });
    };

    run(message, { question }) {
        if (question.slice(-1) !== "?") question = question + "?";

        let embed = createEmbed({
            title: question,
            description: generateResponse(this.client, message.guild),
            thumbnail: "https://magic-8ball.com/assets/images/Our_magic_8_ball.png"
        });

        return message.embed(embed);
    };
};