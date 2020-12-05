const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class RockPaperScissorsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "rps",
            aliases: ["rockpaperscissors"],
            group: "fun",
            memberName: "kick",
            description: "Plays rock, paper, scissors.",
            args: [
                {
                    key: "choice",
                    prompt: "Rock, paper or scissors?",
                    type: "string",
                    oneOf: ["rock", "paper", "scissors"],
                },
            ],
        });
    };

    run(message, { choice }) {
        let options = ["rock", "paper", "scissors"];
        let result = options[Math.floor((Math.random() * options.length))];

        if (result === choice) {
            let embed = createEmbed({
                title: "Ashlyn: Rock, Paper, Scissors",
                description: "It's a tie!"
            });

            return message.embed(embed);
        };

        switch (choice) {
        case "rock": {
            if (result === "paper") {
                let embed = createEmbed({
                    title: "Ashlyn: Rock, Paper, Scissors",
                    description: "I won!"
                });

                return message.embed(embed);
            } else {
                let embed = createEmbed({
                    title: "Ashlyn: Rock, Paper, Scissors",
                    description: "You won!"
                });

                return message.embed(embed);
            };
        };
        case "paper": {
            if (result === "scissors") {
                let embed = createEmbed({
                    title: "Ashlyn: Rock, Paper, Scissors",
                    description: "I won!"
                });

                return message.embed(embed);
            } else {
                let embed = createEmbed({
                    title: "Ashlyn: Rock, Paper, Scissors",
                    description: "You won!"
                });

                return message.embed(embed);
            };
        };
        case "scissors": {
            if (result === "rock") {
                let embed = createEmbed({
                    title: "Ashlyn: Rock, Paper, Scissors",
                    description: "I won!"
                });

                return message.embed(embed);
            } else {
                let embed = createEmbed({
                    title: "Ashlyn: Rock, Paper, Scissors",
                    description: "You won!"
                });

                return message.embed(embed);
            };
        };
        };
    };
};