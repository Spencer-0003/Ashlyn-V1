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
        let translations = this.client.getServerLocale(message.guild).COMMANDS.ROCK_PAPER_SCISSORS;
        let embedTitle = `${message.client.user.username}: ${translations.TITLE}`;

        let options = ["rock", "paper", "scissors"];
        let result = options[Math.floor((Math.random() * options.length))];

        if (result === choice) {
            let embed = createEmbed({
                title: `${message.client.user.username}: Rock, Paper, Scissors`,
                description: translations.TIE
            });

            return message.embed(embed);
        };

        switch (choice) {
        case "rock": {
            if (result === "paper") {
                let embed = createEmbed({
                    title: embedTitle,
                    description: translations.LOSS
                });

                return message.embed(embed);
            } else {
                let embed = createEmbed({
                    title: embedTitle,
                    description: translations.WIN
                });

                return message.embed(embed);
            };
        };
        case "paper": {
            if (result === "scissors") {
                let embed = createEmbed({
                    title: embedTitle,
                    description: translations.LOSS
                });

                return message.embed(embed);
            } else {
                let embed = createEmbed({
                    title: embedTitle,
                    description: translations.WIN
                });

                return message.embed(embed);
            };
        };
        case "scissors": {
            if (result === "rock") {
                let embed = createEmbed({
                    title: embedTitle,
                    description: translations.LOSS
                });

                return message.embed(embed);
            } else {
                let embed = createEmbed({
                    title: embedTitle,
                    description: translations.WIN
                });

                return message.embed(embed);
            };
        };
        };
    };
};