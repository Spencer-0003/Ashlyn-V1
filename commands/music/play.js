const { Command } = require("discord.js-commando");
const createEmbed = require("@utils/CreateEmbed");

const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(process.env.google_api_key);

const simpleYt = require("simpleyt");

async function play(queue, guild, song) {
    let serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    };

    let downloadedSong = await ytdl(song.url, { quality: "highestaudio", filter: "audioonly", highWaterMark: 1 << 25 });
    let dispatcher = serverQueue.connection.play(downloadedSong)
        .on("finish", () => {
            if (!serverQueue.loop) serverQueue.songs.shift();
            play(queue, guild, serverQueue.songs[0]);
        })
        .on("error", err => {
            console.log(err);
        });

    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
};

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: "play",
            aliases: ["p"],
            group: "music",
            memberName: "play",
            description: "Plays the chosen song.",
        });
    };

    async run(message) {
        let queue = this.client.queue;
        let voiceChannel = message.member.voice.channel;
        let searchString = message.content.split(/\s+/g).slice(1).join(" ");
        let video;

        if (searchString.substring(0, 32) === "https://www.youtube.com/watch?v=") {
            searchString = searchString.replace("https://www.youtube.com/watch?v=", "");
        } else if (searchString.substring(0, 17) === "https://youtu.be/") {
            searchString = searchString.replace("https://youtu.be/", "");
        };

        if (searchString == "") {
            let embed = createEmbed({
                title: "Ashlyn: Music",
                description: "No song specified."
            });

            return message.embed(embed);
        };

        // I know this looks terrible, if you know a way to improve it, it would be appreciated!

        try {
            video = await youtube.getVideoByID(searchString);
        } catch {
            try {
                let videos = await youtube.searchVideos(searchString, 1);
                video = await youtube.getVideoByID(videos[0].id);
            } catch {
                try {
                    let videos = await simpleYt(searchString, {
                        filter: "video"
                    });
                    video = videos[0];
                } catch {
                    let embed = createEmbed({
                        title: "Ashlyn: Music",
                        description: "Video not found."
                    });

                    return message.embed(embed);
                };
            }
        };

        if (!voiceChannel || this.client.queue.get(message.guild.id) && this.client.queue.get(message.guild.id).voiceChannel !== voiceChannel) {
            let embed = createEmbed({
                title: "Ashlyn: Music",
                description: "You are not in the voice channel."
            });

            return message.embed(embed);
        };

        let permissions = voiceChannel.permissionsFor(message.client.user);

        if (!permissions.has("CONNECT")) {
            let embed = createEmbed({
                title: "Ashlyn: Music",
                description: "I don't have permission to join the voice channel."
            });

            return message.embed(embed);
        };

        if (!permissions.has("SPEAK")) {
            let embed = createEmbed({
                title: "Ashlyn: Music",
                description: "I don't have permission to speak in the voice channel."
            });

            return message.embed(embed);
        };

        let serverQueue = queue.get(message.guild.id);
        let toPlay = {
            id: video.id,
            title: video.title,
            url: video.uri || video.url
        };

        if (!serverQueue || !serverQueue.connection || !serverQueue.voiceChannel) {
            let queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                loop: false,
                volume: 5,
                playing: true
            };

            queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(toPlay);

            try {
                let connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(queue, message.guild, queueConstruct.songs[0]);
            } catch(err) {
                console.log(`Failed to connect to voice channel with error: ${err}`);
                queue.delete(message.guild.id);
                return message.say("There was an unexpected error connecting to the voice channel, if Discord is not down, please alert Spencer#0003\n" + err);
            };
        } else {
            serverQueue.songs.push(toPlay);
            return message.say(`${toPlay.title} has been added to the queue.`);
        };
    };
};