const { bot_name } = process.env;
const { Command } = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const { posts } = require("rule34js");

module.exports = class Rule34Command extends Command {
    constructor(client) {
        super(client, {
            name: "rule34",
            group: "nsfw",
            memberName: "rule34",
            description: "Returns rule34 of the chosen tag",
            nsfw: true,
            args: [
                {
                    key: "tags",
                    prompt: "What tags would you like? (seperated with commas, example: like,this)",
                    type: "string",
                },
                {
                    key: "amount",
                    prompt: "How many images would you like?",
                    type: "integer",
                    default: 1
                }
            ]
        });
    };

    run(message, { tags, amount }) {
        let tagList = tags.split(",");

        posts({ tags: tagList }).then((value) => {
            if (!value || !value.posts) {
                let embed = createEmbed({
                    title: `${bot_name}: NSFW`,
                    description: "No images found",
                    thumbnail: false
                });

                return message.embed(embed);
            };

            for (let i = 0; i < amount; i++) {
                if (!value.posts[i]) return;

                let embed = createEmbed({
                    title: `${bot_name}: NSFW`,
                    image: value.posts[i].file_url,
                    thumbnail: false
                });

                message.embed(embed);
            };
        });
    };
};