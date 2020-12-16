# Installation

How to install Ashlyn.

## Requirements

- [Discord bot token](https://discord.com/developers/applications)
- [Node v15](https://nodejs.org/) Node v12+ should work, but I prefer v15.
- [FFmpeg](https://ffmpeg.org/download.html)
- [Mongo URI](https://www.mongodb.com/) A self hosted MongoDB should work fine too.

## Usage

1. Clone the repo: `git clone https://github.com/Spencer-0003/Ashlyn`
2. Install all dependencies: `npm i`
3. Rename `.env.example` to `.env`
4. Create a bot at [Discord Developers](https://discord.com/developers/applications)
5. Copy your token and paste into `.env`
6. Run the bot: `npm start`
   - Using pm2: `pm2 start src/index.js`

##

[Return to Project](https://github.com/Spencer-0003/Ashlyn)