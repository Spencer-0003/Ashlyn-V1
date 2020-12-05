const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class MangaCommand extends Command {
    constructor(client) {
        super(client, {
            name: "manga",
            group: "search",
            memberName: "manga",
            description: "Gives information about the chosen manga.",
        });
    };

    run(message) {
        let search = message.content.split(/\s+/g).slice(1).join(" ");

        if (!search) {
            let embed = createEmbed({
                title: "Ashlyn: Manga",
                description: "You didn't specify a manga."
            });

            return message.embed(embed);
        };

        this.client.kitsu.searchManga(search).then(result => {
            if (result.length === 0) {
                let embed = createEmbed({
                    title: "Ashlyn: Manga",
                    description: `No results found for ${search}`
                });

                return message.embed(embed);
            };

            let manga = result[0];

            let embed = createEmbed({
                title: manga.titles.english,
                image: manga.posterImage.original,
                thumbnail: false,
                message: [{
                    name: "Information",
                    value: `Japanese Name: ${manga.titles.romaji}\nAge Rating: ${manga.ageRating ? manga.ageRating : '`N/A`'}\nChapters: ${manga.chapterCount ? manga.chapterCount : '`N/A`'}`,
                    inline: true
                }, {
                    name: "Stats",
                    value: `Average Rating: ${manga.averageRating ? manga.averageRating : '`N/A`'}\nRating Rank: ${manga.ratingRank ? manga.ratingRank : '`N/A`'}\nPopularity Rank: ${manga.popularityRank ? manga.popularityRank : '`N/A`'}`,
                    inline: true
                }, {
                    name: "Status",
                    value: `Volumes: ${manga.volumeCount ? manga.volumeCount : '`N/A`'}\nStart Date: ${manga.startDate}\nEnd Date: ${manga.endDate ? manga.endDate : "Ongoing"}`,
                    inline: true
                }]
            });

            return message.embed(embed);
        });
    };
};