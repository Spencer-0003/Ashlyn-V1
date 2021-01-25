const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

const { google_api_key, sc_client_id } = process.env;

// const ytdl = require("ytdl-core");
const ytdl = require("ytdl-core-discord");
const YouTube = require("simple-youtube-api");
const scdl = require("soundcloud-downloader").default;
const youtube = new YouTube(google_api_key);

const simpleYt = require("simpleyt");

function spoofUserAgent() {
    let date = new Date();
    let version = ((date.getFullYear() - 2018) * 4 + Math.floor(date.getMonth() / 4) + 58) + ".0";
    return `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:${version} Gecko/20100101 Firefox/${version}`;
};

async function play(queue, guild, song) {
    let serverQueue = queue.get(guild.id);

    if (!song || !song.mode) {
        setTimeout(function() {
            if (!song && !queue.connection.dispatcher && guild.me.voice.channel) {
                queue.channel.leave();
                queue.delete(guild.id);
                let embed = createEmbed({
                    title: "Started Playing!",
                    description: "I left the channel because I was inactive for too long."
                });
                return serverQueue.textChannel.send(embed);
            }}, 60000);
    };

    let downloadedSong;
    let streamType = song.mode === "YouTube" ? "opus" : "ogg/opus";
    if (song.mode === "YouTube") {
        downloadedSong = await ytdl(song.url, { quality: "highestaudio", filter: "audioonly", highWaterMark: 1 << 25, dlChunkSize: 0, requestOptions: { headers: { "User-Agent": spoofUserAgent(), "Accept-Language": "en-US,en;q=0.5" } } });
    } else {
        try {
            downloadedSong = await scdl.downloadFormat(song.url, scdl.FORMATS.OPUS, sc_client_id);
        } catch {
            downloadedSong = await scdl.downloadFormat(song.url, scdl.FORMATS.MP3, sc_client_id);
            streamType = "unknown";
        };
    };

    let dispatcher = serverQueue.connection.play(downloadedSong, { type: streamType })
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

        let mode = "YouTube";
        let queue = this.client.queue;
        let voiceChannel = message.member.voice.channel;
        let searchString = message.content.split(/\s+/g).slice(1).join(" ");
        let video;
        let toPlay;

        if (!searchString) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NO_SONG
            });

            return message.embed(embed);
        };

        if (searchString.substring(0, 32) === "https://www.youtube.com/watch?v=") {
            searchString = searchString.replace("https://www.youtube.com/watch?v=", "");
        } else if (searchString.substring(0, 17) === "https://youtu.be/") {
            searchString = searchString.replace("https://youtu.be/", "");
        } else if (searchString.substring(0, 23) == "https://soundcloud.com/") {
            mode = "SoundCloud";
        };

        // I know this looks terrible, if you know a way to improve it, it would be appreciated!

        if (mode === "YouTube") {
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
        } else {
            try {
                video = await scdl.getInfo(searchString, sc_client_id);
            } catch {
                let embed = createEmbed({
                    title: embedTitle,
                    description: "Invalid song."
                });

                return message.embed(embed);
            };
        };

        if (!video) return;

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
        if (mode === "YouTube") {
            toPlay = {
                id: video.id,
                title: video.title,
                url: video.uri || video.url,
                duration: video.length_seconds || video.durationSeconds,
                requestedBy: message.author.id,
                mode
            };
        } else {
            toPlay = {
                title: video.title,
                url: video.permalink_url,
                duration: Math.ceil(video.duration / 1000),
                requestedBy: message.author.id,
                mode
            };
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
