const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

function generateResponse() {
    let responses = ["Yes.", "No.", "My sources seem to believe so.", "I don't think so.", "It is unlikely."];

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
            description: generateResponse(),
            thumbnail: "https://magic-8ball.com/assets/images/Our_magic_8_ball.png"
        });

        return message.embed(embed);
    };
};