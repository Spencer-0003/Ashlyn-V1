module.exports = {
    GLOBAL: {
        YES: "Yes",
        NO: "No",
        ADMIN_ONLY: "Only administrators may change the command prefix.",
        OWNER_ONLY: "Only the bot owner, Spencer#0003, may perform this action."
    },

    COMMANDS: {
        PREFIX: "Set the command prefix to {0}. To run commands use, {1}",

        MAGIC_8_BALL: {
            YES: "Yes.",
            NO: "No.",
            SOURCES: "My sources seem to believe so.",
            DONT_THINK_SO: "I don't think so.",
            UNLIKELY: "It is unlikely."
        },

        ROCK_PAPER_SCISSORS: {
            TITLE: "Rock, Paper, Scissors",
            TIE: "It's a tie!",
            WIN: "You won!",
            LOSS: "I won!"
        },

        LEADERBOARD: {
            TITLE: "Leaderboard",
            EMPTY_LEADERBORD: "Leaderboard is empty.",
            TOP_1O_USERS: "Top 10 users in",
        },

        PING: {
            TITLE: "Ping",
            PING: "My ping is"
        },

        RANK: {
            TITLE: "Rank",
            NO_XP: "This user has not earned any XP yet.",
            IS_RANK: "is rank"
        },

        SERVER: {
            CREATED: "Created",
            OWNER: "Owner",
            BOOSTS: "Boosts",
            BOOST_TIER: "Boost Tier",
            REGION: "Region",
            EXPLICIT_FILTER: "Explicit Filter",
            VERIFICATION_LEVEL: "Verification Level",
            MEMBERS: "Members"
        },

        AUTO_ROLE: {
            TITLE: "Auto Role",
            CONFIRMATION_MESSAGE: "The auto role has been set to {0}"
        },

        BLOCK_INVITES: {
            TITLE: "Block Invites",
            DESCRIPTION: "Block invites has been set to {0}"
        },

        UPTIME: {
            TITLE: "Uptime",
            CURRENT_UPTIME: "My uptime is"
        },

        USER: {
            JOINED_DISCORD: "Joined Discord",
            BOT: "Bot",
            SERVER_JOIN_DATE: "Server Join Date",
            HIGHEST_ROLE: "Highest Role",
            HOIST_ROLE: "Hoist Role",
            ROLES: "Roles",
            NONE: "None"
        },

        MODERATION: {
            TITLE: "Moderation",
            MODERATOR: "Moderator",
            NICKNAME: "Nickname",
            SELF_BAN: "You can't ban yourself.",
            SELF_DEAFEN: "You can't deafen yourself.",
            SELF_KICK: "You can't kick yourself.",
            SELF_MUTE: "You can't mute yourself.",
            DM_FAIL: "Failed to DM this user.",
            DM_BAN_MESSAGE: "You have been banned from {0} for {1}",
            DM_KICK_MESSAGE: "You have been kicked from {0} for {1}",
            DM_MUTE_MESSAGE: "You have been muted in {0} for {1}",
            DM_UNMUTE_MESSAGE: "You have been unmuted in {0}",
            BAN_MESSAGE: "I have banned {0} for {1}",
            UNBAN_MESSAGE: "{0} has been unbanned.",
            KICK_MESSAGE: "I have kicked {0} for {1}",
            INVALID_AMOUNT: "Invalid amount of messages",
            NOT_BANNED: "This user is not banned.",
            CLEARED_MESSAGES: "Successfully deleted {amount} messages.",
            NOT_DEAFENED: "This user is not deafened.",
            ALREADY_DEAFENED: "This user is already deafened.",
            SUCCESSFULLY_DEAFENED: "I have deafened <@{0}>.",
            SUCCESSFULLY_UNDEAFENED: "I have undeafened <@{0}>",
            ALREADY_MUTED: "This user is already muted.",
            SET_OWNER_NICKNAME: "I can't set the owner's nickname.",
            NICKNAME_CHANGE: "<@{0}>'s nickname has been changed to {1}"
        },

        MUSIC: {
            TITLE: "Music",
            NO_SONG: "No song specified.",
            VIDEO_NOT_FOUND: "Video not found.",
            INVALID_PROVIDER: "I currently do not support this provider.",
            NOT_IN_VOICE: "You are not in the voice channel.",
            CANT_JOIN: "I don't have permission to join the voice channel.",
            CANT_SPEAK: "I don't have permission to speak in the voice channel.",
            ADDED_TO_QUEUE: "has been added to the queue.",
            ERROR: "There was an unexpected error connecting to the voice channel, if Discord is not down, please alert Spencer#0003",
            SONG_NOT_PLAYING: "No song is currently playing.",
            ALREADY_PAUSED: "Music is already paused.",
            ALREADY_PLAYING: "Music is already playing.",
            SUCCESSFULLY_PAUSED: "Music has been paused.",
            SUCCESSFULLY_RESUMED: "Music has been resumed.",
            ENABLED_LOOPING: "I have enabled looping.",
            DISABLED_LOOPING: "I have disabled looping.",
            SHUFFLED: "I have shuffled the queue.",
            SKIPPED: "Song skipped.",
            STOPPED: "I have stopped the music.",
            SET_VOLUME: "I have set the volume to"
        },

        NSFW: {
            TITLE: "NSFW",
            NO_VIDEO: "No video specified.",
            DURATION: "Duration",
            HD_VIDEO: "HD",
            PREMIUM_VIDEO: "Premium",
            VIDEO_URL: "URL"
        },

        ROLEPLAY: {
            BLUSH: {
                SOLO: "{0} is blushing",
                MESSAGE_ONE: "{0} turned red because of {1}",
                MESSAGE_TWO: "{1} made {0} turn red"
            },

            CHEER: {
                SOLO: "{0} is cheering",
                MESSAGE_ONE: "{0} is cheering for {1}",
                MESSAGE_TWO: "{0} is cheering {1} on"
            },

            CUDDLE: {
                SOLO: "{0} wants to cuddle",
                MESSAGE_ONE: "{0} is embracing {1} for cuddles",
                MESSAGE_TWO: "{0} is cuddling {1}"
            },

            DANCE: {
                SOLO: "{0} is dancing",
                TOGETHER: "{0} wants to dance with {1}",
            }
        },

        NSFW_ROLEPLAY: {
            BLOWJOB: {
                SOLO: "{0} is craving a blowjob",
                MESSAGE_ONE: "{0} wants to swallow {1}",
                MESSAGE_TWO: "{0} swallowed {1}'s hot load"
            },

            FUCK: {
                SOLO: "{0} wants to fuck",
                MESSAGE_ONE: "{0} wants to fuck {1}",
                MESSAGE_TWO: "{0} wants to bang {1}"
            },

            SPANK: {
                SOLO: "{0} wants to get spanked",
                MESSAGE_ONE: "{0} wants {1} to be spanked by {0}",
                MESSAGE_TWO: "{0} wants {1} to spank them",
                MESSAGE_THREE: "{0} has been naughty and needs {1} to teach them a lesson"
            }
        },
    },
};