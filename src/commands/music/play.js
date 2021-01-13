const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const { google_api_key } = process.env;

// const ytdl = require("ytdl-core");
const ytdl = require("ytdl-core-discord");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(google_api_key);

const simpleYt = require("simpleyt");

async function play(queue, guild, song) {
    let serverQueue = queue.get(guild.id);

    if (!song) {
        setTimeout(function() {
            if (!song && !queue.connection.dispatcher && guild.me.voice.channel) {
                queue.channel.leave();
                queue.delete(guild.id);
                let embed = createEmbed({
                    title: "Started Playing!",
                    description: "I left the channel because i was inactive for too long."
                });
                return serverQueue.textChannel.send(embed);
            } else {return;} }, 60000);
    };

    let downloadedSong = await ytdl(song.url, { quality: "highestaudio", filter: "audioonly", highWaterMark: 1 << 25, dlChunkSize: 0 });
    let dispatcher = serverQueue.connection.play(downloadedSong, { type: "opus" })
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
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MUSIC;
        let embedTitle = `${message.client.user.username}: ${translations.TITLE}`;

        let queue = this.client.queue;
        let voiceChannel = message.member.voice.channel;
        let searchString = message.content.split(/\s+/g).slice(1).join(" ");
        let video;

        if (searchString.substring(0, 32) === "https://www.youtube.com/watch?v=") {
            searchString = searchString.replace("https://www.youtube.com/watch?v=", "");
        } else if (searchString.substring(0, 17) === "https://youtu.be/") {
            searchString = searchString.replace("https://youtu.be/", "");
        } else if (searchString.substring(0, 23) == "https://soundcloud.com/") {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.INVALID_PROVIDER
            });
            return message.say(embed);
        };

        if (searchString == "") {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NO_SONG
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
                        title: embedTitle,
                        description: translations.VIDEO_NOT_FOUND
                    });

                    return message.embed(embed);
                };
            }
        };

        if (!voiceChannel || this.client.queue.get(message.guild.id) && this.client.queue.get(message.guild.id).voiceChannel !== voiceChannel) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NOT_IN_VOICE
            });

            return message.embed(embed);
        };

        let permissions = voiceChannel.permissionsFor(message.client.user);

        if (!permissions.has("CONNECT")) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.CANT_JOIN
            });

            return message.embed(embed);
        };

        if (!permissions.has("SPEAK")) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.CANT_SPEAK
            });

            return message.embed(embed);
        };

        let serverQueue = queue.get(message.guild.id);
        let toPlay = {
            id: video.id,
            title: video.title,
            url: video.uri || video.url,
            duration: video.length_seconds || video.durationSeconds
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
                await queueConstruct.connection.voice.setSelfDeaf(true);
                play(queue, message.guild, queueConstruct.songs[0]);
                let embed = createEmbed({
                    title: embedTitle,
                    description: "Started Playing: " + video.title
                });
                queueConstruct.textChannel.send(embed);
            } catch(err) {
                console.log(`Failed to connect to voice channel with error: ${err}`);
                queue.delete(message.guild.id);
                return message.say(`${translations.ERROR}\n` + err);
            };
        } else {
            serverQueue.songs.push(toPlay);
            return message.say(`${toPlay.title} ${translations.ADDED_TO_QUEUE}`);
        };
    };
};
