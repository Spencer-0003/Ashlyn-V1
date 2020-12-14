const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const malScraper = require("mal-scraper");

module.exports = class AnimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "anime",
            group: "search",
            memberName: "anime",
            description: "Gives information about the chosen anime.",
        });
    };

    run(message) {
        let search = message.content.split(/\s+/g).slice(1).join(" ");

        if (!search) {
            let embed = createEmbed({
                title: "Ashlyn: Anime",
                description: "Anime not found."
            });

            return message.embed(embed);
        };

        malScraper.getInfoFromName(search).then(anime => {
            let result = createEmbed({
                title: anime.title,
                description: anime.synopsis,
                thumbnail: anime.picture,
                message: [{ name: "Type", value: anime.type, inline: true }, { name: "Episodes", value: anime.episodes, inline: true }, { name: "Rating", value: anime.rating, inline: true }, { name: "Aired", value: anime.aired, inline: true }, { name: "Score", value: anime.score, inline: true }, { name: "Stats", value: anime.scoreStats, inline: true }, { name: "Duration", value: anime.duration, inline: true }, { name: "Rank", value: anime.ranked, inline: true }, { name: "Popularity", value: anime.popularity, inline: true }, { name: "Trailer", value: anime.trailer }, { name: "Genre(s)", value: anime.genres.join(", ") }]
            });

            return message.say(result);
        });
    };
};